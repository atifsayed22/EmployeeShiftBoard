import dotenv from 'dotenv';

dotenv.config();
import express from "express";
// import cors from "cors";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",  // your frontend
  credentials: true,
}));

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/shifts", shiftRoutes);

connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running:", PORT));
