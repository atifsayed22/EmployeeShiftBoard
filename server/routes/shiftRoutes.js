import { Router } from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import { shiftCreateValidator } from "../utils/Validator.js";
import {
  createShiftController,
  getShiftsController,
  deleteShiftController
} from "../controllers/shiftController.js";

const router = Router();

router.post("/", authMiddleware, requireRole("admin"), shiftCreateValidator, createShiftController);

router.get("/", authMiddleware, getShiftsController);

router.delete("/:id", authMiddleware, requireRole("admin"), deleteShiftController);

export default router;
