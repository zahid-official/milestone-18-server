import Stripe from "stripe";
import { PaymentStatus } from "./payment.interface";
import Payment from "./payment.model";
import Order from "../order/order.model";
import { OrderStatus } from "../order/order.interface";
import Product from "../product/product.model";
import mongoose from "mongoose";

// Create payment
const stripeWebhook = async (event: Stripe.Event) => {
  switch (event.type) {
    // Handle completed checkout session
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.paymentId;
      const orderId = session.metadata?.orderId;

      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id;

      const paymentStatus =
        session.payment_status === "paid"
          ? PaymentStatus.PAID
          : PaymentStatus.UNPAID;

      // Update payment + order on successful charge
      const mongoSession = await mongoose.startSession();
      await mongoSession.withTransaction(async () => {
        if (paymentId) {
          await Payment.findByIdAndUpdate(
            paymentId,
            {
              transactionId: paymentIntentId ?? session.id,
              paymentGateway: session,
              paymentStatus,
            },
            { session: mongoSession }
          );
        }

        if (orderId) {
          await Order.findByIdAndUpdate(
            orderId,
            {
              paymentId,
              paymentStatus,
              orderStatus:
                paymentStatus === PaymentStatus.PAID
                  ? OrderStatus.CONFIRMED
                  : OrderStatus.PENDING,
            },
            { session: mongoSession }
          );
        }
      });
      await mongoSession.endSession();
      break;
    }

    // Handle expired checkout session
    case "checkout.session.async_payment_failed":
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.paymentId;
      const orderId = session.metadata?.orderId;
      const productId = session.metadata?.productId;
      const quantity = Number(session.metadata?.quantity || 0);

      // Mark payment/order as failed and restore stock
      const mongoSession = await mongoose.startSession();
      await mongoSession.withTransaction(async () => {
        if (paymentId) {
          await Payment.findByIdAndUpdate(
            paymentId,
            { paymentStatus: PaymentStatus.FAILED },
            { session: mongoSession }
          );
        }

        if (orderId) {
          await Order.findByIdAndUpdate(
            orderId,
            {
              paymentStatus: PaymentStatus.FAILED,
              orderStatus: OrderStatus.CANCELLED,
            },
            { session: mongoSession }
          );
        }

        if (productId && quantity) {
          await Product.findByIdAndUpdate(
            productId,
            { $inc: { stock: quantity } },
            { session: mongoSession }
          );
        }
      });
      await mongoSession.endSession();
      break;
    }

    // Handle other event types
    default:
      break;
  }

  return { paymentReceived: true };
};

// payment service object
const PaymentService = {
  stripeWebhook,
};

export default PaymentService;
