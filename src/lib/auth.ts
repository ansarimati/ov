import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { connectDb } from "./db";
import { User } from "@/models/User";
import { UserRole } from "@/types/enums";
import { IUser } from "@/types/interfaces";

function getEnvVariable (key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value;
}

const JWT_SECRET = getEnvVariable("JWT_SECRET");
const JWT_REFRESH_SECRET = getEnvVariable("JWT_REFRESH_SECRET");

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export function generateAccessToken (payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as jwt.SignOptions["expiresIn"] });
};

export function generateRefreshToken (payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"]  })
};

export function verifyAccessToken (token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken (token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getAuthUser (req: NextRequest): Promise<IUser | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  
  const token = authHeader.split(" ")[1];
  const payload = verifyAccessToken(token);
  if (!payload) return null;

  await connectDb();
  const user = await User.findById(payload.userId).select("-password");
  return user;
}

export function requireRole (...roles: UserRole[]) {
  return async (req: NextRequest) => {
    const user = await getAuthUser(req);
    if (!user) return { error: "Unauthorized", status: 401 };
    if (!roles.includes(user.role)) {
      return { error: "Unauthorized", status: 403 };
    }

    return { user };
  }
}