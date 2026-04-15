import mongoose, { Schema } from "mongoose";
import * as E from "@/types/enums";

const InjuryRecordSchema = new Schema ({
  type: { type: String, required: true },
  description: String,
  injuredDate: Date,
  expectedReturnDate: Date,
  severity: { type: String, enum: ["minor", "moderate", "sever"] },
  bodyPart: String,
  isRecovered: { type: Boolean, default: false },
  recoveredDate: Date,
});

const PlayerMilestoneSchema = new Schema({
  type: { type: String, enum: ["batting", "bowling", "fielding", "career"]},
  description: String,
  achievedAt: Date,
  matchId: { type: Schema.Types.ObjectId, ref: "Match" },
  value: Number,
});

const PlayerAwardSchema = new Schema({
  name: String,
  matchId: { type: Schema.Types.ObjectId, ref: "Match" },
  tournament: { type: Schema.Types.ObjectId, ref: "Tournament" },
  date: Date,
  description: String,
});

// Deep batting stats schema
const BattingStatsSchema = new Schema({
      innings: { type: Number, default: 0 },
    runs: {type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    notOuts: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    isHighestNotOut: { type: Boolean, default: false },
    average: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    dotBallsFaced: { type: Number, default: 0 },
    dotBallPercentage: { type: Number, default: 0 },
    boundaryPercentage: { type: Number, default: 0 },
    fifties: { type: Number, default: 0 },
    hundreds: { type: Number, default: 0 },
    ducks: { type: Number, default: 0 },
    goldenDucks: { type: Number, default: 0 },
    thirties: { type: Number, default: 0 },
    nineties: { type: Number, default: 0 },
    longestInnings: { type: Number, default: 0 },

    runsInPowerplay: { type: Number, default: 0 },
    ballsInPowerplay: { type: Number, default: 0 },
    runsInMiddle: { type: Number, default: 0 },
    ballsInMiddle: { type: Number, default: 0 },
    runsInDeath: { type: Number, default: 0 },
    ballsInDeath: { type: Number, default: 0 },

    runsVsPace: { type: Number, default: 0 },
    ballsVsPace: { type: Number, default: 0} ,
    wicketsVsPace: { type: Number, default: 0 },
    runsVsSpin: { type: Number, default: 0 },
    ballsVsSpin: { type: Number, default: 0 },
    wicketsVsSpin: { type: Number, default: 0 },

    runsAsOpener: { type: Number, default: 0 },
    inningsAsOpener: { type: Number, default: 0 },
    runsInChase: { type: Number, default: 0 },
    inningsInChase: { type: Number, default: 0 },
    notOutsInChase: { type: Number, default: 0 },

    totalSixes: { type: Number, default: 0 },
    totalFours: { type: Number, default: 0 },
    highestStrikeRateInnings: { type: Number, default: 0 },
    bestInningsScore: { type: Number, default: 0 },
    bestInningsBalls: { type: Number, default: 0 },

    singles: { type: Number, default: 0 },
    doubles: { type: Number, default: 0 },
    triples: { type: Number, default: 0 },
    runOuts: { type: Number, default: 0 },
}, { _id: false });

const BowlingStatsSchema = new Schema({
  innings: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  ballsBowled: { type: Number, default: 0 },
  runsConceded: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  average: { type: Number, default: 0 },
  economy: { type: Number, default: 0 },
  strikeRate: { type: Number, default: 0 },

  bestBowlingWickets: { type: Number, default: 0 },
  bestBowlingRuns: { type: Number, default: 0 },
  bestBowlingMatch: { type: Schema.Types.ObjectId, ref: "Match" },

  threeWicketHauls: { type: Number, default: 0 },
  fourWicketHauls: { type: Number, default: 0 },
  fiveWicketHauls: { type: Number, default: 0 },
  tenWicketHauls: { type: Number, default: 0 },

  maidens: { type: Number, default: 0 },
  dotBalls: { type: Number, default: 0 },
  dotBallsPercentage: { type: Number, default: 0 },

  wides: { type: Number, default: 0 },
  noBalls: { type: Number, default: 0 },

  foursConceded: { type: Number, default: 0 },
  sixesConceded: { type: Number, default: 0 },
  boundaryPercentage: { type: Number, default: 0 },

  wicketsBowled: { type: Number, default: 0 },
  wicketsCaught: { type: Number, default: 0 },
  wicketsLbw: { type: Number, default: 0 },
  wicketsStumped: { type: Number, default: 0 },
  wicketsRunOut: { type: Number, default: 0 },
  wicketsCaughtAndBowled: { type: Number, default: 0 },
  wicketsHitWickets: { type: Number, default: 0 },

  wicketsInPowerplay: { type: Number, default: 0 },
  runsInPowerplay: { type: Number, default: 0 },
  oversInPowerplay: { type: Number, default: 0 },
  wicketsInMiddle: { type: Number, default: 0 },
  runsInMiddle: { type: Number, default: 0 },
  oversInMiddle: { type: Number, default: 0 },
  wicketsInDeath: { type: Number, default: 0 },
  runsInDeath: { type: Number, default: 0 },
  oversInDeath: { type: Number, default: 0 },

  bestSpellWickets: { type: Number, default: 0 },
  bestSpellRuns: { type: Number, default: 0 },
  bestSpellOvers: { type: Number, default: 0 },

  hatTricks: { type: Number, default: 0 },
  doubleHatTricks: { type: Number, default: 0 },
}, { _id: false });

const FieldStatsSchema = new Schema({
  catches: { type: Number, default: 0 },
  catchesAsWk: { type: Number, default: 0 },
  drops: { type: Number, default: 0 },
  runOuts: { type: Number, default: 0 },
  directHitRunOuts: { type: Number, default: 0 },
  stumpings: { type: Number, default: 0 },
  assistedRunOuts: { type: Number, default: 0 },
  catchesInSlips: { type: Number, default: 0 },
  catchesInOutfield: { type: Number, default: 0 },
  catchesInClose: { type: Number, default: 0 },
}, { _id: false });

const CaptaincyStatsSchema = new Schema({
  matchesAsCaptain: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  ties: { type: Number, default: 0 },
  noResults: { type: Number, default: 0 },
  winPercentage: { type: Number, default: 0 },
  tossWins: { type: Number, default: 0 },
  tossBatFirst: { type: Number, default: 0 },
  tossBowlFirst: { type: Number, default: 0 }
}, { _id: false });

const FormatStatsSchema = new Schema({
  matches: { type: Number, default: 0 },
  batting: {
    innings: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    fifties: { type: Number, default: 0 },
    hundreds: { type: Number, default: 0 }
  },
  bowling: {
    innings: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },
    bestBowling: { type: String, default: "0/0" },
  },
}, { _id: false });

