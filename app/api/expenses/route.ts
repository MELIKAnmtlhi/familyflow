import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Expense from "@/models/Expense";

export async function GET() {
  try {
    await connectDB();
    const expenses = await Expense.find().sort({ date: -1 });
    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newExpense = await Expense.create(body);
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}