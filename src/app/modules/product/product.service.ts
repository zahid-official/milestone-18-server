import AppError from "../../errors/AppError";
import { httpStatus } from "../../import";
import { IProduct } from "./product.interface";
import Product from "./product.model";
import QueryBuilder from "../../utils/queryBuilder";
import Vendor from "../vendor/vendor.model";

// Get all products
const getAllProducts = async (query: Record<string, string>) => {
  const searchFields = ["title", "category"];

  const queryBuilder = new QueryBuilder<IProduct>(Product.find(), query);
  const products = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .search(searchFields)
    .build();

  const meta = await queryBuilder.meta();

  return {
    data: products,
    meta,
  };
};

// Get single product
const getSingleProduct = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return product;
};

// Create product
const createProduct = async (payload: IProduct, vendorUserId: string) => {
  // Find vendor by userId
  const vendor = await Vendor.findOne({ userId: vendorUserId });
  if (!vendor) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Vendor not found or unauthorized"
    );
  }

  // Check if product already exists in category
  const isProductExists = await Product.findOne({
    title: payload?.title,
    category: payload?.category,
    vendorId: vendor._id,
  });

  if (isProductExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Product with title '${payload?.title}' already exists in category '${payload?.category}'`
    );
  }

  const result = await Product.create({ ...payload, vendorId: vendor._id });
  return result;
};

// Update product
const updateProduct = async (
  productId: string,
  vendorUserId: string,
  payload: Partial<IProduct>
) => {
  // Find vendor by userId
  const vendor = await Vendor.findOne({ userId: vendorUserId });
  if (!vendor) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Vendor not found or unauthorized"
    );
  }

  // Ensure product exists and belongs to vendor
  const existingProduct = await Product.findOne({
    _id: productId,
    vendorId: vendor._id,
  });
  if (!existingProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  // Prevent duplicate title in same category if both provided
  const titleToCheck = payload.title ?? existingProduct.title;
  const categoryToCheck = payload.category ?? existingProduct.category;

  if (payload.title || payload.category) {
    const duplicate = await Product.findOne({
      _id: { $ne: productId },
      vendorId: vendor._id,
      title: titleToCheck,
      category: categoryToCheck,
    });
    if (duplicate) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Product with title '${titleToCheck}' already exists in category '${categoryToCheck}'`
      );
    }
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId, vendorId: vendor._id },
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedProduct;
};

// Delete product
const deleteProduct = async (productId: string, vendorUserId: string) => {
  // Find vendor by userId
  const vendor = await Vendor.findOne({ userId: vendorUserId });
  if (!vendor) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Vendor not found or unauthorized"
    );
  }

  const deletedProduct = await Product.findOneAndDelete({
    _id: productId,
    vendorId: vendor._id,
  });
  if (!deletedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return deletedProduct;
};

// Product service object
const ProductService = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default ProductService;
