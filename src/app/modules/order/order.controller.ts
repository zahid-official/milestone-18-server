import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import OrderService from "./order.service";

// Create order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const body = req?.body;
  const userId = req?.decodedToken?.userId;
  const result = await OrderService.createOrder(body, userId);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message:
      "Order created successfully. Complete the Stripe payment to confirm.",
    data: result,
  });
});

// Order controller object
const OrderController = {
  createOrder,
};

export default OrderController;
