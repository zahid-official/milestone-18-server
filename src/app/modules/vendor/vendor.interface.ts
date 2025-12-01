import { Types } from "mongoose";

// Vendor interface definition
export interface IVendor {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profilePhoto?: string;
  isDeleted: boolean;
  userId: Types.ObjectId; // reference to User._id
  createdAt?: Date;
}
