import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import FamilyGathering from "@/models/FamilyGathering";

export async function GET() {
  try {
    await connectDB();
    const data = await FamilyGathering.find().sort({ dateTime: 1 });
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
    const newItem = await FamilyGathering.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error creating:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}