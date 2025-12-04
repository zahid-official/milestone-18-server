import mongoose from "mongoose";
import envVars from "../../config/env";
import AppError from "../../errors/AppError";
import { bcryptjs, httpStatus } from "../../import";
import User from "../user/user.model";
import { ICustomer } from "./customer.interface";
import Customer from "./customer.model";
import QueryBuilder from "../../utils/queryBuilder";

// Get all customers
const getAllCustomers = async (query: Record<string, string>) => {
  const searchFields = ["name", "email", "phone"];

  const queryBuilder = new QueryBuilder<ICustomer>(
    Customer.find({ isDeleted: { $ne: true } }),
    query
  );
  const customers = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build();

  const meta = await queryBuilder.meta();

  return {
    data: customers,
    meta,
  };
};

// Get single customer
const getSingleCustomer = async (id: string) => {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }
  return customer;
};

// Delete customer (soft delete customer and linked user)
const deleteCustomer = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      // Check if customer exists
      const customer = await Customer.findById(id).session(session);
      if (!customer) {
        throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
      }

      // Stop if this customer is already soft-deleted
      if (customer.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "Customer already deleted");
      }

      // Soft delete customer
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customer._id,
        { isDeleted: true },
        { new: true, session }
      );

      // Soft delete linked user
      const updatedUser = await User.findByIdAndUpdate(
        customer.userId,
        { isDeleted: true },
        { new: true, session }
      );
      if (!updatedUser) {
        throw new AppError(httpStatus.NOT_FOUND, "Linked user not found");
      }

      return updatedCustomer;
    });
  } catch (error: any) {
    throw new AppError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to delete customer"
    );
  } finally {
    await session.endSession();
  }
};

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
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create customer"
    );
  } finally {
    await session.endSession();
  }
};

// Customer service object
const CustomerService = {
  getAllCustomers,
  getSingleCustomer,
  deleteCustomer,
  createCustomer,
};

export default CustomerService;
