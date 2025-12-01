import { Router } from "express";
import AdminRoutes from "../modules/admin/admin.routes";
import CustomerRoutes from "../modules/customer/customer.routes";
import UserRoutes from "../modules/user/user.routes";
import VendorRoutes from "../modules/vendor/vendor.routes";

// Initialize main router
const router = Router();

// List of route configs
const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/customer",
    route: CustomerRoutes,
  },
  {
    path: "/vendor",
    route: VendorRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

// Register all routes
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Export main router
const ModuleRouter = router;
export default ModuleRouter;
