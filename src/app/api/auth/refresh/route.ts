import { NextResponse, NextRequest } from "next/server";
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";


export async function POST (req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    
    if (!refreshToken) {
      return NextResponse.json({ success: false, error: "Refresh token is required" }, { status: 400 });
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Invalid or expired refresh token" }, { status: 401 });
    }

    await connectDb();
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    return NextResponse.json({ success: true, data: { accessToken: newAccessToken, refreshToken: newRefreshToken } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}