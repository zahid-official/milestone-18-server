import { model, Schema } from "mongoose";
import { IProduct, Materials } from "./product.interface";

// Mongoose schema for product specifications
const productSpecificationsSchema = new Schema(
  {
    height: { type: Number },
    weight: { type: Number },
    width: { type: Number },
    length: { type: Number },
    meterials: { type: String, enum: Object.values(Materials) },
  },
  { _id: false, versionKey: false }
);

// Mongoose schema for product model
const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String },
    productOverview: { type: String },
    specifications: productSpecificationsSchema,
  },
  { versionKey: false, timestamps: true }
);

// Create mongoose model from product schema
const Product = model<IProduct>("Product", productSchema);
export default Product;
