import Shift from "../models/Shift.js";
import User from "../models/User.js";

export const createShift = async ({ employeeId, date, startTime, endTime }) => {
  const startAt = new Date(`${date}T${startTime}:00Z`);
  const endAt = new Date(`${date}T${endTime}:00Z`);

  if (startAt >= endAt)
    throw { status: 400, message: "End time must be after start time" };

  const min = 4 * 60 * 60 * 1000;
  if (endAt - startAt < min)
    throw { status: 400, message: "Minimum shift is 4 hours" };

  const employee = await User.findById(employeeId);
  if (!employee) throw { status: 404, message: "Employee not found" };

  const overlap = await Shift.findOne({
    employee: employeeId,
    date,
    startAt: { $lt: endAt },
    endAt: { $gt: startAt }
  });

  if (overlap)
    throw { status: 409, message: "Shift overlaps existing shift" };

  return await Shift.create({ employee: employeeId, date, startAt, endAt });
};

export const getShifts = async ({ employee, date }) => {
  const q = {};
  if (employee) q.employee = employee;
  if (date) q.date = date;
  return Shift.find(q).populate("employee").sort({ startAt: 1 });
};



export const deleteShift = async (id) => {
  const result = await Shift.findByIdAndDelete(id);
  if (!result) throw { status: 404, message: "Shift not found" };
};
