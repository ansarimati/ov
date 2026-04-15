import mongoose, { Schema } from "mongoose";
import * as E from "@/types/enums";
import { tr } from "date-fns/locale";

// Sub Schemas

const StatusHistorySchema = new Schema({
  statsu: {
    type: String,
    enum: Object.values(E.MatchStatus),
    required: true
  },
  at: {
    type: Date,
    default: Date.now
  },
  reason: String,
}, {
  _id: false
});

const TossSchema = new Schema({
  wonBy: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },
  decidedTo: {
    type: String,
    enum: ["bat", "bowl"],
    required: true
  },
  reason: String,
  calledBy: {
    type: Schema.Types.ObjectId,
    ref: "Player"
  },
  called: {
    type: String,
    enum: ["heads", "tails"],
    required: true
  },
  result: {
    type: String,
    enum: ["heads", "tails"],
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false
});

const PlayingXIEntrySchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    required: true
  },
  designation: {
    type: String,
    enum: Object.values(E.PlayerDesignation),
    default: E.PlayerDesignation.NONE
  },
  battingOrder: {
    type: Number,
    min: 1,
    max: 11
  },
  isForeignPlayer: {
    type: Boolean,
    default: false
  },
  isSubstitute: {
    type: Boolean,
    default: false,
  },
  substituteFOr: {
    type: Schema.Types.ObjectId,
    ref: "Player"
  },
  substituteReason: {
    type: String,
    enum: ["concussion", "impact_player", "tactical"],
  },
  isImpactPlayer: {
    type: Boolean,
    default: false,
  },
  isUncapped: {
    type: Boolean,
    default: false
  },
  timeIn: Date,
}, {
  _id: false
});

const RunBreakdownSchema = new Schema({
  batsmanRunning: { type: Number, default: 0 },
  boundaryRuns: { type: Number, default: 0 },
  overThrow: { type: Number, default: 0 },
  PenaltyRuns: { type: Number, default: 0 },
}, { _id: false });

const BallEventSchema = new Schema ({
  ballNumber: { type: Number, required: true },
  overNumber: { type: Number, required: true },
  globalBallNumber: { type: Number, required: true },
  batsman: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  bowler: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  nonStriker: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  runs: { type: Number, default: 0 },
  batsmanRuns: { type: Number, default: 0 },
  extras: { type: Number, default: 0 },
  extrasType: { type: String, enum: Object.values(E.ExtrasType) },
  isLegalDelivery: { type: Boolean, default: true },
  isFour: { type: Boolean, default: false },
  isSix: { type: Boolean, default: false },
  isDotBall: { type: Boolean, default: false },
  boundaryType: { type: String, enum: Object.values(E.BoundaryType) },
  shotType: { type: String, enum: Object.values(E.ShortType) },
  wagonWheelRegion: { type: String, enum: Object.values(E.WagonWeelRegion) },
  deliveryType: { type: String, enum: Object.values(E.DeliveryType) },
  bowlingLength: { type: String, enum: Object.values(E.BowlingLength) },
  bowlingLine: { type: String, enum: Object.values(E.BowlingLine) },
  speed: Number,
  isWicket: { type: Boolean, default: false},
  dismissalType: { type: String, enum: Object.values(E.DismissalType) },
  dismissedPlayer: { type: Schema.Types.ObjectId, ref: "Player" },
  fielder: { type: Schema.Types.ObjectId, ref: "Player" },
  fielderPosition: { type: String, enum: Object.values(E.FieldPosition) },
  secondFielder: { type: Schema.Types.ObjectId, ref: "Player" },
  runOutEnd: { type: String, enum: Object.values(E.RunOutEnd) },
  wasAppealed: { type: Boolean, default: false },
  appealDecision: { type: String, enum: Object.values(E.AppealDecision) },
  isFreeHit: { type: Boolean, default: false },
  isOnFreeHit: { type: Boolean, default: false },
  fieldPosition: [{ type: String, enum: Object.values(E.FieldPosition) }],
  commentary: String,
  autoCommentary: String,
  runsBReakdown: RunBreakdownSchema,
  crossedWhileRunning: Boolean,
  shortRun: Boolean,
  winProbabilityAfter: {
    team1: Number,
    team2: Number
  },
  timestamp: { type: Date, default: Date.now },
  scoredBy: { type: Schema.Types.ObjectId, ref: "User" }, 
}, { _id: false });

