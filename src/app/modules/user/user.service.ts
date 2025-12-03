import QueryBuilder from "../../utils/queryBuilder";
import Admin from "../admin/admin.model";
import Customer from "../customer/customer.model";
import Vendor from "../vendor/vendor.model";
import { IUser, Role } from "./user.interface";
import User from "./user.model";

// Get all users
const getAllUsers = async (query: Record<string, string>) => {
  // Define searchable fields
  const searchFields = ["role", "email"];

  // Build the query using QueryBuilder class and fetch users
  const queryBuilder = new QueryBuilder<IUser>(User.find(), query);
  const users = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build()
    .select("-password");

  // Get meta data for pagination
  const meta = await queryBuilder.meta();

  return {
    data: users,
    meta,
  };
};

// Get single user
const getSingleUser = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return user;
};

// Get profile info
const getProfileInfo = async (userId: string, userRole: string) => {
  switch (userRole) {
    case Role.ADMIN: {
      return await Admin.findOne({ userId }).populate({
        path: "userId",
        select: ["_id", "role", "status", "needChangePassword"],
      });
    }

    case Role.VENDOR: {
      return await Vendor.findOne({ userId }).populate({
        path: "userId",
        select: ["_id", "role", "status", "needChangePassword"],
      });
    }

    case Role.CUSTOMER: {
      return await Customer.findOne({ userId }).populate({
        path: "userId",
        select: ["_id", "role", "status", "needChangePassword"],
      });
    }

    default:
      return null;
  }
};

// User service object
const UserService = {
  getAllUsers,
  getSingleUser,
  getProfileInfo,
};

export default UserService;
