import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { Player } from "@/models/Player";
import { getAuthUser } from "@/lib/auth";

export async function GET (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const ownerId = user.role === "scorer" ? user.parentAdmin : user._id;

    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamId");
    const search = searchParams.get("search");

    const filter: any = { owner: ownerId };
    if (teamId) filter.team = teamId;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { nickName: { $regex: search, $options: "i" } }
      ];
    }

    const players = await Player.find(filter)
      .populate("team", "name shortName logo primaryColor")
      .sort({ name: 1 });

    return NextResponse.json({ success: true, data: players }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function POST (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    if (user.role !== "admin" && user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await connectDb();
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json({ success: false, error: "Player name is required" }, { status: 400 })
    }

    const player = await Player.create({ ...body, owner: user._id });

    return NextResponse.json({ success: true, data: player }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}