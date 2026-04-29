import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Venue } from "@/models/Venue";
import { getAuthUser } from "@/lib/auth";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    
    await connectDb();
    const venue = await Venue.findById(params.id);

    if (!venue) return NextResponse.json({ success: false, error: "Venue not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: venue });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function PUT (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    if (user.role !== "admin" && user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    };
    
    await connectDb();
    const body = req.json();
    const venue = await Venue.findOneAndUpdate(
      { _id: params.id, owner: user._id },
      body,
      { new: true, runValidators: true }
    );

    if (!venue) {
      return NextResponse.json({ success: false, error: "Venue not found" }, { status: 404 });
    };

    return NextResponse.json({ success: true, data: venue }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    if (user.role !== "admin" && user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await connectDb();
    const venue = await Venue.findOneAndDelete({ _id: params.id, owner: user._id });

    if (!venue) {
      return NextResponse.json({ success: false, error: "Venue not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Venue deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 }); 
  }
}