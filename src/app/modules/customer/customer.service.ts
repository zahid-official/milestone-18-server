import mongoose from "mongoose";
import envVars from "../../config/env";
import AppError from "../../errors/AppError";
import { bcryptjs, httpStatus } from "../../import";
import User from "../user/user.model";
import { ICustomer } from "./customer.interface";
import Customer from "./customer.model";

// Create customer
const createCustomer = async (payload: ICustomer, password: string) => {
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
          },
        ],
        { session }
      );

      // Create customer linked to user
      const [customer] = await Customer.create(
        [{ ...payload, userId: user._id }],
        { session }
      );

      return customer;
    });
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create customer"
    );
  } finally {
    await session.endSession();
  }
};

// Customer service object
const CustomerService = {
  createCustomer,
};

export default CustomerService;
