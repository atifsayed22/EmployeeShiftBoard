import dotenv from 'dotenv';

dotenv.config();


import connectDB from "./config/db.js";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const seed = async () => {
  await connectDB(process.env.MONGO_URI);

  await User.deleteMany({ email: { $in: ["hire-me@anshumat.org", "john.doe@company.com"] } });

  const admin = await User.create({
    name: "Admin User",
    email: "hire-me@anshumat.org",
    password: await bcrypt.hash("HireMe@2025!", 10),
    role: "admin",
    employeeCode: "ADM001",
    department: "Human Resources"
  });

  const user = await User.create({
    name: "John Doe",
    email: "john.doe@company.com",
    password: await bcrypt.hash("Password@123", 10),
    role: "user",
    employeeCode: "EMP101",
    department: "Engineering"
  });

  console.log("Seed complete");
  process.exit(0);
};

seed();