const OverSChema = new Schema({
  overNumber: { type: Number, required: true },
  bowler: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  balls: [BallEventSchema],
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  extras: { type: Number, default: 0 },
  isMaiden: { type: Boolean, default: false },
  legalDeliveries: { type: Number, default: 0 },
  totalDeliveries: { type: Number, default: 0 },
  dotBalls: { type: Number, default: 0 },
  boundaries: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
}, { _id: false });

const WagonWheelDataSchema = new Schema({
  region: { type: String, enum: Object.values(E.WagonWeelRegion) },
  runs: { type: Number, default: 0 },
  shots: { type: Number, default: 0 },
}, { _id: false });

const BatsmanInningsSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  position: { type: Number, required: true },
  designation: { type: String, enum: Object.values(E.PlayerDesignation), default: E.PlayerDesignation.NONE },
  run: { type: Number, default: 0 },
  ballsFaced: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  strikeRate: { type: Number, default: 0 },
  dotBalls: { type: Number, default: 0 },
  dotBallsPercentage: { type: Number, default: 0 },
  singles: { type: Number, default: 0 },
  doubles: { type: Number, default: 0 },
  triples: { type: Number, default: 0 },
  boundaryRuns: { type: Number, default: 0 },
  isOut: { type: Boolean, default: false },
  isRetired: { type: Boolean, default: false },
  isNotOut: { type: Boolean, default: false },
  isOnStrike: { type: Boolean, default: false },
  isAtCrease: { type: Boolean, default: false },
  dismissalType: { type: String, enum: Object.values(E.DismissalType) },
  dismissalDescription: String,
  bowler: { type: Schema.Types.ObjectId, ref: "Player" },
  fielder: { type: Schema.Types.ObjectId, ref: "Player" },
  fielderPosition: { type: String, enum: Object.values(E.FieldPosition) },
  runsInPowerplay: { type: Number, default: 0 },
  ballsInPowerplay: { type: Number, default: 0 },
  runsInMiddle: { type: Number, default: 0 },
  ballsInMiddle: { type: Number, default: 0 },
  runsInDeath: { type: Number, default: 0 },
  ballsInDeath: { type: Number, default: 0 },
  runsVsPace: { type: Number, default: 0 },
  ballsVsPace: { type: Number, default: 0 },
  runsVsSpin: { type: Number, default: 0 },
  ballsVsSpin: { type: Number, default: 0 },
  reachedFiftyAt: { balls: Number, timestamp: Date },
  reacahedHundredAt: { type: Number, timestamp: Date },
  minutesAtCrease: Number,
  wagonWheelData: [WagonWheelDataSchema],
  timeIn: Date,
  timeOut: Date,
}, { _id: false });

const BowlingSpellSchema = new Schema({
  startOver: Number,
  endOver: Number,
  overs: Number,
  ballsBowled: Number,
  runsConceded: Number,
  wickets: Number,
  maidens: Number,
  dotBalls: Number,
}, { _id: false });

const PitchMapDataSchema = new Schema({
  length: { type: String, enum: Object.values(E.BowlingLength) },
  line: { type: String, enum: Object.values(E.BowlingLine) },
  count: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
}, { _id: false });

const BowlerInningsSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  overs: { type: Number, default: 0 },
  ballsBowled: { type: Number, default: 0 },
  miadens: { type: Number, default: 0 },
  runsConceded: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  economy: { type: Number, default: 0 },
  dotBalls: { type: Number, default: 0 },
  dotBallPercentage: { type: Number, default: 0 },
  wides: { type: Number, default: 0 },
  noBalls: { type: Number, default: 0 },
  foursConceded: { type: Number, default: 0 },
  sixesCOnceded: {type: Number, default: 0 },
  boundaryPercentage: { type: Number, default: 0 },
  spells: [BowlingSpellSchema],
  currentSpell: { type: Number, default: 0 },
  figuresInPowerplay: { overs: { type: Number, default: 0 }, runs: { type: Number, default: 0 }, wickets: { type: Number, default: 0 } },
  figuresInMiddle: { overs: { type: Number, default: 0 }, runs: { type: Number, default: 0 }, wickets: { type: Number, default: 0 } },
  figuresInDeath: { overs: { type: Number, default: 0 }, runs: { type: Number, default: 0 }, wickets: { type: Number, default: 0 } },
  wicketBreakdown: [{
    dismisslaType: { type: String, enum: Object.values(E.DismissalType) },
    player: { type: Schema.Types.ObjectId, ref: "Player", },
    score: Number,
  }],
  pitchMapData: [PitchMapDataSchema],
  averageSpeed: Number,
  maxSpeed: Number,
  miSpeed: Number,
}, { _id: false });

const PartnershipSchema = new Schema({
  wicketNumber: { type: Number, required: true },
  batsman1: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  batsman2: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  runs: { type: Number, default: 0 },
  balls: {type: Number, default: 0 },
  batsman1Runs: {type: Number, default: 0 },
  batsman1Balls: { type: Number, default: 0 },
  batsman1Fours: { type: Number, default: 0 },
  batsman1Sixes: { type: Number, default: 0 },
  batsman2Runs: {type: Number, default: 0 },
  batsman2Balls: { type: Number, default: 0 },
  batsman2Fours: { type: Number, default: 0 },
  batsman2Sixes: { type: Number, default: 0 },
  extras: { type: Number, default: 0 },
  runRate: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isUnbeaten: {type: Boolean, default: false },
  startScore: { type: Number, default: 0 },
  endScore: Number,
  startOvers: { type: Number, default: 0 },
  endOvers: Number,
  runsByOvers: [{ over: Number, runs: Number }],
}, { _id: false});

const FallOfWicketSchema = new Schema({
  wicketNumber: { type: Number, required: true },
  player: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  score: { type: Number, required: true },
  overs: { type: Number, required: true },
  balls: { type: Number, required: true },
  partnership: { type: Number, default: 0 },
  dismissalType: { type: String, enum: Object.values(E.DismissalType) },
  bowler: { type: Schema.Types.ObjectId, ref: "Player", },
  fielder: { type: Schema.Types.ObjectId, ref: "Player", },
  dismissalDescription: String,
}, { _id: false });

const PhaseStatsSchema = new Schema({
  phaseName: String,
  startOver: Number,
  endOver: Number,
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  runRate: { type: Number, default: 0 },
  dotBalls: { type: Number, default: 0 },
  boundaries: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  extras: { type: Number, default: 0 },
}, { _id: false });

const InningsEventSchema = new Schema({
  type: { type: String, required: true },
  description: String,
  timestamp: { type: Date, default: Date.now },
  overNumber: Number,
  ballNumber: Number,
  playerId: { type: Schema.Types.ObjectId, ref: "Player" },
  data: Schema.Types.Mixed,
}, { _id: false });

const ExtrasBreakdownSchema = new Schema({
  wides: { type: Number, default: 0 },
  noBalls: { type: Number, default: 0 },
  byes: { type: Number, default: 0 },
  legBys: { type: Number, default: 0 },
  penalties: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  wideRuns: { type: Number, default: 0 },
  noBallsRuns: { type: Number, default: 0 },
  byRuns: { type: Number, default: 0 },
  legByRuns: { type: Number, default: 0 },
}, { _id: false });

