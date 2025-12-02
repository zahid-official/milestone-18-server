import { Router } from "express";
import AuthController from "./auth.controller";

// Initialize router
const router = Router();

// Post routes
router.post("/login", AuthController.credentialsLogin);

// Export auth routes
const AuthRoutes = router;
export default AuthRoutes;
