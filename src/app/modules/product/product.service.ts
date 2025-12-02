import { IProduct } from "./product.interface";

// Create product
const createProduct = async (payload: IProduct) => {
  return payload;
};

// Product service object
const ProductService = {
  createProduct,
};

export default ProductService;
