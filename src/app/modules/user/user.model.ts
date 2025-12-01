import { Schema, model } from "mongoose";
import { AccountStatus, IUser, Role } from "./user.interface";

// Mongoose schema for user model
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.CUSTOMER },
    status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },
    needChangePassword: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

// Create mongoose model from user schema
const User = model<IUser>("User", userSchema);
export default User;
