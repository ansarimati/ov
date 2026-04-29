import * as E from "./enums"

// USER

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: E.UserRole;
  accountStatus: E.AccountStatus;
  avatar?: string;
  parentAdmin?: string;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
  twoFactorSecret?: string;
  lastLoginAt?: Date;
  lastLoginIP?: string;
  loginAttempts: number;
  lockedUntil?: Date;
  preferences: IUserPreferences;
  subscription: ISubscription;
  apiKeys: IApiKey[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPreferences {
  language: string;
  timezone: string;
  dateFormate: string;
  theme: "dark" | "light" | "system";
  defaultOversLimit: number;
  defaultMatchFormate: E.MatchFormat;
  scoringShortcuts: IScoringShortcut[];
  notificationSettings: {
    emailOnMatchComplete: boolean;
    emailSubscriptionHistory: boolean;
    pushNotification: boolean;
  };
}

export interface IScoringShortcut {
  key: string;
  action: string;
  label: string;
}

export interface IApiKey {
  _id: string;
  key: string;
  name: string;
  isActive: boolean;
  permissions: string[];
  rateLimit: number;
  lastUsedAt?: Date;
  expiresAt?: Date;
  createdAt: Date
}

// SUBSCRIPTION

export interface ISubscription {
  plan: E.SubscriptionPlan;
  status: E.SubscriptionStatus;
  billingCycle: E.BillingCycle;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  trialEndsAt?: Date;
  features: IPlanFeatures;
  usage: IUsageTracker;
  invoices: IInvoices[];
}

export interface IPlanFeatures {
  maxTournaments: number;
  maxMatchesPerMonth: number;
  maxTeam: number;
  maxPlayerPerTeam: number;
  maxScorers: number;
  maxOverlayViewers: number;
  maxStorageMB: number;
  customOverlays: boolean;
  customBranding: boolean;
  brandingRemoval: boolean;
  apiAccess: boolean;
  webhookAccess: boolean;
  advancedStats: boolean;
  wagonWheel: boolean;
  pitchMap: boolean;
  fieldPlacement: boolean;
  drsSupport: boolean;
  dlsCalculator: boolean;
  superOverSupport: boolean;
  multiLanguage: boolean;
  exportData: boolean;
  prioritySupport: boolean;
  whiteLabel: boolean;
  videoIntegration: boolean;
  commentaryFeature: boolean;
  playerPhotos: boolean;
  teamLogos: boolean;
  matchHighlights: boolean;
  historicalData: boolean;
}

export interface IUsageTracker {
  matchesThisMonth: number;
  tournamentsCreated: number;
  teamsCreated: number;
  storageUsedMB: number;
  apiCalledThisMonth: number;
  overlayViewsThisMonth: number;
  lastResetDate: Date;
}

export interface IInvoices {
  id: string;
  amound: number;
  currency: string;
  status: "paid" | "unpaid" | "overdue" | "refunded";
  paidAt?: Date;
  invoiceUrl?: string;
  createdAt: Date;
}

// PLAYERS

export interface Iplayer {
  _id: string;
  // personal info
  firstName: string;
  lastName: string;
  fullName: string;         // auto calculated
  displayName?: string;
  dateOfBirth?: Date;
  age?: number;             // auto calculated
  gender: E.PlayerGender;
  nationality?: string;
  city?: string;
  state?: string;
  photo?: string;
  thumbnailPhoto?: string;
  jerseyNumber?: number;

  // cricket details
  role: E.PlayerRole;
  battingStyle: E.BattingStyle;
  bowlingStyle: E.BowlingStyle;
  bowlingType?: E.BowlingType;
  preferredBattingPosition: E.BattingPosition;

  // Team and Owner
  team?: string;
  owner: string;
  availability: E.PlayerAvailability;
  injuryDetails: IInjuryRecord;

  // physical attributes
  height?: number;
  weight?: number;

  // contact for management
  email?: string;
  phone?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };

  // career stats aggregated
  careerStats: IPlayerCareerStats;

  // Format wise stats
  formateStats: {
    t10?: IPlayerFormatStats;
    t20?: IPlayerFormatStats;
    odi?: IPlayerFormatStats;
    firstCalss?: IPlayerFormatStats;
    test?: IPlayerFormatStats;
  };

  // milestone tracking
  milestones: IPlayerMilestone[];

  // awards
  awards: IPlayerAward[];

  // Notes 
  notes?: string;

  // MetaData
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInjuryRecord {
  type: string;
  description: string;
  injuredDate: Date;
  expectedReturnDate?: Date;
  severity: "minor" | "moderate" | "sever";
  bodyPart: string;
  isRecovered: boolean;
  recoveredDate?: Date;
}

export interface IPlayerCareerStats {
  matches: number;
  innings: number;

  batting: {
    innings: number;
    runs: number;
    ballsFaced: number;
    notOuts: number;
    highestScore: number;
    isHighestNotOut: boolean;
    average: number;
    strikeRate: number;
    fours: number;
    sixes: number;
    dotBallsFaced: number;
    dotBallPercentage: number;
    boundaryPercentage: number;
    fifties: number;
    hundreds: number;
    ducks: number;
    goldenDucks: number;
    thirties: number;
    nineties: number;
    longestInnings: number;

    // situation stats
    runsInPowerplay: number;
    ballsInPowerplay: number;
    runsInMiddle: number;
    ballsInMiddle: number;
    runsInDeath: number;
    ballsInDeath: number;

    // vs bowling type
    runsVsPace: number;
    ballsVsPace: number;
    wicketsVsPace: number;
    runsVsSpin: number;
    ballsVsSpin: number;
    wicketsVsSpin: number;

    // position stats
    runsAsOpener: number;
    inningsAsOpener: number;
    runsInChase: number;
    inningsInChase: number;
    notOutsInChase: number;

    // milestones
    totalSixes: number;
    totalFours: number;
    highestStrikeRateInnings: number;
    bestInningsScore: number;
    bestInningsBallls: number;

    // running between wickets
    singles: number;
    doubles: number;
    triples: number;
    runOuts: number;
  };

  bowling: {
    innings: number;
    overs: number;
    ballsBowled: number;
    runsConceded: number;
    wickets: number;
    average: number;
    economy: number;
    strikeRate: number;

    bestBowlingWickets: number;
    bestBowlingRuns: number;
    bestBowlingMatch?: string;   // match reference

    threeWicketHauls: number;
    fourWicketHauls: number;
    fiveWicketHauls: number;
    tenWicketHauls: number;

    maidens: number;
    dotBalls: number;
    dotBallPercentage: number;

    wides: number;
    noBalls: number;

    foursConceded: number;
    sixesConceded: number;
    boundaryPercentage: number;

    // By dismissal type
    wicketsBowled: number;
    wicketsCaught: number;
    wicketsLbw: number;
    wicketStumped: number;
    wicketsRunsOut: number;
    wicketsCaughtAndBowled: number;
    wicketsHitWicket: number;

    // phase bowling
    wicketsInPowerplay: number;
    runsInPowerplay: number;
    oversInPowerplay: number;
    wicketsInMiddle: number;
    runsInMiddle: number;
    oversInMiddle: number;
    wicketsInDeath: number;
    runsInDeath: number;
    overInDeath: number;

    // spell tracking
    bestSpellWickets: number;
    bestSpellRuns: number;
    bestSpellOvers: number;

    hatTricks: number;
    doubleHatTricks: number;
  };

  fielding: {
    catches: number;
    catchesAsWK: number;
    drops: number;
    runOuts: number;
    directHitRunOuts: number;
    stumpings: number;
    assistedRunOuts: number;
    catchesInSlips: number;
    catchesInOutField: number;
    catchesInClose: number;   // short leg, silly point
  };

  // as captain
  captaincy: {
    matchesAsCaptain: number;
    wins: number;
    losses: number;
    draws: number;
    ties: number;
    noResults: number;
    winPercentage: number;
    tossWins: number;
    tossBatFirst: number;
    tossBowlFirst: number;
  };
}

export interface IPlayerFormatStats {
  matches: number;
  batting: {
    innings: number;
    runs: number;
    average: number;
    strikeRate: number;
    highestScore: number;
    fifties: number;
    hundreds: number;
  };
  bowling: {
    innings: number;
    wickets: number;
    average: number;
    economy: number;
    bestBowling: string;
  };
}

export interface IPlayerMilestone {
  type: "batting" | "bowling" | "fielding" | "career";
  description: string;
  achievedAt: Date;
  matchId?: string;
  value: number
}

export interface IPlayerAward {
  name: string;
  matchId?: string;
  tournamentId?: string;
  date: Date;
  description?: string;
}

//  TEAM

export interface ITeam {
  _id: string;
  name: string;
  shortName: string;     // 3 - 5 char
  code: string;         // unique
  type: E.TeamType;
  status: E.TeamStatus;

  // Branding
  logo?: string;
  logoDark?: string;
  logoSmall?: string;
  banner?: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
  gradientStart?: string;
  gradientEnd?: string;

  // Leadership
  captain?: string;
  viceCaptain?: string;
  wicketKeeper?: string;
  coach?: string;
  manager?: string;
  ownerName?: string;

  // Roster
  players: string[];
  mexSquadSize: number;

  // Details
  homeGround?: string;
  city?: string;
  country?: string;
  foundedYear?: number;

  // Owner 
  owner: string;

  // Team stats
  teamStats: ITeamStats;

  createdAt: Date;
  updatedAt: Date;
}

export interface ITeamStats {
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  ties: number;
  noResults: number;
  winPercentage: number;

  highestScore: number;
  highestScoreMatch?: string;
  lowestScore: number;
  lowestScoreMatch?: string;

  highestSuccessfulChase: number;
  lowestDefendedTotal: number;

  totalRunsScored: number;
  totalRunsConceded: number;
  totalWicketsTaken: number;
  totalWicketsLost: number;

  // win/loss by batting first/second
  battingFirstWIns: number;
  battingFirstLosses: number;
  chasingWins: number;
  chasingLosses: number;

  // Streaks
  currentStreaks: {
    type: "win" | "loss" | "draw";
    count: number;
  };
  longestWinStreak: number;
  longestLossStreak: number;
  longestUnbeatenStreak: number;

  tournamentWins: number;
}

// venue

export interface IVenue {
  _id: string;
  name: string;
  shortName: string;
  city: string;
  state?: string;
  country: string;
  capacity?: number;

  // ground details
  groundDimensions?: {
    straightBoundary: number;
    squareBoundary: number;
    legSideBoundary?: number;
    offSideBoundary?: number;
  };

  pitchType: E.PitchType;
  pitchBehavior: E.PitchBehaviour;
  
  // Facilities
  hasFloodlights: boolean;
  hasDRS: boolean;
  hasHotSpot: boolean;

  // stats at this venue
  venueStats: {
    matchesPlayed: number;
    averageFirstInningScore: number;
    averageSecondInningScore: number;
    battingFirstWins: number;
    chasingWins: number;
    highestScore: number;
    lowestScore: number;
    highestChase: number;
    averagePaceWickets: number;
    averageSpinWickets: number;
  };

  // images
  photo?: string;
  pitchPhoto?: string;

  // timezone
  timezone: string;

  owner: string;
  createdAt: string;
  updatedAt: string;
}

//  Tournament

export interface ITournament {
  _id: string;
  name: string;
  shortName: string;
  season?: string;
  edition?: string;
  format: E.TournamentFormat;
  matchFormat: E.MatchFormat;
  status: E.TournamentStatus;
  gender: E.TournamentGender;
  ageGroup: E.TournamentAgeGroup;

  // Schedule
  startDate: Date;
  endDate: Date;
  registrationDeadline?: Date;

  // Rules
  oversLimit: number;
  powerplayOvers: IPowerplayConfig;
  ballType: E.BallType;
  playersPerSide: number;
  substitueAllowed: number;
  drsPerInnings: number;
  freeHitOnNoBall: boolean;
  superOverOnTie: boolean;
  boundaryCountRule: boolean;
  impactPlayerRule: boolean;
  dlsEnabled: boolean;
  retiredOutAllowed: boolean;

  // Bowling restriction
  maxOversPerBowler: number;
  maxBouncersPerOver: number;
  wideRules: IWideRules;

  // Points system
  pointsConfig: IPointsConfig;

  // Teams
  teams: string[];
  maxTeams: number;
  minTeams: number;

  // groups
  groups?: ITournamentGroup[];

  // Points Table
  pointsTable: IPointsTableEntry[];

  // knockout bracket
  knockoutBracket?: IKnockoutBracket;

  // awards
  awards?: ITournamentAward[];

  // Prizes
  prizes?: {
    winner?: string;
    runnerUp?: string;
    manOfTournament?: string;
    bestBatsman?: string;
    bestBowler?: string;
    bestFielder?: string;
    fairPlayAward?: string;
    emergingPlayer?: string;
  };

  // Branding
  logo?: string;
  banner?: string;
  sponsorLogos?: {
    name: string;
    logo: string;
    tier: "title" | "main" | "assoiate"
  }[];

  // location
  venues: string[]    //venues id

  // Description
  description?: string;
  rules?: string;

  // officials
  matchReferees?: string[];
  umpirePanel?: string[];

  owner: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IPowerplayConfig {
  enabled: boolean;
  phases: {
    name: string;
    startOver: number;
    endOver: number;
    maxFieldersOutSide: number;
    type: E.PowerplayType;
  }[];
}

export interface IWideRules {
  defaultWidth: number;
  additionalRunsOnWide: boolean;
  wideLineOff: boolean;
  wideLineLeg: boolean;
  bouncerWideAboveHead: boolean;
  bouncerWideAboveShoulder: boolean;
}

export interface IPointsConfig {
  win: number;
  loss: number;
  tie: number;
  draw: number;
  noResult: number;
  bonusPointWin: boolean;
  bonusPointThreshold?: number;
  penaltySlowOverRate?: number;
  netRunRateAsDecider: boolean;
}

export interface ITournamentGroup {
  name: string;
  teams: string[];
  qualifyCount: number;
}

export interface IPointsTableEntry {
  team: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  drawn: number;
  noResult: number;
  points: number;
  netRunRate: number;
  forRuns: number;
  forOvers: number;
  againstRuns: number;
  againsOvers: number;
  bonusPoints: number;
  penaltyPoints: number;
  position: number;
  qualified: boolean;
  lastFiveResults: ("W" | "L" | "T" | "NR" | "D")[];
  group?: string;
}

export interface IKnockoutBracket {
  rounds: {
    name: string;
    matches: {
      matchId?: string;
      team1?: string;
      team2?: string;
      winner?: string;
      placeholder1?: string;
      placeholder2?: string;
    }[];
  }[];
}

export interface ITournamentAward {
  name: string;
  player?: string;
  team?: string;
  matchId?: string;
  description?: string;
  date?: Date;
}

// Match
export interface IMatch {
  _id: string;

  // references
  tournament?: string;
  owner: string;

  // match identity
  matchNumber?: number;
  matchType: E.MatchType;
  matchFormat: E.MatchFormat;

  // Teams
  team1: string;
  team2: string;

  // venue and scheduled
  venue: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  dayNight: E.DayNight;
  ballType: E.BallType;

  // Rules
  oversLimit: number;
  playerPerSide: number;
  maxOversPerBowler: number;
  powerPlayConfig: IPowerplayConfig;
  drsAvailable: boolean;
  freeHitOnNoBall: boolean;
  superOverOnTie: boolean;

  // status
  status: E.MatchStatus;
  statusHistory: {
    status: E.MatchStatus;
    at: Date;
    reason?: string
  }[];

  // Toss
  toss?: IToss;

  // Playing XI
  playingXI: IPlayingXI;

  // Innings
  innings: IInnings[];

  // Super Over
  superOver?: ISuperOver[];

  // Result
  result: IMatchResult;

  // Drs
  drsReviews?: IDRSReview[];
  drsRemaining: {
    team1: number;
    team2: number;
  };

  // Weather and Conditions
  weather?: IMatchWeather;
  pitchCondition?: {
    type: E.PitchType;
    behavior: E.PitchBehaviour;
    notes?: string;
  };

  // Officials
  officials: IMatchOfficials;

  // Penalties
  penalties: IMatchPenalty[];

  // Awards
  manOfheMatch?: string;
  
  // Scoring
  scorer?: string;
  scorers?: string[];

  // Overlay
  overlaySettings: IOverlaySettings;

  // DLS
  dlsData: IDLSData;

  // Commentary
  commentaryEnabled: boolean;

  // Notes
  notes?: string;

  // Breaks
  breaks: IMatchBreak[];

  // MetaData
  isPublic: boolean;
  tags?: string[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IToss {
  wonBy: string;
  decidedTo: "bat" | "bowl";
  reason?: string;
  calledBy: string;
  called: "heads" | "tails";
  result: "heads" | "tails";
  time?: Date;
}

export interface IPlayingXI {
  team1: IPlayingXIEntry[];
  team2: IPlayingXIEntry[];
}

export interface IPlayingXIEntry {
  player: string;
  designation: E.PlayerDesignation;
  battingOrder: number;
  isForeignPlayer?: boolean;
  isSubstitute: boolean;
  substituteFor?: string;
  substituteReason?: "concussion" | "impact_player" | "tactical";
  isImpactPlayer: boolean;
  isUncapped?: boolean;
  timeIn?: Date;
}

export interface IInnings {
  _id: string;
  inningsNumber: number;
  type: E.InningsType;
  battingTeam: string;
  bowlingTeam: string;
  status: E.InningStatus;

  // Score
  totalRuns: number;
  totalWicket: number;
  totalBalls: number;
  totalExtras: number;
  totalOvers: number;

  // Extras breakdown
  extras: IExtrasBreakdown;

  // CUrrent state
  currentOver: IBallEvent[];
  currentOverNumber: number;
  currentBatsman1?: string;
  currentBatsman2?: string;
  currentBowler?: string;
  onStrike?: string;
  lastBowler?: string;

  // All overs
  overs: IOver[];

  // Batting details
  battingOrder: IBatsmanInnings[];

  // Bowling details
  bowlingFigures: IBowlerInnings[];

  // Partnership
  partnerships: IPartnership[];

  // Fall of wicket
  fallOfWickets: IFallofWicket[];

  // Phase stats
  phaseStats: IPhaseStats[];

  // Target (2nd Inning)
  target?: number;

  // DLS Par
  dlsPar?: number;
  dlsTarget?: number;

  // Timeline events
  events: IInningsEvent[];

  // Milestones acheived during innings
  milestones: IInningsMilestone[];

  startTie?: Date;
  endTime?: Date;
}

export interface IExtrasBreakdown {
  wides: number;
  noBalls: number;
  byes: number;
  legByes: number;
  penalties: number;
  total: number;
  //  details
  wideRuns: number;
  noBallRuns: number;
  byeRuns: number;
  legByRuns: number;
}

export interface IBallEvent {
  _id?: string;
  ballNumber: number;
  overNumber: number;
  globalBallNumber: number;

  // Player involved
  batsman: string;
  bowler: string;
  nonStriker: string;

  // Runs
  runs: number;
  batsmanRuns: number;
  extras: number;
  extrasType?: E.ExtrasType;

  // Ball details
  isLegalDelivery: boolean;
  isFour: boolean;
  isSix: boolean;
  isDotBall: boolean;
  isMaiden: boolean;

  // boundary details
  boundaryType?: E.BoundaryType;

  // Shot details
  shotType?: E.ShortType;
  wagonWheelRegion?: E.WagonWeelRegion;

  // Bowling details
  deliveryType?: E.DeliveryType;
  bowlingLength?: E.BowlingLength;
  bowlingLine?: E.BowlingLine;
  speed?: number;

  // wicket
  isWicket: boolean;
  dismissalType?: E.DismissalType;
  dismissedPlayer?: string;
  fielder?: string;
  fielderPosition?: E.FieldPosition;
  secondFielder?: string;
  runsOutEnd?: E.RunOutEnd;

  // Appeal
  wasAppealed: boolean;
  appealDecision?: E.AppealDecision;

  //  Free hit
  isFreeHit: boolean;
  isOnFreeHit: boolean;

  // Field placement snapshot
  fieldPositions?: E.FieldPosition[];

  // Commentary
  commentary?: string;
  autoCommentary?: string;

  // Run Tracking
  runBreakdown?: {
    batsmanRunning: number;
    boundaryRuns: number;
    overthrow: number;
    penaltyRuns: number;
  };

  // Scoring details
  crossedWhileRunning?: boolean;
  shortRun?: boolean;

  // Pressure/Momentum
  winProbabilityAfter?: {
    team1: number;
    team2: number;
  };

  timestamp: Date;
  scoredBy?: string; // scorer user id
}

export interface IOver {
  overNumber: number;
  bowler: string;
  balls: IBallEvent[];
  runs: number;
  wickets: number;
  extras: number;
  isMaiden: boolean;
  legalDeliveries: number;
  toalDeliveries: number;
  dotBalls: number;
  boundaries: number;
  sixes: number;
}

export interface IBatsmanInnings {
  player: string;
  position: number;
  designation: E.PlayerDesignation;

  // Scoring
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  dotBalls: number;
  dotBallPercentage: number;
  singles: number;
  doubles: number;
  triples: number;

  // Boundary %
  boundaryRuns: number;
  boundaryPercentage: number;

  // status
  isOut: boolean;
  isRetired: boolean;
  isNotOut: boolean;
  isOnStrike: boolean;
  isAtCrease: boolean;

  // Dismissal
  dismissalType?: E.DismissalType;
  dismissalDescription?: string;
  bowler?: string;
  fielder?: string;
  fielderPosition?: E.FieldPosition;

  // Phase wise
  runsInPowerplay: number;
  ballsInPowerplay: number;
  runsInMiddle: number;
  ballsInMiddle: number;
  runsInDeath: number;
  ballsInDeath: number;

  // vs bowling type
  runsVsPace: number;
  ballsVsPace: number;
  runsVsSpin: number;
  ballsVsSpin: number;

  // Milestones during innings
  reachedFiftyAt?: { balls: number, timestamp: Date };
  reachedHundredAt?: { balls: number, timestamp: Date };

  // Minutes at crease
  minutesAtCrease?: number;

  // wagon wheel data
  wagonWheelData: {
    region: E.WagonWeelRegion;
    runs: number;
    shots: number
  }[];

  timesIn?: Date;
  timesOut?: Date;
}

export interface IBowlerInnings {
  player: string;

  // Figures
  overs: number;
  ballsBowled: number;
  maidens: number;
  runsConceded: number;
  wickets: number;
  economy: number;

  // Detailed
  dotBalls: number;
  dotBallPercentage: number;
  wides: number;
  noBalls: number;
  foursConceded: number;
  sixesConceded: number;
  boundaryPercentage: number;

  // Spell trackin
  spells: IBowlingSpell[];
  currentSpell: number;

  // Phase-wise
  figuresInPowerplay: { overs: number; runs: number; wickets: number };
  figuresInMiddle: { overs: number; runs: number; wickets: number };
  figuresInDeath: { overs: number; runs: number; wickets: number };

  // Wicket details
  wicketBreakdown: {
    dismissalType: E.DismissalType;
    player: string;
    score: number;
  }[];

  // Pitch map data 
  pitchMapData: {
    length: E.BowlingLength;
    line: E.BowlingLine;
    count: number;
    runs: number;
    wickets: number;
  }[];

  // Speeds
  averageSpeed?: number;
  maxSpeed?: number;
  minSpeed?: number;
}

export interface IBowlingSpell {
  startsOver: number;
  endOver: number;
  overs: number;
  ballsBowled: number;
  runsConceded: number;
  wickets: number;
  maidens: number;
  dotBalls: number;
}

export interface IPartnership {
  wicketNumber: number;
  batsman1: string;
  batsman2: string;

  runs: number;
  balls: number;

  batsman1Runs: number;
  batsman1Balls: number;
  batsman1Fours: number;
  batsman1Sixes: number;

  batsman2Runs: number;
  batsman2Balls: number;
  batsman2Fours: number;
  batsman2Sixes: number;

  extras: number;

  runRate: number;
  
  isActive: boolean;
  isUnbeaten: boolean;
  isRecord: boolean;

  startScore: number;
  endScore: number;
  startsOvers: number;
  endOvers: number;

  // Scoring pattenr
  runsByOver: { over: number; runs: number }[];
}

export interface IFallofWicket {
  wicketNumber: number;
  player: string;
  score: number;
  overs: number;
  balls: number;
  partnership: number;
  dismissalType: E.DismissalType;
  bowler: string;
  fielder?: string;
  dismissalDescription: string;
}

export interface IPhaseStats {
  phaseName: string;
  startOver: number;
  endOver: number;
  runs: number;
  wickets: number;
  balls: number;
  runRate: number;
  dotBalls: number;
  boundaries: number;
  sixes: number;
  extras: number;
}

export interface IInningsEvent {
  type: "milestone" | "wicket" | "review" | "break" | "penalty" | "timeout" | "injury" | "substitute" | "fifty" |
    "hundred" | "five_wickets" | "hat_trick" | "maiden" | "free_hit";
  description: string;
  timestamp: Date;
  overNumber: number;
  ballNumber: number;
  playerId?: string;
  data?: unknown;
}

export interface IInningsMilestone {
  type: string;
  player?: string;
  description: string;
  at: { score: number; overs: number; balls: number };
  timestamp: Date;
}

// Super Over

export interface ISuperOver {
  number: number;
  team1 : {
    battingTeam: string;
    batsmen: string[];
    bowler: string;
    runs: number;
    wickets: number;
    balls: IBallEvent[];
  };
  team2: {
    battingTeam: string;
    batsmen: string[];
    bowler: string;
    runs: number;
    wickets: number;
    balls: IBallEvent[];
  };
  winner?: string;
}

// DRS

export interface IDRSReview {
  reviewNumber: number;
  innings: number;
  team: string;
  reviewedBy: string;
  overNumber: number;
  ballNumber: number;
  originalDecision: E.AppealDecision;
  reviewDecision: E.ReviewDecision;
  components: {
    type: E.ReviewComponent;
    result: string;
  }[];
  isSuccessful: boolean;
  reviewRetained: boolean;
  timestamp: Date;
}

// Match details

export interface IMatchOfficials {
  umpire1?: string;
  umpire2?: string;
  thirdUmpire?: string;
  matchReferee?: string;
  reserveUmpire?: string;
  scorer1: string;
  scorer2: string;
}

export interface IMatchWeather {
  condition: E.WeatherCondition;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  windDirection?: string;
  dewFactor?: "none" | "light" | "moderate" | "heavy";
  visibility?: "good" | "moderate" | "poor";
  updatedAt: Date;
}

export interface IMatchPenalty {
  type: E.PenaltyType;
  team: string;
  description: string;
  runs?: number;
  player?: string;
  overumber?: number;
  timestamp: Date;
}

export interface IMatchBreak {
  type: "drinks" | "lunch" | "tea" | "rain" | "bad_light" | "injury" | "startegic_timeout" | "other";
  startTime: Date;
  endTime: Date;
  duration?: number;
  reason?: string;
  innings?: number;
  oversAt?: number;
}

export interface IMatchResult {
  type: E.MatchResultType;
  winner?: string;                      // Team ID
  loser?: string;                       // Team ID
  margin?: number;
  marginType?: "runs" | "wickets" | "innings_and_runs";
  description: string;                  // "India won by 7 wickets"
  winningMethod?: string;               // "DLS", "Super Over"
  manOfTheMatch?: string;
  
  // Detailed
  team1Score: string;                   // "186/5 (20)"
  team2Score: string;                   // "190/3 (18.4)"
  
  dlsApplied: boolean;
  superOverPlayed: boolean;
}

export interface IDLSData {
  method: "standard" | "professional";
  par: number[];                        // Par score after each over
  target: number;
  revisedTarget?: number;
  revisedOvers?: number;
  interruptionDetails: {
    startOver: number;
    endOver: number;
    reason: string;
  }[];
}

// ======================== OVERLAY SETTINGS ========================

export interface IOverlaySettings {
  // Theme
  theme: E.OverlayTheme;
  
  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  scoreColor: string;
  wicketColor: string;
  
  // Team colors (override per match)
  team1Color?: string;
  team2Color?: string;
  
  // Gradients
  useGradient: boolean;
  gradientStart?: string;
  gradientEnd?: string;
  gradientAngle?: number;
  
  // Typography
  fontFamily: string;
  scoreFontFamily?: string;
  titleFontSize: number;
  scoreFontSize: number;
  
  // Logos
  logo?: string;                        // Tournament/series logo
  sponsorLogo?: string;
  sponsorLogoPosition: "left" | "right" | "center";
  broadcasterLogo?: string;
  
  // Layout
  position: E.OverlayPosition;
  width?: number;
  height?: number;
  padding?: number;
  borderRadius?: number;
  opacity?: number;
  
  // Information toggles
  showRunRate: boolean;
  showRequiredRunRate: boolean;
  showProjectedScore: boolean;
  showLastWicket: boolean;
  showPartnership: boolean;
  showCurrentOver: boolean;
  showBatsmenDetails: boolean;
  showBowlerDetails: boolean;
  showPowerplayStatus: boolean;
  showDLSTarget: boolean;
  showWinProbability: boolean;
  showReviewsRemaining: boolean;
  showMatchNumber: boolean;
  showVenue: boolean;
  showTournamentName: boolean;
  showTeamLogos: boolean;
  showBrandingWatermark: boolean;
  showSponsor: boolean;
  
  // Animation
  animationSpeed: "slow" | "normal" | "fast";
  animationStyle: "slide" | "fade" | "bounce" | "none";
  enableTransitions: boolean;
  autoHideSeconds?: number;
  
  // Chroma key
  chromaKeyEnabled: boolean;
  chromaKeyColor: string;               // For green screen
  
  // Sound
  soundEnabled: boolean;
  wicketSound?: string;
  boundarySound?: string;
  sixSound?: string;
  
  // Resolution
  resolution: "720p" | "1080p" | "4k";
}

// ======================== AUDIT LOG ========================

export interface IAuditLog {
  _id: string;
  userId: string;
  action: string;
  resource: string;                     // "match", "team", etc.
  resourceId: string;
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

// ======================== API RESPONSE ========================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: { field: string; message: string }[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  meta?: {
    requestId: string;
    responseTime: number;
  };
}