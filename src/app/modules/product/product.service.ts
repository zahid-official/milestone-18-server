import AppError from "../../errors/AppError";
import { httpStatus } from "../../import";
import { IProduct } from "./product.interface";
import Product from "./product.model";
import QueryBuilder from "../../utils/queryBuilder";

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
const createProduct = async (payload: IProduct) => {
  // Check if product already exists in category
  const isProductExists = await Product.findOne({
    title: payload?.title,
    category: payload?.category,
  });

  if (isProductExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Product with title '${payload?.title}' already exists in category '${payload?.category}'`
    );
  }

  const result = await Product.create(payload);
  return result;
};

// Update product
const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  // Ensure product exists
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  // Prevent duplicate title in same category if both provided
  const titleToCheck = payload.title ?? existingProduct.title;
  const categoryToCheck = payload.category ?? existingProduct.category;

  if (payload.title || payload.category) {
    const duplicate = await Product.findOne({
      _id: { $ne: id },
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

  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedProduct;
};

// Delete product
const deleteProduct = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const deletedProduct = await Product.findByIdAndDelete(id);
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
