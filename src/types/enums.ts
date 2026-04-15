// USER and AUTH

export enum UserRole {
  SUPER_ADMIN = "super_admin",    // Platform owner
  ADMIN = "admin",                // Purchased customer
  SCORER = "scorer",              // Assigned Scorer
  COMMENTATOR = "commentator",    // Can add commentary
  ANALYST = "analyst",            // View stats only
  VIEWER = "viewer"               // Public overlay consumer
}

export enum AccountStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  BANNED = "banned",
  PENDING_VERIFICATION = "pending_verification",
  DEACTIVATED = "deactivated"
}

// Subscription

export enum SubscriptionPlan {
  FREE = "free",
  STARTER = "starter",
  PRO = "pro",
  ENTERPRISE = "enterprise",
  CUSTOM = "custom"
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  TRIALING = "trialing",
  PAST_DUE = "past_due",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
  PAUSED = "paused"
}

export enum BillingCycle {
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  YEARLY = "yearly",
  LIFETIME = "lifetime"
}

// Player

export enum PlayerRole {
  BATSMAN = "batsman",
  BOWLER = "bowler",
  ALL_ROUNDER = "all_rounder",
  WICKETKEEPER = "wicketkeeper",
  WICKETKEEPER_BATSMAN = "wicketkeeper_batsman",
  BOWLING_ALL_ROUNDER = "bowling_all_rounder",
  BATTING_ALL_ROUNDER = "batting_all_rounder"
}

export enum PlayerDesignation {
  CAPTAIN = "captain",
  VICE_CAPTAIN = "vice_captain",
  WICKETKEEPER = "wicketkeeper",
  TWELFTH_MAN = "twelfth_man",
  SUBSTITUTE = "substitute",
  CONCUSSION_SUBSTITUTE = "concussion_substitute",
  IMAPCT_PLAYER = "impact_player",
  NONE = "none"
}

export enum BattingStyle {
  RIGHT_HANDED = "right_handed",
  LEFT_HANDED = "left_handed"
}

export enum BattingPosition {
  OPENER = "opener",
  TOP_ORDER = "top_order", // 3 - 4
  MIDDLE_ORDER = "middle_order", // 5 - 6
  LOWER_MIDDLE_ORDER = "lower_middle_order", // 7
  LOWER_ORDER = "lower_order", // 8 - 9
  TAILENDER = "tailender", // 10 - 11
  FLEXIBLE = "flexible"
}

export enum BowlingStyle {
  RIGHT_ARM_FAST = "right_arm_fast",
  RIGHT_ARM_FAST_MEDIUM = "right_arm_fast_medium",
  RIGHT_ARM_MEDIUM = "right_arm_medium",
  RIGHT_ARM_MEDIUM_FAST = "right_arm_medium_fast",
  LEFT_ARM_FAST = "left_arm_fast",
  LEFT_ARM_FAST_MEDIUM = "left_arm_fast_medium",
  LEFT_ARM_MEDIUM = "left_arm_medium",
  LEFT_ARM_MEDIUM_FAST = "left_arm_medium_fast",
  RIGHT_ARM_OFF_SPIN = "right_arm_off_spin",
  RIGHT_ARM_OFF_BREAK = "right_arm_off_break",
  RIGHT_ARM_LEG_SPIN = "right_arm_leg_spin",
  RIGHT_ARM_LEG_BREAK = "right_arm_leg_break",
  LEFT_ARM_ORTHODOX = "left_arm_orthodox",
  LEFT_ARM_CHINAMAN = "left_arm_chinaman",
  LEFT_ARM_WRIST_SPIN = "left_arm_wrist_spin",
  SLOW_LEFT_ARM = "slow_left_arm",
  slow_RIGHT_ARM = "slow_right_arm",
  RIGHT_ARM_GOOGLY = "right_arm_googly",
  DOES_NOT_BOWL = "does_not_bowl"
}

export enum BowlingType {
  PACE = "pace",
  SPIN = "spin",
  MEDIUM_PACE = "medium_pace"
}

export enum PlayerAvailability {
  AVAILABLE = "available",
  INJURED = "injured",
  RESTED = "rested",
  SUSPENDED = "suspended",
  NOT_AVAILABLE = "not_available",
  INTERNATIONAL_DUTY = "international_duty",
  PERSONAL_REASON = "personal_reasons",
  RETIRED = "retired",
  DROPPED = "dropped"
}

