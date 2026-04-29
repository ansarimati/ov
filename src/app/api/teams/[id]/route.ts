import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { Team } from "@/models/Team";
import { getAuthUser } from "@/lib/auth";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const team = await Team.findById(params.id)
      .populate("player", "name jerseyNumber role battingStyle bowlingStyle photo")
      .populate("captain", "name")
      .populate("viceCaptain", "name")
      .populate("wicketKeeper", "name");

    if (!team) return NextResponse.json({ success: false, error: "Team not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: team });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function PUT (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const body = req.json();
    const team = await Team.findOneAndUpdate({ _id: params.id, owner: user._id }, body, { new: true, runValidators: true });
    if (!team) return NextResponse.json({ success: false, error: "Team not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: team }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    
    await connectDb();
    const team = await Team.findOneAndDelete({ _id: params.id, owner: user._id });;
    if (!team) return NextResponse.json({ success: false, error: "Team not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Team deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}