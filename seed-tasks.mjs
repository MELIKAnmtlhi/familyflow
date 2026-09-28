import mongoose from "mongoose";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const env = dotenv.config();
dotenvExpand.expand(env)

const uri = process.env.MONGO_URI;
console.log("URI:", uri)

if (!uri) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

const TaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
  createdAt: String,
});

const Task = mongoose.model("Task", TaskSchema);

const tasks = [
  { title: "Grocery shopping", isCompleted: false },
  { title: "House cleaning", isCompleted: false },
  { title: "School pickup", isCompleted: false },
  { title: "Health checkups", isCompleted: false },
  { title: "Family gathering", isCompleted: false },
];

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    await Task.deleteMany({});
    console.log("🗑️ Old tasks removed");

    const result = await Task.insertMany(tasks);
    console.log(`✅ ${result.length} tasks added!`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();