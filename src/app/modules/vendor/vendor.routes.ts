import { Router } from "express";
import VendorController from "./vendor.controller";
import validateSchema from "../../middlewares/validateSchema";
import createVendorSchema from "./vendor.validation";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";

// Initialize router
const router = Router();

// Get routes
router.get("/", validateToken(Role.ADMIN), VendorController.getAllVendors);
router.get(
  "/singleVendor/:id",
  validateToken(Role.ADMIN),
  VendorController.getSingleVendor
);

// Post routes
router.post(
  "/create",
  validateToken(Role.ADMIN),
  validateSchema(createVendorSchema),
  VendorController.createVendor
);

// Export vendor routes
const VendorRoutes = router;
export default VendorRoutes;