export enum PlayerGender {
  MALE = "male",
  FEMALE = "female"
}

//  TEAM

export enum TeamType {
  CLUB = "club",
  FRENCHISE = "frenchise",
  NATIONAL = "national",
  STATE = "state",
  DISTRICT = "district",
  SCHOOL = "school",
  University = "university",
  CORPORATE = "corporate",
  ACADEMY = "academy",
  OTHER = "other"
}

export enum TeamStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DISABLED = "disbaled",
  SUSPENDED = "suspended"
}

// TOURNAMENT

export enum TournamentFormat {
  LEAGUE = "league",
  KNOCKOUT = "knockout",
  DOUBLE_ELIMINATION = "double_elimination",
  GROUP_KNOCKOUT = "group_knockout",
  SUPER_LEAGUE = "super_league",
  BILATERAL = "bilateral",
  TRI_SERIES = "tri_series",
  ROUND_ROBIN_PLUS_FINAL = "round_robin_plus_final",
  CUSTOM = "custom"
}

export enum TournamentStatus {
  DRAFT = "draft",
  REGISTRATION_OPEN = "registration_open",
  REGISTRATION_CLOSED = "registration_closed",
  FIXTURES_GENERATED = "fixtures_generated",
  UPCOMING = "upcoming",
  LIVE = "live",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  POSTPONED = "postponed"
}

export enum TournamentGender {
  MENS = "mens",
  WOMENS = "womens",
  MIXED = "mixed"
}

export enum TournamentAgeGroup {
  OPEN = "open",
  UNDER_11 = "under_11",
  UNDER_13 = "under_13",
  UNDER_15 = "under_15",
  UNDER_17 = "under_17",
  UNDER_19 = "under_19",
  UNDER_23 = "under_23",
  SENIOR = "senior",
  VETERANS = "veterans",
  LEGENDS = "legends"
}

// Match

export enum MatchFormat {
  T10 = "t10",
  T20 = "t20",
  ODI = "odi",
  FIRST_CLASS = "frist_class",
  TEST = "test",
  THE_HUNDRED = "the_hundred",
  CUSTOM = "custom"
}

export enum MatchStatus {
  DRAFT = "draft",
  SCHEDULED = "scheduled",
  TOSS = "toss",
  DELAYED = "delayed",
  LIVE = "live",
  DRINK_BREAK = "drink_break",
  LUNCH_BREAK = "lunch_break",
  TEA_BREAK = "tea_break",
  INNINGS_BREAK = "innings_break",
  STRATEGIC_TIMEOUT = "strategic_timeout",
  RAIN_DELAY = "rain_delay",
  BAD_LIGHT = "bad_light",
  REVIEW = "review",    
  COMPLETED = "completed",
  ABANDONED = "abandoned",
  NO_RESULT = "no_result",
  SUPER_OVER = "super_over",
  DLS_APPLIED = "dis_applied",
  SUSPENDED = "suspended"
}

export enum MatchType {
  LEAGUE = "league",
  SEMI_FINAL = "semi_final",
  QUALIFIER_1 = "qualifier_1",
  QUALIFIER_2 = "qualifier_2",
  ELIMINIATOR = "eliminator",
  FINAL = "final",
  WARM_UP = "war_up",
  PRACTICE = "practice",
  FRIENDLY = "friendly",
  GROUP_STAGE = "group_stage",
  SUPER_EIGHT = "super_eight",
  SUPER_SIX = "super_six",
  PLAY_OFF = "play_off"
}

export enum InningStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  DECLARED = "declared",
  FORFEITED = "forfeited",
  ALL_OUT = "all_out",
  OVER_COMPLETED = "overs_completed",
  TARGET_CHASED = "target_chased",
  SUPER_OVER = "super_over"
}

export enum InningsType {
  NORMAL = "normal",
  SUPER_OVER = "super_over",
  FOLLOW_ON = "follow_on"
}

// SCORING

