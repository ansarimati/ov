import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { Player } from "@/models/Player";
import { getAuthUser } from "@/lib/auth";

export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const player = await Player.findById(params.id)
      .populate("team", "name shortName logo");

    if (!player) return NextResponse.json({ success: false, error: "Player not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: player }, { status: 201 });
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
    const player = await Player.findOneAndUpdate(
      { _id: params.id, owner: user._id },
      body,
      { new: true, runValidators: true }
    );
  
    if (!player) {
      return NextResponse.json({ success: false, error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: player });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function DELETE (req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const player = await Player.findOneAndDelete(
      { _id: params.id, owner: user._id }
    );

    if (!player) return NextResponse.json({ success: false, error: "Player not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Player deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
