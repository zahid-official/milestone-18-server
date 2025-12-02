import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import ProductController from "./product.controller";
import createProductSchema from "./product.validation";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";
import multerUpload from "../../config/multer";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/create",
  multerUpload.single("file"),
  validateToken(Role.VENDOR),
  validateSchema(createProductSchema),
  ProductController.createProduct
);

// Export product routes
const ProductRoutes = router;
export default ProductRoutes;
