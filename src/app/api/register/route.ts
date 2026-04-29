import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";
import { UserRole, SubscriptionPlan } from "@/types/enums";
import { PLAN_FEATURES } from "@/lib/plan-limit";

export async function POST (req: NextRequest) {
  try {
    await connectDb();
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, error: "Password must be 8 char" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      password,
      name,
      role: UserRole.ADMIN,
      subscription: {
        plan: SubscriptionPlan.FREE,
        status: "active",
        features: PLAN_FEATURES[SubscriptionPlan.FREE]
      }
    })

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return NextResponse.json({ success: true, data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
      },
      accessToken,
      refreshToken,
    } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}