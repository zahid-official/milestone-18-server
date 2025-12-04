import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { httpStatus } from "../../import";
import Customer from "../customer/customer.model";
import { PaymentStatus } from "../payment/payment.interface";
import Product from "../product/product.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";
import Payment from "../payment/payment.model";
import stripe from "../../config/stripe";
import envVars from "../../config/env";
import { OrderStatus } from "./order.interface";
import QueryBuilder from "../../utils/queryBuilder";
import Vendor from "../vendor/vendor.model";

// Get all orders (no user filter)
const getAllOrders = async (
  vendorUserId: string,
  query: Record<string, string>
) => {
  const searchFields = ["orderStatus", "paymentStatus"];

  // Find vendor by the authenticated user's id
  const vendor = await Vendor.findOne({ userId: vendorUserId });
  if (!vendor) {
    throw new AppError(httpStatus.FORBIDDEN, "Vendor not found or unauthorized");
  }

  // Collect product ids that belong to this vendor
  const vendorProductIds = await Product.find({
    vendorId: vendor._id,
  }).distinct("_id");

  const queryBuilder = new QueryBuilder<IOrder>(
    Order.find({ productId: { $in: vendorProductIds } }).populate([
      {
        path: "productId",
        select: ["title", "price", "category", "thumbnail"],
      },
      {
        path: "paymentId",
        select: ["paymentStatus", "transactionId", "amount"],
      },
      {
        path: "userId",
        select: ["email", "role", "status"],
      },
    ]),
    query
  );

  const orders = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build();

  const meta = await queryBuilder.meta();

  return {
    data: orders,
    meta,
  };
};

// Get all orders for a customer
const getAllOrdersByUser = async (
  userId: string,
  query: Record<string, string>
) => {
  const searchFields = ["orderStatus", "paymentStatus"];

  const queryBuilder = new QueryBuilder<IOrder>(
    Order.find({ userId }).populate([
      {
        path: "productId",
        select: ["title", "price", "category", "thumbnail"],
      },
      {
        path: "paymentId",
        select: ["transactionId"],
      },
      {
        path: "userId",
        select: ["email", "role", "status"],
      },
    ]),
    query
  );
  const orders = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build();

  const meta = await queryBuilder.meta();

  return {
    data: orders,
    meta,
  };
};

// Create order and deduct product stock
const createOrder = async (payload: IOrder, userId: string) => {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      // Check if user has phone and address
      const customer = await Customer.findOne({ userId }).session(session);
      if (!customer?.phone || !customer?.address) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Please update your profile with phone number and address before placing an order"
        );
      }

      // Check if product exists
      const product = await Product.findById(payload.productId).session(
        session
      );
      if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found");
      }

      // Check if product already ordered by user and payment status is unpaid
      const existingOrder = await Order.findOne({
        productId: payload.productId,
        userId: userId,
        paymentStatus: PaymentStatus.UNPAID,
      }).session(session);

      if (existingOrder) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "You have already ordered this product and the payment is still pending. Please complete the payment before placing a new order or cancel the existing order."
        );
      }

      // Ensure stock availability
      if (payload.quantity > product.stock) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Insufficient stock available"
        );
      }

      // Deduct stock & calculate payable amount
      product.stock -= payload.quantity;
      await product.save({ session });
      const amount = Number((product?.price * payload.quantity).toFixed(2));

      // Attach userId & amount to order payload
      payload.userId = new mongoose.Types.ObjectId(userId);
      payload.amount = amount;

      // Create order
      const [order] = await Order.create([payload], { session });

      // Stage payment record (pending)
      const [payment] = await Payment.create(
        [
          {
            userId: userId,
            orderId: order._id,
            transactionId: `txn_${new mongoose.Types.ObjectId().toString()}`,
            amount,
            paymentStatus: PaymentStatus.UNPAID,
          },
        ],
        { session }
      );

      // Update order
      order.paymentId = payment._id;
      await order.save({ session });

      // Create Stripe Checkout session
      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: customer.email,
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
        line_items: [
          {
            price_data: {
              currency: "bdt",
              product_data: {
                name: product.title,
                description: product.description ?? "Order payment",
              },
              unit_amount: Math.round(product.price * 100), // in cents
            },
            quantity: payload.quantity,
          },
        ],
        metadata: {
          orderId: order._id.toString(),
          paymentId: payment._id.toString(),
          productId: payload.productId.toString(),
          userId: userId.toString(),
          quantity: payload.quantity.toString(),
        },
        success_url: `${envVars.STRIPE.SUCCESS_FRONTEND_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: envVars.STRIPE.CANCELED_FRONTEND_URL,
      });

      // Persist Stripe session details on payment
      payment.transactionId = checkoutSession.id;
      payment.paymentGateway = checkoutSession;
      await payment.save({ session });

      return {
        order,
        paymentURL: checkoutSession.url,
      };
    });
  } catch (error: any) {
    throw new AppError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create order"
    );
  } finally {
    await session.endSession();
  }
};

// Cancel order and restock product
const cancelOrder = async (orderId: string, userId: string) => {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      // Find order
      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, "Order not found");
      }

      // Ensure user owns the order
      if (order.userId.toString() !== userId) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You are not authorized to cancel this order"
        );
      }

      // Prevent canceling paid or already canceled orders
      if (order.paymentStatus === PaymentStatus.PAID) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Cannot cancel a paid order"
        );
      }
      if (order.orderStatus === OrderStatus.CANCELLED) {
        throw new AppError(httpStatus.BAD_REQUEST, "Order already cancelled");
      }

      // Restock product
      const product = await Product.findById(order.productId).session(session);
      if (product) {
        product.stock += order.quantity;
        await product.save({ session });
      }

      // Update order & payment status
      order.orderStatus = OrderStatus.CANCELLED;
      order.paymentStatus = PaymentStatus.FAILED;
      await order.save({ session });

      if (order.paymentId) {
        await Payment.findByIdAndUpdate(
          order.paymentId,
          { paymentStatus: PaymentStatus.FAILED },
          { session }
        );
      }

      return order;
    });
  } catch (error: any) {
    throw new AppError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to cancel order"
    );
  } finally {
    await session.endSession();
  }
};

// Order service object
const OrderService = {
  getAllOrders,
  getAllOrdersByUser,
  createOrder,
  cancelOrder,
};

export default OrderService;
