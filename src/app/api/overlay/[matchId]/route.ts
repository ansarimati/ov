import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Match } from "@/models/Match";

export async function GET (req: NextResponse, { params }: { params: { matchId: string } }) {
  try {
    await connectDb();

    const match = await Match.findById(params.matchId)
      .populate("teamA.team", "name shortName logo primaryColor secondaryColor")
      .populate("teamB.team", "name shortName logo primaryColor secondaryColor")
      .populate("teamA.playingXI", "name jerseyNumber")
      .populate("teamB.playingXI", "name jerseyNumber")
      .populate("venue", "name city");

      if (!match) return NextResponse.json({ success: "false", error: "Match not found" }, { status: 404 });
      
      // Return only data needed for overlaying
      return NextResponse.json({
        success: true,
        data: {
          id: match._id,
          status: match.status,
          matchFormat: match.matchFormat,
          teamA: match.teamA,
          teamB: match.teamB,
          // tpiccoss: match.tpiccoss,
          innings: match.innings,
          currentInnings: match.currentInnings,
          venue: match.venue,
          overlaySettings: match.overlaySettings
        }
      });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}