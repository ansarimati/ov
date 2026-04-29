import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';

export async function POST (req: NextRequest) {
  try {
    await connectDb();
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    
      const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

      if (!user || !(await user.comparePassword(password))) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
      }

      const tokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      }

      const accessToken =  generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      return NextResponse.json({ success: true, data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscription: user.subscription
        },
        accessToken,
        refreshToken,
      } }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}