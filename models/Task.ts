import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    slug: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true
    },
    assignedTo: {
        type: [Number],
        default: []
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedBy: {
        type: Number,
        default: null
    },
    createdAt: {
        type: String,
        default: () => new Date().toISOString()
    },
    schedule: [{
        day: String,
        assignedTo: [Number]
   }]
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);