import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Event from "@/models/Event";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.log("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}