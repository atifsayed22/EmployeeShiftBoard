import {body} from "express-validator";

const loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];

const shiftCreateValidator = [
  body('employeeId').notEmpty().withMessage('employeeId required'),
  body('date').isISO8601().withMessage('date must be YYYY-MM-DD'),
  body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('startTime must be HH:mm'),
  body('endTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('endTime must be HH:mm'),
];

export {loginValidator, shiftCreateValidator};