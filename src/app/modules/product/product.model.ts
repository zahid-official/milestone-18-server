import { model, Schema } from "mongoose";
import { IProduct, Materials, ProductCategory } from "./product.interface";

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
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },
    thumbnail: { type: String },
    description: { type: String },
    productOverview: { type: String },
    specifications: productSpecificationsSchema,
  },
  { versionKey: false, timestamps: true }
);

// Create mongoose model from product schema
const Product = model<IProduct>("Product", productSchema);
export default Product;
