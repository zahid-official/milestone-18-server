import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AdminService from "./admin.service";

// Get all admins
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await AdminService.getAllAdmins(
    query as Record<string, string>
  );

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All admins retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Create admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, ...body } = req?.body || {};
  const result = await AdminService.createAdmin(body, password);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Admin created successfully",
    data: result,
  });
});

// Admin controller object
const AdminController = {
  getAllAdmins,
  createAdmin,
};

export default AdminController;
