import { Router } from "express";
import { getEmployees } from "../controllers/employeeController.js";
import{ authMiddleware} from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", authMiddleware, requireRole("admin"), getEmployees);

export default router;
