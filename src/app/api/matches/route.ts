import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import { Match } from "@/models/Match";
import { checkLimit, PLAN_FEATURES } from "@/lib/plan-limit";

export async function GET (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    
    await connectDb();
    const ownerId = user.role === "scorer" ? user.parentAdmin : user._id;
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const format = searchParams.get("format");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const filter: any = { owner: ownerId };
    if (status) filter.status = status;
    if (format) filter.format = format;

    const total = await Match.countDocuments(filter);
    const matches = await Match.find(filter)
      .populate("team1.team", "name shortName logo primaryColor secondaryColor")
      .populate("team2.team", "name shortName logo primaryColor secondaryColor")
      .populate("venue", "name city")
      .sort({ createdAt: -1 })
      .skip(( page -1 ) * limit)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: matches,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
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

    // Monthly match limit check
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const matchesThisMonth = await Match.countDocuments({ owner: user._id, createdAt: { $gte: startOfMonth } });

    const planFeatures = PLAN_FEATURES[user.subscription?.plan as keyof typeof PLAN_FEATURES];
    const limitCheck = checkLimit(matchesThisMonth, planFeatures?.maxMatchesPerMonth ?? 5, "matches this month");

    if (!limitCheck.allowed) {
      return NextResponse.json({ success: false, error: limitCheck.message }, { status: 403 });
    }

    const body = await req.json();
    const matches = await Match.create({...body, owner: user._id});

    return NextResponse.json({ success: true, data: matches }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}