import mongoose from "mongoose";

const FamilyGatheringSchema = new mongoose.Schema({
    title:{ type: String, required: true },
    dateTime: { type: String, required: true},
    location: { type: String, required: true},
    isDone: { type: Boolean, default: false },
    createdAt: { type: String, default: () => new Date().toISOString() },
})

export default mongoose.models.FamilyGathering || mongoose.model("FamilyGathering", FamilyGatheringSchema)