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

// Get single user
const getSingleUser = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const result = await UserService.getSingleUser(id);

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  }
);

// User controller object
const UserController = {
  getAllUsers,
  getSingleUser,
};

export default UserController;
