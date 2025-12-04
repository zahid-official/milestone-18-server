import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";
import OrderController from "./order.controller";
import createOrderSchema from "./order.validation";

// Initialize router
const router = Router();

// Get routes
router.get("/", validateToken(Role.VENDOR), OrderController.getAllOrders);
router.get(
  "/userOrders",
  validateToken(Role.CUSTOMER),
  OrderController.getAllOrdersByUser
);

// Post routes
router.post(
  "/create",
  validateToken(Role.CUSTOMER),
  validateSchema(createOrderSchema),
  OrderController.createOrder
);

// Patch routes
router.patch(
  "/:id/in-progress",
  validateToken(Role.VENDOR),
  OrderController.updateOrderStatusToInProgress
);
router.patch(
  "/:id/cancel",
  validateToken(Role.CUSTOMER),
  OrderController.cancelOrder
);

// Export order routes
const OrderRoutes = router;
export default OrderRoutes;
