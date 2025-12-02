import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ProductService from "./product.service";
import { IProduct } from "./product.interface";

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

// Product controller object
const ProductController = {
  createProduct,
};

export default ProductController;
