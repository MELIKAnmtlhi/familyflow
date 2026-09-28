import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import FamilyMember from "@/models/FamilyMember";


export async function GET() {
  try {
    await connectDB();
    const members = await FamilyMember.find({});
    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching family members:", error);
    return NextResponse.json(
      { error: "Failed to fetch family members" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.role) {
      return NextResponse.json(
        { error: "Name and role are required" },
        { status: 400 }
      );
    }

    const newMember = await FamilyMember.create(body);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Error creating family member:", error);
    return NextResponse.json(
      { error: "Failed to create family member" },
      { status: 500 }
    );
  }
}