import { Router } from "express";
import validateToken from "../../middlewares/validateToken";
import { Role } from "./user.interface";
import UserController from "./user.controller";

// Initialize router
const router = Router();

// Get routes
router.get("/", validateToken(Role.ADMIN), UserController.getAllUsers);

// Export user routes
const UserRoutes = router;
export default UserRoutes;
