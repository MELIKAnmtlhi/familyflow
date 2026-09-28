import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import FamilyMember from "@/models/FamilyMember";

type RouteParams = {
  params: Promise<{ id: string }>;
};


export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    
    const updatedMember = await FamilyMember.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!updatedMember) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();

    const deletedMember = await FamilyMember.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}


    export async function GET(req: NextRequest, { params }: RouteParams) {
      try {
        const { id } = await params;
        await connectDB();
        const member = await FamilyMember.findById(id);
    
        if (!member) {
          return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }
    
        return NextResponse.json(member);
      } catch (error) {
        console.error("Error fetching member:", error);
        return NextResponse.json(
          { error: "Failed to fetch member" },
          { status: 500 }
        );
      }
    }