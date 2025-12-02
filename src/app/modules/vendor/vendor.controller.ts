import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import VendorService from "./vendor.service";

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
  createVendor,
};

export default VendorController;