const InningsSchema = new Schema({
  inningsNumber: { type: Number, required: true },
  type: { type: String, enum: Object.values(E.InningsType), default: E.InningsType.NORMAL },
  battingTeam: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  bowlingTeam: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  status: { type: String, enum: Object.values(E.InningStatus), default: E.InningStatus.NOT_STARTED },
  totalRuns: { type: Number, default: 0 },
  totalWickets: { type: Number, default: 0 },
  totalBalls: { type: Number, default: 0 },
  totalExtras: { type: Number, default: 0 },
  totalOvers: { type: Number, default: 0 },
  extras: { type: ExtrasBreakdownSchema, default: () => ({}) },
  currentOver: [ BallEventSchema ],
  currentOverNumber: { type: Number, default: 0 },
  currentBatsman1: { type: Schema.Types.ObjectId, ref: "Player" },
  currentBatsman2: { type: Schema.Types.ObjectId, ref: "Player" },
  currentBowler: { type: Schema.Types.ObjectId, ref: "Player" },
  onStrike: { type: Schema.Types.ObjectId, ref: "Player" },
  lastBowler: { type: Schema.Types.ObjectId, ref: "Player" },
  overs: [OverSChema],
  battingOrder: [BatsmanInningsSchema],
  bowlingOrder: [BowlerInningsSchema],
  partnership: [PartnershipSchema],
  fallOfWiket: [FallOfWicketSchema],
  phaseStats: [PhaseStatsSchema],
  target: Number,
  dlsPar: Number,
  dlsTarget: Number,
  events: [InningsEventSchema],
  milestones: [{ type: String, description: String, player: { type: Schema.Types.ObjectId, ref: "Player" }, at: { score: Number, overs: Number , timestamp: Date} }],
  startTime: Date,
  endTime: Date
}, { _id: false });

const SuperOverTeamSchema = new Schema({
  battingTeam: { type: Schema.Types.ObjectId, ref: "Team" },
  batsman: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  bowler: { type: Schema.Types.ObjectId, ref: "Player" },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  balls: [BallEventSchema],
}, { _id: false });

const SuperOverSchema = new Schema({
  number: { type: Number, default: 1 },
  team1: SuperOverTeamSchema,
  team2: SuperOverTeamSchema,
  winner: { type: Schema.Types.ObjectId, ref: "Team" }
}, { _id: false });

