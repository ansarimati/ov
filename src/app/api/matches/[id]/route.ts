import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { Match } from "@/models/Match";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const match = await Match.findById(params.id)
      .populate("team1.team")
      .populate("team2.team")
      .populate("team1.playingXI", "name jerseyNumber role battingStyle bowlingStyle photo")
      .populate("team2.playingXI", "name jerseyNumber role battingStyle bowlingStyle photo")
      .populate("venue")
      // .populate("tpiccoss.wonBy", "name shortName");

      if (!match) return NextResponse.json({ success: false, error: "Match not found" }, { status: 404 });

      return NextResponse.json({ success: true, data: match }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function PUT (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    
    await connectDb();
    const body = await req.json();
    const match = await Match.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    );

    if (!match) return NextResponse.json({ success: false, error: "Match not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: match }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const match = await Match.findOneAndDelete({ _id: params.id, ownerId: user._id });
    if (!match) return NextResponse.json({ success: false, error: "Math not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Match deleted" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}