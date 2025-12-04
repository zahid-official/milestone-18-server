import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CustomerService from "./customer.service";

// Get all customers
const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await CustomerService.getAllCustomers(
    query as Record<string, string>
  );

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All customers retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

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
  getAllCustomers,
  createCustomer,
};

export default CustomerController;
