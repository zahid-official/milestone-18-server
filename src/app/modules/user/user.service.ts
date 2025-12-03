import QueryBuilder from "../../utils/queryBuilder";
import { IUser } from "./user.interface";
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

// User service object
const UserService = {
  getAllUsers,
  getSingleUser,
};

export default UserService;
