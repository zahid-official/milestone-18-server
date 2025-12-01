import { Router } from "express";
import VendorController from "./vendor.controller";
import validateSchema from "../../middlewares/validateSchema";
import createVendorSchema from "./vendor.validation";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/create",
  validateSchema(createVendorSchema),
  VendorController.createVendor
);

// Export vendor routes
const VendorRoutes = router;
export default VendorRoutes;
