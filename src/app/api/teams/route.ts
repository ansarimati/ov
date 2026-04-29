import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { Team } from "@/models/Team";
import { getAuthUser } from "@/lib/auth";
import { checkLimit, PLAN_FEATURES } from "@/lib/plan-limit";

export async function GET (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const ownerId = user.role === "scorer" ? user.parentAdmin : user._id;
    const teams = await Team.find({ owner: ownerId })
      .populate("captain", "name jerseyNumber")
      .populate("vice captain", "name jerseyNumber")
      .populate("wicketkeeper", "name jerseyNumber")
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: teams });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

export async function POST (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 } );
    
    if (user.role !== "admin" && user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Only admins can create teams" }, { status: 403 });
    }

    await connectDb();

    // Check plan limits
    const currentTeamsCount = await Team.countDocuments({ owner: user._id });
    const plan = user.subscription?.plan;
    // const planFeatures = PLAN_FEATURES[user.subscription?.plan as keyof PLAN_FEATURES];
    const planFeatures = plan ? PLAN_FEATURES[plan] : undefined;
    const limitCheck = checkLimit(currentTeamsCount, planFeatures?.maxTeam ?? 4, "team");


    if (!limitCheck.allowed) {
      return NextResponse.json({ success: false, error: limitCheck.message }, { status: 403 });
    }

    const body = await req.json();

    if (!body.name || !body.shortName) {
      return NextResponse.json({ success: false, error: "Name and short name are required" }, { status: 400 });
    }

    const team = await Team.create({ ...body, owner: user._id });
    return NextResponse.json({ success: true, data: team }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.any }, { status: 500 });
  }
}

