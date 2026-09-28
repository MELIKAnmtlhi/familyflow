import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import HealthCheckup from "@/models/HealthCheckup";

export async function GET() {
  try {
    await connectDB();
    const data = await HealthCheckup.find().sort({ date: 1, time: 1 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newItem = await HealthCheckup.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error creating:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}