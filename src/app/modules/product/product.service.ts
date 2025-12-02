import AppError from "../../errors/AppError";
import { httpStatus } from "../../import";
import { IProduct } from "./product.interface";
import Product from "./product.model";

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

// Product service object
const ProductService = {
  createProduct,
};

export default ProductService;
