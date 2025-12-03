import { Router } from "express";
import validateToken from "../../middlewares/validateToken";
import { Role } from "./user.interface";
import UserController from "./user.controller";
import multerUpload from "../../config/multer";
import validateSchema from "../../middlewares/validateSchema";
import { updateProfileInfoZodSchema } from "./user.validation";

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

// Patch routes
router.patch(
  "/profile",
  multerUpload.single("file"),
  validateToken(...Object.values(Role)),
  validateSchema(updateProfileInfoZodSchema),
  UserController.updateProfileInfo
);

// Export user routes
const UserRoutes = router;
export default UserRoutes;