export enum DismissalType {
  BOWLED = "bowled",
  CAUGHT = "caught",
  CAUGHT_BEHIND = "caught_behind",
  CAUGHT_AND_BOWLED = "caught_and_bowled",
  LBW = "lbw",
  RUN_OUT = "run_out",
  STUMPED = "stumped",
  HIT_WICKET = "hit_wicket",
  HANDLED_THE_BALL = "handled_the_ball",
  OBSTRUCTING_FIELD = "obstructing_field",
  HIT_BALL_TWICE = "hit_ball_twice",
  TIMED_OUT = "timed_out",
  RETIRED_HURT = "retired_hurt",
  RETIRED_OUT = "retired_out",
  RETIRED_NOT_OUT = "retired_not_out",
  MANKADED = "mankaded",
  ABSENT_HURT = "absent_hurt"
}

export enum ExtrasType {
  WIDE = "wide",
  NO_BALL = "no_ball",
  BYE = "bye",
  LEG_BYE = "leg_bye",
  PENALTY = "penalty",
  NO_BALL_BYE = "no_ball_bye",
  NO_BALL_LEG_BYE = "no_ball_leg_bye",
  WIDE_BYE = "wide_bye"
}

export enum ShortType {
  DEFENSIVE = "defensive",
  DRIVE_COVER = "drive_cover",
  DRIVE_STRAIGHT = "drive_straight",
  DRIVE_ON = "drive_on",
  DRIVE_OFF = "drive_off",
  CUT = "cut",
  PULL = "pull",
  HOOK = "hook",
  SWEEP = "sweep",
  REVERSE_SWEEP = "reverse_sweep",
  PADDLE_SWEEP = "paddle_sweep",
  SWITCH_HIT = "switch_hit",
  SCOOP = "scoop",
  RAMP = "ramp",
  UPPER_CUT = "upper_cut",
  FLICK = "flick",
  GLANCE = "glance",
  LATE_CUT = "late_cut",
  EDGE = "edge",
  INSIDE_EDGE = "inside_edge",
  OUTSIDE_EDGE = "outside_edge",
  TOP_EDGE = "top_edge",
  LEADING_EDGE = "leading_edge",
  SLOG = "slog",
  SLOG_SWEEP = "slog_sweep",
  LOFT = "loft",
  HELICOPTER = "helicopter",
  DILSCOOP = "dilscoop",
  LEAVE = "leave",
  MISSED = "missed",
  BLOCK = "block",
  PUSH = "push",
  DAB = "dab",
  NURDLE = "nurdle"
}

export enum BowlingLength {
  FULL_TOSS = "full_toss",
  YORKER = "yorker",
  FULL = "full",
  GOOD = "good",
  BACK_OF_LENGTH = "back_of_length",
  SHORT = "short",
  BOUNCER = "bouncer",
  BEAMER = "beamer"
}

export enum BowlingLine {
  OUTSIDE_OFF_WIDE = "outside__off_wide",
  OUTSIDE_OFF = "outside_off",
  OFF_STUMP = "off_stump",
  MIDDLE_STUMP = "middle_stump",
  LEG_STUMP = "leg_stump",
  OUTSIDE_LEG = "outside_leg",
  OUTSIDE_LEF_WIDE = "outside_leg_wide",
  ON_THE_PADS = "on_the_pads"
}

export enum DeliveryType {
  NORMAL = "normal",
  INSWING = "inswing",
  OUTSWING = "outswing",
  REVERSE_SWING = "reverse_swing",
  SEAM = "seam",
  CUTTER_OFF = "cutter_off",
  CUTTER_LEG = "cutter_leg",
  SLOWER_BALL = "slower_ball",
  BOUNCER = "bouncer",
  YORKER = "yorker",
  KNUCKLE_BALL = "knuckle_ball",
  OFF_SPIN = "off_spin",
  LEG_SPIN = "leg_spin",
  GOOGLY = "googly",
  TOP_SPIN = "top_spin",
  FLIPPER = "flipper",
  DOOSRA = "doosra",
  CARROM_BALL = "carrom_ball",
  ARM_BALL = "arm_ball",
  SLIDER = "slider",
  TEESRA = "teesra"
}

