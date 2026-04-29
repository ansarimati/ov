import { NextResponse, NextRequest } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    
    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        subscription: user.subscription,
        isEmailVerified: user.isEmailVerified
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}