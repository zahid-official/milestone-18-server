import mongoose from "mongoose";
import envVars from "../../config/env";
import AppError from "../../errors/AppError";
import { bcryptjs, httpStatus } from "../../import";
import QueryBuilder from "../../utils/queryBuilder";
import { Role } from "../user/user.interface";
import User from "../user/user.model";
import { IAdmin } from "./admin.interface";
import Admin from "./admin.model";

// Get all admins
const getAllAdmins = async (query: Record<string, string>) => {
  // Define searchable fields
  const searchFields = ["name", "email", "phone"];

  // Build the query using QueryBuilder class and fetch users
  const queryBuilder = new QueryBuilder<IAdmin>(
    Admin.find({ isDeleted: { $ne: true } }),
    query
  );
  const admins = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build();

  // Get meta data for pagination
  const meta = await queryBuilder.meta();

  return {
    data: admins,
    meta,
  };
};

// Get single admin
const getSingleAdmin = async (id: string) => {
  const admin = await Admin.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, "Admin not found");
  }
  return admin;
};
// Create admin
const createAdmin = async (payload: IAdmin, password: string) => {
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
        [{ email: payload.email, password: hashedPassword, role: Role.ADMIN }],
        { session }
      );

      // Create admin linked to user
      const [admin] = await Admin.create([{ ...payload, userId: user._id }], {
        session,
      });

      return admin;
    });
  } catch (error: any) {
    throw new AppError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create admin"
    );
  } finally {
    await session.endSession();
  }
};

// Delete admin
const deleteAdmin = async (id: string, userId: string) => {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      // Check if admin exist
      const admin = await Admin.findById(id).session(session);
      if (!admin) {
        throw new AppError(httpStatus.NOT_FOUND, "Admin not found");
      }

      // Stop if this admin is already soft-deleted
      if (admin.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "Admin already deleted");
      }

      // Prevent an admin from deleting their own account
      if (userId === admin.userId.toString()) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You cannot delete your own admin account"
        );
      }

      // Soft delete admin
      const updatedAdmin = await Admin.findByIdAndUpdate(
        admin._id,
        { isDeleted: true },
        { new: true, session }
      );

      // Soft delete linked user
      const updatedUser = await User.findByIdAndUpdate(
        admin.userId,
        { isDeleted: true },
        { new: true, session }
      );
      if (!updatedUser) {
        throw new AppError(httpStatus.NOT_FOUND, "Linked user not found");
      }

      return updatedAdmin;
    });
  } catch (error: any) {
    throw new AppError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to delete admin"
    );
  } finally {
    await session.endSession();
  }
};

// Admin service object
const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  createAdmin,
  deleteAdmin,
};

export default AdminService;