const PlayerSchema = new Schema({
  // Personal Info
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, require: true, trim: true },
  fullName: { type: String, trim: true },
  displayName: { type: String, trim: true },
  dateOfBirth: Date,
  gender: { type: String, enum: Object.values(E.PlayerGender), default: E.PlayerGender.MALE },
  nationality: String,
  city: String,
  state: String,
  photos: String,
  photo: String,
  thumbnailPhoto: String,
  jerseyNumber: Number,

  // Cricket Details
  role: { type: String, enum: Object.values(E.PlayerRole), required: true },
  battingStyle: { type: String, enum: Object.values(E.BattingStyle), required: true },
  bowlingStyle: { type: String, enum: Object.values(E.BowlingStyle), required: true, default: E.BowlingStyle.DOES_NOT_BOWL },
  bowlingType: { type: String, enum: Object.values(E.BowlingType) },
  preferredBattingPosition: { type: String, enum: Object.values(E.BattingPosition), default: E.BattingPosition.FLEXIBLE },

  // Team and Owner
  team: { type: Schema.Types.ObjectId, ref: "Team" },
  owner: { type: Schema.Types.ObjectId, red: "User", required: true },
  availability: { type: String, enum: Object.values(E.PlayerAvailability), default: E.PlayerAvailability.AVAILABLE },
  injuryDetails: InjuryRecordSchema,

  // Physical
  height: Number,
  weight: Number,

  // Contact
  email: String,
  phone: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },

  // Career Stats
  careerStats: {
    matches: { type: Number, default: 0 },
    innings: { type: Number, default: 0 },
    batting: { type: BattingStatsSchema, default: () => ({}) },
    bowling: { type: BowlingStatsSchema, default: () => ({}) },
    fielding: { type: FieldStatsSchema, default: () => ({}) },
    captaincy: { type: CaptaincyStatsSchema, default: () => ({}) },
  },

  // Format-wise stats
  formatStats: {
    t10: FormatStatsSchema,
    t20: FormatStatsSchema,
    odi: FormatStatsSchema,
    firstClass: FormatStatsSchema,
    test: FormatStatsSchema
  },

  // Milestones
  milestones: [PlayerMilestoneSchema],

  // Awards
  awards: [PlayerAwardSchema],

  // Notes
  notes: String,

  // Active
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

//  Auto populate full name
PlayerSchema.pre("save", function () {
  this.fullName = `${ this.firstName } ${ this.lastName }`;
  if (!this.displayName) {
    this.displayName = this.fullName;
  }
});

// Virtual for age
PlayerSchema.virtual("age").get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birth = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || ( monthDiff === 0 && today.getDate() < birth.getDate() )) {
    age--;
  }
  return age;
});

PlayerSchema.set("toJSON", { virtuals: true });
PlayerSchema.set("toObject", { virtuals: true });
PlayerSchema.index({ owner: 1, team: 1 });
PlayerSchema.index({ fullName: "text", displayName: "text" });

export const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);

