import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    console.log("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newEvent = await Event.create(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.log("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}