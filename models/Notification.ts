import  mongoose  from "mongoose";

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true},
    message: { type: String, required: true},
    date: { type: String, required: true},
    isRead: { type: Boolean, required: false},
    userId: { type: String, required: "global"},
    createdAt: { type: String, default: () => new Date().toISOString()},
});

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);