import { Router } from "express";
import AdminController from "./admin.controller";
import validateSchema from "../../middlewares/validateSchema";
import createAdminSchema from "./admin.validation";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/create",
  validateSchema(createAdminSchema),
  AdminController.createAdmin
);

// Export admin routes
const AdminRoutes = router;
export default AdminRoutes;
