import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import HealthCheckup from "@/models/HealthCheckup";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const updated = await HealthCheckup.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating health checkup:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const deleted = await HealthCheckup.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting health checkup:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}