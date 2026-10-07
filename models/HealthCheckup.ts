import mongoose from "mongoose";

const HealthCheckupSchema = new mongoose.Schema({
    title: {type: String, required: true},
    hospital: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    doctor: {type: String, required: true},
    notes: {type: String, required: "" },
    isDone: {type: Boolean, required: false},
    createdAt:  {type: String, default: () => new Date().toISOString()},
});

export default mongoose.models.HealthCheckup || mongoose.model("HealthCheckup", HealthCheckupSchema)