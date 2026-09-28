import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import WeeklyReset from "@/models/WeeklyReset";

const getCurrentWeek = () => {
   const now = new Date();
   const year = now.getFullYear();
   const startOfYear = new Date(year, 0, 1);
   const days = Math.floor((now.getTime() - startOfYear.getTime()) / ( 24* 60 * 60 * 1000));
   const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
   return `${year}-W${weekNumber}`
}

export async function GET() {
  try {
    await connectDB();
    let reset = await WeeklyReset.findOne();
    if (!reset) {
        const currentWeek = getCurrentWeek();
      reset = await WeeklyReset.create({ lastResetWeek: currentWeek });
    }
    return NextResponse.json(reset);
  } catch (error) {
    console.error("Error fetching weekly reset:", error);
    return NextResponse.json({ lastResetWeek: "2025-W31" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const reset = await WeeklyReset.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json(reset);
  } catch (error) {
    console.error("Error updating weekly reset:", error);
    return NextResponse.json({}, { status: 500 });
  }
}