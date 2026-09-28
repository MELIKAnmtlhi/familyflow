import mongoose from "mongoose";

const HouseCleaningSchema = new mongoose.Schema({
  Saturday: [{ id: Number, name: String, isDone: Boolean }],
  Sunday: [{ id: Number, name: String, isDone: Boolean }],
  Monday: [{ id: Number, name: String, isDone: Boolean }],
  Tuesday: [{ id: Number, name: String, isDone: Boolean }],
  Wednesday: [{ id: Number, name: String, isDone: Boolean }],
  Thursday: [{ id: Number, name: String, isDone: Boolean }],
  Friday: [{ id: Number, name: String, isDone: Boolean }],
});

export default mongoose.models.HouseCleaning || mongoose.model("HouseCleaning", HouseCleaningSchema);