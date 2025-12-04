import { Router } from "express";
import multerUpload from "../../config/multer";
import validateSchema from "../../middlewares/validateSchema";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";
import ProductController from "./product.controller";
import { createProductSchema, updateProductSchema } from "./product.validation";

// Initialize router
const router = Router();

// Get routes
router.get(
  "/",
  validateToken(Role.VENDOR, Role.ADMIN),
  ProductController.getAllProducts
);
router.get(
  "/singleProduct/:id",
  validateToken(Role.VENDOR, Role.ADMIN),
  ProductController.getSingleProduct
);

// Post routes
router.post(
  "/create",
  multerUpload.single("file"),
  validateToken(Role.VENDOR),
  validateSchema(createProductSchema),
  ProductController.createProduct
);

// Patch routes
router.patch(
  "/:id",
  multerUpload.single("file"),
  validateToken(Role.VENDOR),
  validateSchema(updateProductSchema),
  ProductController.updateProduct
);

// Delete routes
router.delete(
  "/:id",
  validateToken(Role.VENDOR),
  ProductController.deleteProduct
);

// Export product routes
const ProductRoutes = router;
export default ProductRoutes;
