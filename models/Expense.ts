import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true},
    date: { type: String, required: true },
    paidBy: { type: String, required: true},
    description: { type: String, default: ""},
    createdAt: { type: String, default: () => new Date().toISOString(),}
});

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);

