import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Match } from "@/models/Match";
import { Team } from "@/models/Team";
import { Player } from "@/models/Player";
import { Venue } from "@/models/Venue";
import { User } from "@/models/User";
import { getAuthUser } from "@/lib/auth";

export async function GET (req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectDb();
    const ownerId = user.role === "scorer" ? user.parentAdmin : user._id;

    const [totalMatches, liveMatches, totalTeams, totalPlayers, totalVenues, totalScorers] = 
      await Promise.all([
        Match.countDocuments({ owner: ownerId }),
        Match.countDocuments({ owner: ownerId, status: "live" }),
        Team.countDocuments({ owner: ownerId }),
        Player.countDocuments({ owner: ownerId }),
        Venue.countDocuments({ owner: ownerId }),
        User.countDocuments({ parentAdmin: ownerId })
      ]);

      const recentMatches = await Match.find({ owner: ownerId })
        .populate("teamA.team", "name shortName logo primaryColor")
        .populate("teamB.team", "name shortName logo primaryColor")
        .sort({ createdBy: -1 })
        .limit(5);

      // Monthly match count for plan limit display
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const matchesThisMonth = await Match.countDocuments({ owner: ownerId, createdAt: { $gte: startOfMonth } });

      return NextResponse.json({
        success: true,
        data: {
          totalMatches,
          liveMatches,
          totalTeams,
          totalPlayers,
          totalVenues,
          totalScorers,
          matchesThisMonth,
          recentMatches,
          subscription: user.subscription,
        }
      })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}