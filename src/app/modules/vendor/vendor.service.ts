import User from "../user/user.model";
import { Role } from "../user/user.interface";
import { IVendor } from "./vendor.interface";
import Vendor from "./vendor.model";
import mongoose from "mongoose";
import envVars from "../../config/env";
import AppError from "../../errors/AppError";
import { bcryptjs, httpStatus } from "../../import";

// Create vendor
const createVendor = async (payload: IVendor, password: string) => {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      // Hash password
      const hashedPassword = await bcryptjs.hash(
        password,
        envVars.BCRYPT_SALT_ROUNDS
      );

      // Create user
      const [user] = await User.create(
        [
          {
            email: payload.email,
            password: hashedPassword,
            role: Role.VENDOR,
          },
        ],
        { session }
      );

      // Create vendor linked to user
      const [vendor] = await Vendor.create(
        [{ ...payload, userId: user._id }],
        { session }
      );

      return vendor;
    });
  } catch (error: any) {
    throw new AppError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create vendor"
    );
  } finally {
    await session.endSession();
  }
};

// Vendor service object
const VendorService = {
  createVendor,
};

export default VendorService;
