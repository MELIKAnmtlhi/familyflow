import mongoose from "mongoose";

const FamilyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, default: "👤" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.FamilyMember || mongoose.model("FamilyMember", FamilyMemberSchema);