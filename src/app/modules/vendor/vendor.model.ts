import { model, Schema } from "mongoose";
import { IVendor } from "./vendor.interface";

// Mongoose schema for vendor model
const vendorSchema = new Schema<IVendor>(
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

// Create mongoose model from vendor schema
const Vendor = model<IVendor>("Vendor", vendorSchema);
export default Vendor;
