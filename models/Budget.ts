import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
    total: { 
        type: Number,
        required: true
    },
    used: {
        type: Number,
        required: true
    }
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema)