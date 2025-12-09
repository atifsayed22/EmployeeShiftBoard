import { Router } from "express";
import { loginValidator } from "../utils/Validator.js";
import { loginController } from "../controllers/authController.js";

const router = Router();

router.post("/login", loginValidator, loginController);

export default router;
