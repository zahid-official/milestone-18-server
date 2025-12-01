import { model, Schema } from "mongoose";
import { ICustomer } from "./customer.interface";

// Mongoose schema for customer model
const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    profilePhoto: { type: String },
    isDeleted: { type: Boolean, default: false },

    // relation to User via ObjectId
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { versionKey: false, timestamps: true }
);

// Create mongoose model from customer schema
const Customer = model<ICustomer>("Customer", customerSchema);
export default Customer;
