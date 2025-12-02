import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CustomerService from "./customer.service";

// Create customer
const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { password, ...body } = req?.body || {};
  const result = await CustomerService.createCustomer(body, password);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Customer created successfully",
    data: result,
  });
});

// Customer controller object
const CustomerController = {
  createCustomer,
};

export default CustomerController;
