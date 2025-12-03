import { Router } from "express";
import validateToken from "../../middlewares/validateToken";
import { Role } from "./user.interface";
import UserController from "./user.controller";

// Initialize router
const router = Router();

// Get routes
router.get("/", validateToken(Role.ADMIN), UserController.getAllUsers);
router.get(
  "/singleUser/:id",
  validateToken(Role.ADMIN),
  UserController.getSingleUser
);
router.get(
  "/profile",
  validateToken(...Object.values(Role)),
  UserController.getProfileInfo
);

// Export user routes
const UserRoutes = router;
export default UserRoutes;
