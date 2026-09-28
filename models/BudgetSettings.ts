import mongoose from "mongoose";

const BudgetSettingSchema = new mongoose.Schema({
    total: { type: Number, required: true},
    userId: { type: String, required: true},
    month: { type: String, required: true},
    updateAt: { type: String, default: () => new Date().toISOString()},
});

export default mongoose.models.BudgetSettings || mongoose.model("BudgetSettings", BudgetSettingSchema)