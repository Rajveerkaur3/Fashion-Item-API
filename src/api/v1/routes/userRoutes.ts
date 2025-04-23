import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

// Route to get user details by ID (accessible by both admin and manager roles)
router.get(
    "/:id",
    authenticate, // Authenticate the user
    isAuthorized({ hasRole: ["admin", "manager"] }), // Allow both admin and manager roles
    getUserDetails // Controller to fetch user details
);

export default router;
