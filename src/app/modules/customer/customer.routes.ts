import { Router } from "express";
import CustomerController from "./customer.controller";
import validateSchema from "../../middlewares/validateSchema";
import createCustomerSchema from "./customer.validation";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";

// Initialize router
const router = Router();

// Get routes
router.get("/", validateToken(Role.ADMIN), CustomerController.getAllCustomers);

// Post routes
router.post(
  "/create",
  validateSchema(createCustomerSchema),
  CustomerController.createCustomer
);

// Export customer routes
const CustomerRoutes = router;
export default CustomerRoutes;
