import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },  // YYYY-MM-DD
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model("Shift", shiftSchema);
