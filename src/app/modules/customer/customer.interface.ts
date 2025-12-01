import { Types } from "mongoose";

// Customer interface definition
export interface ICustomer {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profilePhoto?: string;
  isDeleted: boolean;
  userId: Types.ObjectId; // reference to User._id
  createdAt?: Date;
}
