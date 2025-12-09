import User from "../models/User.js";

export const getEmployees = async (req, res) => {
  const employees = await User.find({ role: "user" }).select("-password");
  res.json(employees);
};
