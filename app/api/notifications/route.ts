import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Notification from "@/models/Notification";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();
    

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value || "global";
    
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
  
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value || "global";
    
    const newNotification = await Notification.create({
      ...body,
      userId,
    });
    
    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}