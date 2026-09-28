import mongoose from "mongoose";

const SchoolPickupSchema = new mongoose.Schema({
  Saturday: [{ id: String, title: String, time: String, note: String, isDone: Boolean }],
  Sunday: [{ id: String, title: String, time: String, note: String, isDone: Boolean }],
  Monday: [{ id: String, title: String, time: String, note: String, isDone: Boolean }],
  Tuesday: [{ id: String, title: String, time: String, note: String, isDone: Boolean }],
  Wednesday: [{ id: String, title: String, time: String, note: String, isDone: Boolean }],
  Thursday: [{ id: String, title: String, time: String, note: String, isDone: Boolean }],
  Friday: [{ id: String, title: String, time: String, note: String, isDone: Boolean }],
});

export default mongoose.models.SchoolPickup || mongoose.model("SchoolPickup", SchoolPickupSchema);