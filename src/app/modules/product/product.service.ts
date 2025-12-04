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

// Product service object
const ProductService = {
  createProduct,
  updateProduct,
};

export default ProductService;
