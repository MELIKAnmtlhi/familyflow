import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true},
    type: { type: String, enum:["birthday", "anniversay", "event","other"], required: true},
    description: {type: String, default: ""},
    familyMemberId: { type: String, default: ""},
    color: {type: String, default: "#C48CB3"},
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema)