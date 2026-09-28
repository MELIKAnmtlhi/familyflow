import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import SchoolPickup from "@/models/SchoolPickup";

export async function GET() {
  try {
    await connectDB();
    const data = await SchoolPickup.findOne();
    return NextResponse.json(data || {});
  } catch (error) {
    console.error("Error fetching school pickup:", error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const data = await SchoolPickup.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating school pickup:", error);
    return NextResponse.json({}, { status: 500 });
  }
}