import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import BudgetSettings from "@/models/BudgetSettings";

const getCurrentMonth = () => {
  const now = new Date();
  return `{now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get("userId");
    if(!userId) return NextResponse.json({ error: "userId required"}, { status: 400 });

    const currentMonth = getCurrentMonth();
    let settings = await BudgetSettings.findOne({ userId, month: currentMonth});
    if (!settings) {
      settings = { total:0, month: currentMonth, userId}
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching budget settings:", error);
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, total } = body;
    if(!userId) return NextResponse.json({error: "userId required"}, {status: 400});

    const currentMonth = getCurrentMonth();
    const settings = await BudgetSettings.findOneAndUpdate(
      { userId, month: currentMonth }, 
      {total, month: currentMonth, userId}, 
      {new: true, upsert: true}
    );

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating budget settings:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}