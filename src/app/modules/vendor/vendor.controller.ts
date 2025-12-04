import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import VendorService from "./vendor.service";

// Get all vendors
const getAllVendors = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await VendorService.getAllVendors(
    query as Record<string, string>
  );

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All vendors retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Create vendor
const createVendor = catchAsync(async (req: Request, res: Response) => {
  const { password, ...body } = req?.body || {};
  const result = await VendorService.createVendor(body, password);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Vendor created successfully",
    data: result,
  });
});

// Vendor controller object
const VendorController = {
  getAllVendors,
  createVendor,
};

export default VendorController;
