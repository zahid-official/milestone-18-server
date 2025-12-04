import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ProductService from "./product.service";
import { IProduct } from "./product.interface";

// Get all products
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await ProductService.getAllProducts(
    query as Record<string, string>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All products retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Get single product
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await ProductService.getSingleProduct(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product retrieved successfully",
    data: result,
  });
});

// Create product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload: IProduct = { ...req.body, thumbnail: req.file?.path };
  const result = await ProductService.createProduct(payload);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Product created successfully",
    data: result,
  });
});

// Update product
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload: Partial<IProduct> = { ...req.body };
  if (req.file?.path) {
    payload.thumbnail = req.file.path;
  }

  const result = await ProductService.updateProduct(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result,
  });
});

// Delete product
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await ProductService.deleteProduct(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product deleted successfully",
    data: result,
  });
});

// Product controller object
const ProductController = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default ProductController;
