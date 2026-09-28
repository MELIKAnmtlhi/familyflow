import mongoose from "mongoose";

const weeklyResetSchema = new mongoose.Schema({
    lastResetWeek: { type: String, required: true},
});

export default mongoose.models.WeeklyReset || mongoose.model("WeeklyReset", weeklyResetSchema)