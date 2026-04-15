import mongoose, { Schema } from "mongoose";
import * as E from "@/types/enums";

const TeamStatsSchema = new Schema({
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  ties: { type: Number, default: 0 },
  noResults: { type: Number, default: 0 },
  winPercentage: { type: Number, default: 0 },

  highestScore: { type: Number, default: 0 },
  highestScoreMatch: { type: Schema.Types.ObjectId, ref: "Match" },
  lowestScore: { type: Number, default: 999 },
  lowestScoreMatch: { type: Schema.Types.ObjectId, ref: "Match" },

  highestSuccessfulChase: { type: Number, default: 0 },
  lowestDefendedTotal: { type: Number, default: 999 },

  totalRunsScored: { type: Number, default: 0 },
  totalRunsConceded: { type: Number, default: 0 },
  totalWicketsTaken: { type: Number, default: 0 },
  totalWicketsLost: { type: Number, default: 0 },

  battingFirstWins: { type: Number, default: 0 },
  battingFirstLosses: { type: Number, default: 0 },
  chasingWins: { type: Number, default: 0 },
  chasingLosses: { type: Number, default: 0 },

  currentStreak: {
    type: { type: String, enum: ["win", "loss", "draws"], default: "win" },
    count: { type: Number, default: 0 },
  },
  longestWinStreak: { type: Number, default: 0 },
  longestLossStreak: { type: Number, default: 0 },
  longestUnbeatenStreak: { type: Number, default: 0 },

  tournamentWins: { type: Number, default: 0 },
}, { _id: false });


const TeamSchema = new Schema({
  name: { type: String, required: true, trim: true },
  shortName: { type: String, required: true, trim: true, maxLength: 5, uppercase: true },
  code: { type: String, trim: true, uppercase: true },
  type: { type: String, enum: Object.values(E.TeamType), default: E.TeamType.CLUB },
  status: { type: String, enum: Object.values(E.TeamStatus), default: E.TeamStatus.ACTIVE },

  // Branding
  logo: String,
  logoDark: String,
  logoSmall: String,
  banner: String,
  primaryColor: { type: String, default: "#1a56db" },
  secondaryColor: { type: String, default: "#ffffff" },
  tertiaryColor: String,
  gradientColor: String,
  gradientStart: String,
  gradientEnd: String,

  // Leadership
  captain: { type: Schema.Types.ObjectId, ref: "Player" },
  viceCaptain: { type: Schema.Types.ObjectId, ref: "Player" },
  wicketKeeper: { type: Schema.Types.ObjectId, ref: "Player" },
  coach: String,
  manager: String,
  ownerName: String,

  // Roster
  player: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  maxSquadSize: { type: Number, default: 25 },
  
  // Details
  homeGround: String,
  city: String,
  country: String,
  foundedYear: Number,

  // System owner
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },

  // stats
  teamStats: { type: TeamStatsSchema, default: () => ({}) },
}, { timestamps: true });

TeamSchema.pre("save", function () {
  if (!this.code) this.code = this.shortName; 
});

TeamSchema.index({ owner: 1 });
TeamSchema.index({ name: "text", shortName: "text" });

export const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);
