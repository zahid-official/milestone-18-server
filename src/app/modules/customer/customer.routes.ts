import { Router } from "express";
import CustomerController from "./customer.controller";
import validateSchema from "../../middlewares/validateSchema";
import createCustomerSchema from "./customer.validation";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/create",
  validateSchema(createCustomerSchema),
  CustomerController.createCustomer
);

// Export customer routes
const CustomerRoutes = router;
export default CustomerRoutes;
