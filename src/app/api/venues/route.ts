import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Venue } from "@/models/Venue";
import { getAuthUser } from "@/lib/auth";

export async function GET (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const ownerId = user.role === "scorer" ? user.parentAdmin : user._id;
    const venues = await Venue.find({ owner: ownerId }).sort({ name: -1 });
    
    return NextResponse.json({ success: true, data: venues });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function POST (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin" && user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Only admins can create venues" }, { status: 403 });
    }

    await connectDb();
    const body = await req.json();
    const venue = await Venue.create({...body, owner: user._id});

    return NextResponse.json({ success: true, data: venue }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

