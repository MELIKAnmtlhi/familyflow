import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Task from "@/models/Task";


export async function GET() {
  try {
    await connectDB();

    let tasks = await Task.find();
    if (tasks.length === 0) {
      tasks = await Task.insertMany([
        { title: "Grocery shopping", slug: "grocery-shopping", isCompleted: false },
        { title: "House cleaning", slug: "house-cleaning", isCompleted: false },
        { title: "School pickup", slug: "school-pickup", isCompleted: false },
        { title: "Health checkups", slug: "health-checkups", isCompleted: false },
        { title: "Family gathering", slug: "family-gathering", isCompleted: false },
      ]);
    }

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST( req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        console.log("Recevied body:" , body);

        if (!body.title) {
          return NextResponse.json({ error: "Title is required"}, {status: 400})
        }

        const slug = body.title.toLowerCase().split(" ").join("-")

        const newTask = await Task.create({
          ...body, 
          slug });
        console.log("Task created:", newTask)
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: "Failed to fetch tasks"},  { status: 500 })
    }
}