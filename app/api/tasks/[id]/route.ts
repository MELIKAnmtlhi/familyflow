import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Task from "@/models/Task";



export async function GET(req: NextRequest, { params }: { params: Promise<{id : string}>} ) {
  try {
    const {id} = await params;
    await connectDB();
    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest, { params }: { params: Promise<{id : string}>}) {
  try {
    const {id} = await params;
    await connectDB();
    const body = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{id : string}>} ) {
  try {
    const {id} = await params;
    console.log("Delete called with id:", id);
    await connectDB();
    const deletedTask = await Task.findByIdAndDelete(id);
    console.log("Deleted task:", deletedTask)
    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    const errorMessage = error instanceof Error? error.message : "Unknown error"
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}