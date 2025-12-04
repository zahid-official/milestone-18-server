import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import UserService from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { httpStatus } from "../../import";

// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await UserService.getAllUsers(query as Record<string, string>);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All users retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Get all deleted users
const getAllDeletedUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await UserService.getAllDeletedUsers(
    query as Record<string, string>
  );

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All deleted users retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await UserService.getSingleUser(id);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: result,
  });
});

// Get profile info
const getProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.decodedToken?.userId;
  const userRole = req?.decodedToken?.role;
  const result = await UserService.getProfileInfo(userId, userRole);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile info retrieved successfully",
    data: result,
  });
});

// Upate profile info
const updateProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.decodedToken?.userId;
  const userRole = req?.decodedToken?.role;
  const payload = { ...req.body, profilePhoto: req.file?.path };
  const result = await UserService.updateProfileInfo(userId, userRole, payload);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile info updated successfully",
    data: result,
  });
});

// User controller object
const UserController = {
  getAllUsers,
  getAllDeletedUsers,
  getSingleUser,
  getProfileInfo,
  updateProfileInfo,
};

export default UserController;
