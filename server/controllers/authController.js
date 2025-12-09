import { validationResult } from "express-validator";
import { login } from "../services/authService.js";

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const data = await login(req.body.email, req.body.password);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
