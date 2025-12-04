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

// Get single admin
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await AdminService.getSingleAdmin(id);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin retrieved successfully",
    data: result,
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

// Delete admin
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const userId = req?.decodedToken?.userId;
  const result = await AdminService.deleteAdmin(id, userId);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin deleted successfully",
    data: result,
  });
});

// Admin controller object
const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  createAdmin,
  deleteAdmin,
};

export default AdminController;
