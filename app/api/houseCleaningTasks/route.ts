import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import HouseCleaning from "@/models/HouseCleaning";

export async function GET() {
  try {
    await connectDB();
    const tasks = await HouseCleaning.findOne();
    return NextResponse.json(tasks || {});
  } catch (error) {
    console.error("Error fetching house cleaning tasks:", error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const tasks = await HouseCleaning.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error updating house cleaning tasks:", error);
    return NextResponse.json({}, { status: 500 });
  }
}