const DRSReviewSchema = new Schema({
  reviewNumber: Number,
  innings: Number,
  team: { type: Schema.Types.ObjectId, ref: "Team" },
  reviewedBy: { type: Schema.Types.ObjectId, ref: "Player" },
  overNumber: Number,
  ballNumber: Number,
  originalDecision: { type: String, enum: Object.values(E.AppealDecision) },
  components: [{
    type: { type: String, enum: Object.values(E.ReviewComponent) },
    result: String
  }],
  isSuccessfull: Boolean,
  reviewedRetained: Boolean,
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const MatchBreakSchema = new Schema ({
  type: { type: String, enum: ["drinks", "lunch", "team", "rain", "bad_light", "injury", "strategic_timeout", "other"] },
  startTime: Date,
  endTime: Date,
  duration: Number,
  reason: String,
  innings: Number,
  oversAt: Number,
}, { _id: false });

const MatchPenaltySchema = new Schema ({
  type: { type: String, enum: Object.values(E.PenaltyType) },
  team: { type: Schema.Types.ObjectId, ref: "Team" },
  description: String,
  runs: Number,
  player: { type: Schema.Types.ObjectId, ref: "Player" },
  overNumber: Number,
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const PowerPlayPhaseSchema = new Schema({
  name: String,
  startOver: Number,
  endOver: Number,
  maxFielderOutside: Number,
  type: { type: String, enum: Object.values(E.PowerplayType) },
}, { _id: false });

const OverlaySettingsSchema = new Schema({
  theme: { type: String, enum: Object.values(E.OverlayTheme), default: E.OverlayTheme.MODERN },
  primaryColor: { type: String, default: "#1a56db" },
  secondaryColor: { type: String, default: "#e74c3c" },
  accentColor: { type: String, default: "#f59e0b" },
  backgroundColor: { type: String, default: "#000000" },
  textColor: { type: String, default: "#ffffff" },
  scoreColor: { type: String, default: "#ffffff" },
  wicketColor: { type: String, default: "#ef4444" },
  team1Color: String,
  team2Color: String,
  userGradient: { type: Boolean, default: true },
  gradientStart: String,
  gradientEnd: String,
  gradientAngle: { type: Number, default: 135 },
  fontFamily: { type: String, default: "Inter" },
  scoreFontFamily: String,
  titleFontSize: { type: Number, default: 14 },
  scoreFontSize: { type: Number, default: 32 },
  logo: String,
  sponsorLogo: String,
  sponsorLogoPosition: { type: String, enum: ["left", "right", "center"], default: "right" },
  broadcasterLogo: String,
  position: { type: String, enum: Object.values(E.OverlayPosition), default: E.OverlayPosition.BOTTOM_LEFT },
  width: Number,
  height: Number,
  padding: { type: Number, default: 16 },
  borderRadius: { type: Number, default: 12 },
  opacity: { type: Number, default: 95 },
  showRunRate: { type: Boolean, default: true },
  showRequiredRunRate: { type: Boolean, default: true },
  showProjectedScore: { type: Boolean, default: true },
  showLastWicket: { type: Boolean, default: true },
  showPartnership: { type: Boolean, default: true },
  showCurrentOver: { type: Boolean, default: true },
  showBatsmenDetails: { type: Boolean, default: true },
  showBowlerDetails: { type: Boolean, default: true },
  showPowerplayStatus: { type: Boolean, default: true },
  showDLSTarget: { type: Boolean, default: false },
  showWinProbability: { type: Boolean, default: false },
  showReviewsRemaining: { type: Boolean, default: true },
  showMatchNumber: { type: Boolean, default: false },
  showVenue: { type: Boolean, default: false },
  showTournamentName: { type: Boolean, default: false },
  showTeamLogos: { type: Boolean, default: true },
  showBrandingWatermark: { type: Boolean, default: true },
  showSponsor: { type: Boolean, default: false },
  animationSpeed: { type: String, enum: ["slow", "normal", "fast"], default: "normal" },
  animationStyle: { type: String, enum: ["slide", "fade", "bounce", "none"], default: "slide" },
  enableTransitions: { type: Boolean, default: true },
  autoHideSeconds: Number,
  chromaKeyEnabled: { type: Boolean, default: false },
  chromaKeyColor: { type: String, default: "#00ff00" },
  soundEnabled: { type: Boolean, default: false },
  wicketSound: String,
  boundarySound: String,
  sixSound: String,
  resolution: { type: String, enum: ["720p", "1080p", "4k"], default: "1080p" },
}, { _id: false });

const MatchResultSchema = new Schema({
  type: { type: String, enum: Object.values(E.MatchResultType) },
  winner: { type: Schema.Types.ObjectId, ref: "Team" },
  loser: { type: Schema.Types.ObjectId, ref: "Team" },
  margin: Number,
  marginType: { type: String, enum: ["runs", "wickets", "innings_and_runs"] },
  description: String,
  winningMethod: String,
  manOfTheMatch: { type: Schema.Types.ObjectId, ref: "Player" },
  team1Score: String,
  team2Score: String,
  dlsApplied: { type: Boolean, default: false },
  superOverPlayed: { type: Boolean, default: false },
}, { _id: false });

// ===================== MAIN MATCH SCHEMA =====================

const MatchSchema = new Schema(
  {
    tournament: { type: Schema.Types.ObjectId, ref: "Tournament" },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    matchNumber: Number,
    matchType: { type: String, enum: Object.values(E.MatchType), default: E.MatchType.LEAGUE },
    matchFormat: { type: String, enum: Object.values(E.MatchFormat), default: E.MatchFormat.T20 },
    team1: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    team2: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    venue: { type: String, required: true },
    venueRef: { type: Schema.Types.ObjectId, ref: "Venue" },
    date: { type: Date, required: true },
    startTime: Date,
    endTime: Date,
    dayNight: { type: String, enum: Object.values(E.DayNight), default: E.DayNight.DAY },
    ballType: { type: String, enum: Object.values(E.BallType), default: E.BallType.WHITE },
    oversLimit: { type: Number, required: true, default: 20 },
    playersPerSide: { type: Number, default: 11 },
    maxOversPerBowler: { type: Number, default: 4 },
    powerplayConfig: {
      enabled: { type: Boolean, default: true },
      phases: [PowerPlayPhaseSchema],
    },
    drsAvailable: { type: Boolean, default: false },
    drsPerInnings: { type: Number, default: 2 },
    freeHitOnNoBall: { type: Boolean, default: true },
    superOverOnTie: { type: Boolean, default: true },
    status: { type: String, enum: Object.values(E.MatchStatus), default: E.MatchStatus.DRAFT },
    statusHistory: [StatusHistorySchema],
    toss: TossSchema,
    playingXI: {
      team1: [PlayingXIEntrySchema],
      team2: [PlayingXIEntrySchema],
    },
    innings: [InningsSchema],
    superOvers: [SuperOverSchema],
    result: MatchResultSchema,
    drsReviews: [DRSReviewSchema],
    drsRemaining: {
      team1: { type: Number, default: 2 },
      team2: { type: Number, default: 2 },
    },
    weather: {
      condition: { type: String, enum: Object.values(E.WeatherCondition) },
      temperature: Number,
      humidity: Number,
      windSpeed: Number,
      windDirection: String,
      dewFactor: { type: String, enum: ["none", "light", "moderate", "heavy"] },
      visibility: { type: String, enum: ["good", "moderate", "poor"] },
      updatedAt: Date,
    },
    pitchCondition: {
      type: { type: String, enum: Object.values(E.PitchType) },
      behavior: { type: String, enum: Object.values(E.PitchBehaviour) },
      notes: String,
    },
    officials: {
      umpire1: String,
      umpire2: String,
      thirdUmpire: String,
      matchReferee: String,
      reserveUmpire: String,
    },
    penalties: [MatchPenaltySchema],
    manOfTheMatch: { type: Schema.Types.ObjectId, ref: "Player" },
    scorer: { type: Schema.Types.ObjectId, ref: "User" },
    scorers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    overlaySettings: { type: OverlaySettingsSchema, default: () => ({}) },
    commentaryEnabled: { type: Boolean, default: true },
    notes: String,
    breaks: [MatchBreakSchema],
    isPublic: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true }
);

MatchSchema.index({ owner: 1, status: 1 });
MatchSchema.index({ tournament: 1 });
MatchSchema.index({ data: -1 });

// Auto set default powerplay for T20;
MatchSchema.pre("save", function () {
  if (this.isNew && (!this.powerplayConfig?.phases || this.powerplayConfig?.phases.length === 0)) {
    if (this.matchFormat === E.MatchFormat.T20 || this.matchFormat === E.MatchFormat.T10) {
      // this.powerplayConfig = {
      //   enabled: true,
      //   phases: [
      //     { name: "Powerplay", startOver: 1, endOver: 6, maxFielderOutside: 2, type: E.PowerplayType.MANDATORY } 
      //   ]
      // }

      this.set("powerplayConfig", {
        enabled: true,
        phases: [
          { name: "Powerplay", startOver: 1, endOver: 6, maxFielderOutside: 2, type: E.PowerplayType.MANDATORY },
          { name: "Middle Overs", startOver: 7, endOver: 15, maxFielderOutside: 5, type: E.PowerplayType.NONE },
          { name: "Death Overs", startOver: 16, endOver: 20, maxFielderOutside: 5, type: E.PowerplayType.NONE }
        ],
      });
    } else if ( this.matchFormat === E.MatchFormat.ODI ) {
      this.set("powerplayConfig", {
        enabled: true,
        phases: [
          { name: "Powerplay 1", startOver: 1, endOver: 10, maxFielderOutside: 2, type: E.PowerplayType.MANDATORY },
          { name: "Middle Overs", startOver: 11, endOver: 40, maxFielderOutside: 5, type: E.PowerplayType.NONE },
          { name: "Death Overs", startOver: 41, endOver: 50, maxFielderOutside: 5, type: E.PowerplayType.NONE },
        ],
      });
    }
  }

  // Auto set max overs per bowler
  if (this.isNew && !this.maxOversPerBowler) {
    this.maxOversPerBowler = Math.floor(this.oversLimit / 5);
  }

});

export const Match = mongoose.models.Match || mongoose.model("Match", MatchSchema);