import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { getAuthUser } from "@/lib/auth";
import { UserRole } from "@/types/enums";
import { checkLimit, PLAN_FEATURES } from "@/lib/plan-limit";

export async function GET (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const scorers = await User.find({
      parentAdmin: user._id,
      role: { $in: [ UserRole.SCORER, UserRole.COMMENTATOR ] }
    }).select("-password");

    return NextResponse.json({ success: true, data: scorers }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    if (user.role !== "admin" && user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await connectDb();

    const currentScorers = await User.countDocuments({ parentAdmin: user._id });
    const planFeatures = PLAN_FEATURES[user.subscription?.plan as keyof typeof PLAN_FEATURES];
    const limitCheck = checkLimit(currentScorers, planFeatures?.maxScorers ?? 1, "scorers");

    if (!limitCheck.allowed) {
      return NextResponse.json({ success: false, error: limitCheck.message }, { status: 403 });
    }

    const { email, password, name, role } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: "Email, password, and name are required" }, { status: 400 });
    }

    const allowedRoles = [UserRole.SCORER, UserRole.COMMENTATOR, UserRole.ANALYST];
    const scoreRole = allowedRoles.includes(role) ? role : UserRole.SCORER;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return NextResponse.json({ success: false, error: "Email already in use" }, { status: 409 });

    const scorer = await User.create({
      email: email.toLowerCase(),
      password,
      name,
      role: scoreRole,
      parentAdmin: user._id
    });

    return NextResponse.json({
      success: true,
      data: {
        id: scorer._id,
        email: scorer.email,
        name: scorer.name,
        role: scorer.role
      },
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}