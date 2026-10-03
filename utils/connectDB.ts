import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  
  const uri = process.env.MONGO_URI;
  
  console.log("🔍 URI exists:", !!uri);
  console.log("🔍 URI length:", uri?.length);
  console.log("🔍 URI starts:", uri?.substring(0, 25));
  
  if (!uri) throw new Error("MONGO_URI missing");
  
  mongoose.set("strictQuery", false);
  await mongoose.connect(uri);
  console.log("✅ Connected to DB");
}

export default connectDB;