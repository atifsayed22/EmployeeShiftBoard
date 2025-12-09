import { validationResult } from "express-validator";
import { createShift, getShifts, deleteShift } from "../services/shiftService.js";

export const createShiftController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const s = await createShift(req.body);
    res.status(201).json(s);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getShiftsController = async (req, res) => {
  try {
    let { employee, date } = req.query;

    if (req.user.role === "user") {
      employee = req.user._id.toString();
    }

    const list = await getShifts({ employee, date });
    res.json(list);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteShiftController = async (req, res) => {
  try {
    await deleteShift(req.params.id);
    res.json({ message: "Shift deleted" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
