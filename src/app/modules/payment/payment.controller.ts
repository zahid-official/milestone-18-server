import { Request, Response } from "express";
import envVars from "../../config/env";
import stripe from "../../config/stripe";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import PaymentService from "./payment.service";

// Create stripe payment webhook
const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const signature = req?.headers["stripe-signature"];
  const webhookSecret = envVars.STRIPE.WEBHOOK_SECRET_KEY;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature as string,
      webhookSecret as string
    );
  } catch (error: any) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(
        `Stripe webhook signature verification failed error: ${error.message}`
      );
  }

  // Pass event to service
  const result = await PaymentService.stripeWebhook(event);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Webhook request processed successfully",
    data: result,
  });
});

// Payment controller object
const PaymentController = {
  stripeWebhook,
};

export default PaymentController;