export enum FieldPosition {
  WICKETKEEPER = "wicketkeeper",
  FIRST_SLIP = "first_slip",
  SECOND_SLIP = "second_slip",
  THIRD_SLIP = "third_slip",
  FOURTH_SLIP = "fourth_slip",
  FLY_SLIP = "fly_slip",
  LEG_SLIP = "leg_slip",
  GULLY = "gully",
  POINT = "point",
  COVER_POINT = "cover_point",
  COVER = "cover",
  EXTRA_COVER = "extra_cover",
  MIDD_OFF = "mid_off",
  MID_ON = "mid_on",
  MID_WICKET = "mid_wicket",
  SQUARE_LEG = "sqaure_leg",
  LEG_GULLY = "leg_gully",
  FINE_LEG = "fine_leg",
  DEEP_FINE_LEG = "deep_fine_leg",
  DEEP_SQUARE_LEG = "deep_square_leg",
  DEEP_MID_WICKET = "deep_mid_wicket",
  LONG_ON = "long_on",
  LONG_OFF = "long_off",
  DEEP_COVER = "deep_cover",
  DEEP_POINT = "deep_point",
  DEEP_EXTRA_COVER = "deep_extra_cover",
  THIRD_MAN = "third_man",
  DEEP_THIRD_MAN = "deep_third_man",
  SHORT_LEG = "short_leg",
  SILLY_POINT = "silly_point",
  SILLY_MID_ON = "silly_mid_on",
  SILLY_MID_OFF = "silly_mid_off",
  SHORT_MID_WICKET = "short_mid_wicket",
  FORWARD_SHORT_LEGT = "forward_short_leg",
  BACKWARD_SHORT_LEG = "backward_short_leg",
  DEEP_BACKWARD_SQUARE = "deep_backward_square",
  SWEEPER = "sweeper",
  COW_CORNER = "cow_corner",
  LONG_STOP = "long_stop"
}

export enum RunOutEnd {
  STRIKER_END = "striker_end",
  NON_STRIKER_END = "non_striker_end"
}

export enum BoundaryType {
  ALONG_GROUND = "along_ground",
  OVER_BOUNDARY = "over_boundary",
  ONE_BOUNCE = "one_bounce",
  DIRECT = "direct"
}

export enum WagonWeelRegion {
  THIRD_MAN = "third_man",
  POINT = "point",
  COVER = "cover",
  MID_OFF = "mid_off",
  STRAIGHT = "straight",
  MID_ON = "mid_on",
  MID_WICKET = "mid_wicket",
  SQAURE_LEG = "sqaure_leg",
  FIND_LEG = "fine_leg"
}

// DRS / REVIEW

export enum ReviewType {
  DRS_BATTING = "drs_batting",
  DRS_BOWLING = "drs_bowling",
  UMPIRES_CALL = "umpires_call"
}

export enum ReviewDecision {
  UPHELD = "upheld",
  OVERTURNED = "overturned",
  UMPIRES_CALL = "umpires_call"
}

export enum ReviewComponent {
  BALL_TRACKING = "ball_tracking",
  ULTRAEDGE = "ultraedge",
  HOTSPOT = "hotspot",
  REAL_TIME_SNICKOMETER = "real_time_snickometer",
}

// POWERPLAY

export enum PowerplayType {
  MANDATORY = "mandatory",
  BATTING = "batting",
  BOWLING = "bowling",
  NONE = "none"
}

//  WEATHER / PITCH

export enum PitchType {
  GREEN = "green",
  DRY  = "dry",
  DUSTY = "dusty",
  FLAT = "flat",
  DAMP = "damp",
  CRACKED = "cracked",
  SYNTHETIC = "synthetic",
  MATTING = "matting",
  TURF = "turf"
}

export enum PitchBehaviour {
  PACE_FRIENDLY = "pace_friendly",
  SPIN_FRIENDLY = "spin_friendly",
  BALANCED = "balanced",
  BATTING_FRIENDLY = "batting_friendly",
  DETERIORATING = "deteriorating",
  TWO_PACED = "two_paced"
}

export enum WeatherCondition {
  SUNNY = "sunny",
  PARTLY_CLOUDY = "partly_cloudy",
  CLOUDY = "cloudy",
  OVERCAST = "overcast",
  LIGHT_RAIN = "light_rain",
  HEAvY_RAIN = "heavy_rain",
  DRIZZLE = "drizzle",
  HUMID = "humid",
  WINDY = "windy",
  FOG = "fog",
  DEW = "dew",
  HAZE = "haze",
  CLEAR = "clear"
}

export enum DayNight {
  DAY = "day",
  DAY_NIGHT = "day_night",
  NIGHT = "night"
}

export enum BallType {
  RED = "red",
  WHITE = "white",
  PINK = "pink",
  ORANGE = "orange",
  TENNIS = "tennis"
}

// OVERLAY

