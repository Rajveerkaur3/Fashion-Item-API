import express from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

router.post(
    "/setCustomClaims",
    authenticate,
   isAuthorized({ hasRole: ["admin", "manager"] }), // Corrected the role array here
    setCustomClaims
);

export default router;
