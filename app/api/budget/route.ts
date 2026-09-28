import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Budget from "@/models/Budget";

export async function GET() {
  try {
    await connectDB();
    let budget = await Budget.findOne();
    if (!budget) {
      budget = await Budget.create({ total: 0, used: 0 });
    }
    return NextResponse.json(budget);
  } catch (error) {
    console.error("Error fetching budget:", error);
    return NextResponse.json({ total: 0, used: 0 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const budget = await Budget.findOneAndUpdate({}, body, { 
      new: true, 
      upsert: true 
    });
    return NextResponse.json(budget);
  } catch (error) {
    console.error("Error updating budget:", error);
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
  }
}