export enum OverlayType {
  SCOREBOARD = "scoreboard",
  MINI_SCOREBOARD = "mini_scoreboard",
  FULL_SCOREBOARD = "full_scoreboard",
  LOWER_THIRD = "lower_third",
  BATTING_CARD = "batting_card",
  BOWLING_CARD = "bowling_card",
  PARTNERSHIP = "partnership",
  FALL_OF_WICKETS = "fall_of_wickets",
  PLAYER_PROFILE = "player_profile",
  PLAYER_COMPARISON = "player_comparison",
  MANHATTAN = "manhattan",
  WORM = "worm",
  WAGON_WHEEL = "wagon_wheel",
  PITCH_MAP = "pitch_map",
  FIELD_PLACEMENT = "field_placement",
  POINTS_TABLE = "points_table",
  HEAD_TO_HEAD = "head_to_head",
  TOSS_RESULT = "toss_result",
  TEAM_LINEUP = "team_lineup",
  MATCH_INFO = "match_info",
  SUPER_OVER_SCOREBOARD = "super_over_scoreboard",
  DLS_PAR_SCORE = "dls_par_score",
  MILESTONES = "milestones",
  POWERPLAY_STATUS = "powerplay_status",
  REQUIRED_RATE = "required_rate",
  PROJECTED_SCORE = "projected_score",
  TARGET_BREAKDOWN = "target_breakdown",
  LAST_WICKET = "last_wicket",
  MATCH_RESULT = "match_result",
  MAN_OF_THE_MATCH = "man_of_the_match",
  BEST_PERFORMER = "best_performer",
  SPONSORS = "sponsors",
  CUSTOM_GRAPHIC = "custom_graphic"
}

export enum OverlayTheme {
  CLASSIC = "classic",
  MODERN = "modern",
  MINIMAL = "minimal",
  BROADCAST = "broadcast",
  IPL_STYPE = "ipl_style",
  WORLD_CUP = "world_cup",
  TEST_MATCH = "test_match",
  RETRO = "retro",
  DARK = "dark",
  LIGHT = "light",
  CUSTOM = "custom"
}

export enum OverlayPosition {
  TOP_LEFT = "top_left",
  TOP_CENTER = "top_center",
  TOP_RIGHT = "top_right",
  MIDDLE_LEFT = "middle_left",
  MIDDLE_CENTER = "middle_center",
  MIDDLE_RIGHT = "middle_right",
  BOTTOM_LEFT = "bottom_left",
  BOTTOM_CENTER = "bottom_center",
  BOTTOM_RIGHT = "bottom_right",
  FULL_SCREEN = "full_screen",
  CUSTOM = "custom"
}

// APPEAL / PENALTIES

export enum PenaltyType {
  SLOW_OVER_RATE = "slow_over_rate",
  BALL_TAMPERING = "ball_tempering",
  CODE_OF_CONDUCT = "code_of_conduct",
  DANGEROUS_BOWLING = "dangerous_bowling",
  FAKE_FIELDING = "fake_fielding",
  TIME_WASTING = "time_wasting",
  ILLEGAL_FIELDING = "illegal_fielding",
  PENALTY_RUNS_BATTING = "penalty_runs_batting",
  PENALTY_RUNS_BOWLING = "penalty_runs_bowling"
}

export enum AppealDecision {
  NOT_OUT = "not_out",
  OUT = "out",
  REFERRED_TO_TV = "referred_to_tv",
  NOT_APPEALED = "not_appealed"
}

// MATCH RESULT

export enum MatchResultType {
  WIN_BY_RUNS = "win_by_runs",
  WIN_BY_WICKETS = "win_by_wickets",
  WIN_BY_INNINGS = "win_by_innigs",
  WIN_BY_SUPER_OVER = "win_by_super_over",
  WIN_BY_BOUNDARY_COUNT = "win_by_boundary_count",
  WIN_BY_FEWER_WICKET_LOST = "win_by_fewer_wicket_lost",
  WIN_BY_BOWL_OUT = "win_by_bowl_out",
  WIN_BY_DLS = "win_by_dls",
  WIN_BY_DEFAULT = "win_by_default",
  WIN_BY_FORFEIT = "win_by_forfiet",
  TIE = "tie",
  DRAW = "draw",
  NO_RESULT = "no_result",
  ABANDONED = "abandoned"
}