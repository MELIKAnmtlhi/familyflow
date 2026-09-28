import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import GroceryShopping from "@/models/GroceryShopping";

export async function GET() {
  try {
    await connectDB();
    const items = await GroceryShopping.findOne();
    return NextResponse.json(items || {});
  } catch (error) {
    console.error("Error fetching grocery items:", error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const items = await GroceryShopping.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error updating grocery items:", error);
    return NextResponse.json({}, { status: 500 });
  }
}