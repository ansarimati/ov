import { Match } from "@/models/Match";
import * as E from "@/types/enums";

export interface ScoreInput {
  batsmanRuns: number;
  extras?: number;
  extrasType?: E.ExtrasType;
  isWicket?: boolean;
  dismissalType?: E.DismissalType;
  dismissedPlayer?: string;
  fielder?: string;
  fielderPosition?: E.FieldPosition;
  secondFielder?: string;
  runOutEnd?: E.RunOutEnd;
  newBatsman?: string;
  newBatsmanDesignation?: E.PlayerDesignation;
  newBowler?: string;

  // Enhanced ball details
  shotType?: E.ShortType;
  wagonWheelRegion?: E.WagonWeelRegion;
  deliveryType?: E.DeliveryType;
  bowlingLength?: E.BowlingLength;
  bowlingLine?: E.BowlingLine;
  speed?: number;
  boundaryType?: E.BoundaryType;

  // Special situations
  isFreeHit?: boolean;
  isOverthorw?: boolean;
  overthrowRuns?: number;
  isShortRun?: boolean;
  wasAppealed?: boolean;
  appealDecision?: E.AppealDecision;

  // Commentary
  commentary?: string;

  // Runs breakdown
  runBreakdown?: {
    batsmanRunning: number;
    boundaryRuns: number;
    overthrow: number;
    penaltyRuns: number;
  };
}

// DELIVERY CLASSIFICATION

export function isLegalDelivery (extrasType?: E.ExtrasType): boolean {
  if (!extrasType) return true;
  return ![
    E.ExtrasType.WIDE,
    E.ExtrasType.NO_BALL,
    E.ExtrasType.NO_BALL_BYE,
    E.ExtrasType.NO_BALL_LEG_BYE,
    E.ExtrasType.WIDE_BYE
  ].includes(extrasType);
}

export function isNoBall (extrasType?: E.ExtrasType): boolean {
  return [E.ExtrasType.NO_BALL, E.ExtrasType.NO_BALL_BYE, E.ExtrasType.NO_BALL_LEG_BYE].includes(extrasType!);
}

export function isWide (extrasType?: E.ExtrasType): boolean {
  return [E.ExtrasType.WIDE, E.ExtrasType.WIDE_BYE].includes(extrasType!);
}

export function triggersFreeHit (extrasType?: E.ExtrasType): boolean {
  return isNoBall(extrasType);
}

// On free hit, only run out (and a few rare modes) are possible
export function isValidDismissalOnFreeHit (dismissalType?: E.DismissalType): boolean {
  if (!dismissalType) return true;
  return [
    E.DismissalType.RUN_OUT,
    E.DismissalType.OBSTRUCTING_FIELD,
    E.DismissalType.HIT_BALL_TWICE,
    E.DismissalType.HANDLED_THE_BALL
  ].includes(dismissalType);
}

// Wide ball - batsman can only be stumped or run out 
export function isValidDismissalOnWide (dismissalType?: E.DismissalType ): boolean {
  if (!dismissalType) return true;
  return [
    E.DismissalType.STUMPED,
    E.DismissalType.RUN_OUT,
    E.DismissalType.HIT_WICKET,
    E.DismissalType.OBSTRUCTING_FIELD,
  ].includes(dismissalType);
}

// RUN CALCULATIONS
export function calculateTotalRuns (input: ScoreInput): number {
  let total = input.batsmanRuns;

  if (input.extrasType) {
    // penalty runs for wide/no balls
    if (isWide(input.extrasType) || isNoBall(input.extrasType)) {
      total += 1;
    }

    // iAdditional runs from extras (byes, leg byes on no-ball/wide)
    if (input.extras) {
      total += input.extras;
    }
  }

  // over throw runs
  if (input.isOverthorw && input.overthrowRuns) {
    total += input.overthrowRuns;
  }

  // Short runs penalty
  if (input.isShortRun) {
    total -= 1;
  }

  return Math.max(0, total);
};

// Determine if batsmen should cross (change strike)

export  function shouldSwapStrike (input: ScoreInput, isEndOver: boolean): boolean {
  if (isEndOver) return true;
  
  // For wickets: depending on crossing while running
  if (input.isWicket) {
    if (
      input.dismissalType === E.DismissalType.CAUGHT ||
      input.dismissalType === E.DismissalType.CAUGHT_AND_BOWLED ||
      input.dismissalType === E.DismissalType.CAUGHT_BEHIND
    ) {
      return false;
    }

    if (input.dismissalType === E.DismissalType.RUN_OUT) {
      return input.batsmanRuns % 2 !== 0;
    }
  }

  let effectiveRuns = input.batsmanRuns;

  // Bye and leg byes: count the extras for crossing
  if (input.extrasType === E.ExtrasType.BYE || input.extrasType === E.ExtrasType.LEG_BYE) {
    effectiveRuns = input.extras || 0;
  }

  // Wide: runs scored by running (beyond the wide itself)
  if (isWide(input.extrasType)) {
    effectiveRuns += input.extras || 0;
  }

  // Overthrow runs added
  if (input.isOverthorw && input.overthrowRuns) {
    effectiveRuns += input.overthrowRuns;
  }

  return effectiveRuns % 2 !== 0;
}

//  OVER and INNINGS TRACKING

export function ballsToOvers (balls: number): number {
  const completedOvers = Math.floor(balls / 6);
  const remainingBalls = balls % 6;
  return parseFloat(`${completedOvers}.${remainingBalls}`);
};

export function oversToBalls (overs: number): number {
  const parts = overs.toString().split(".");
  const completedOvers = parseInt(parts[0]) || 0;
  const balls = parseInt(parts[1]) || 0;
  return completedOvers * 6 + balls;
}

export function isOverCompleted (legalBallsInOver: number): boolean {
  return legalBallsInOver >= 6;
}

export function isInningsCompleted (
  totalBalls: number,
  oversLimit: number,
  totalWickets: number,
  playersPerSide: number
): boolean {
  const maxBalls = oversLimit * 6;
  const maxWickets = playersPerSide - 1;
  return totalBalls >= maxBalls || totalWickets >= maxWickets;
}

//  RATE CALCULATIONS

export function calculateStrikeRates (runs: number, balls: number): number {
  if ( balls === 0 ) return 0;
  return parseFloat(((runs / balls) * 100 ).toFixed(2));
}

export function calculateEconomy (runs: number, balls: number): number {
  if (balls === 0) return 0;
  return parseFloat((runs / (balls / 6)).toFixed(2));
}

export function calculateBowlingAverage (runs: number, wickets: number): number {
  if (wickets === 0) return 0;
  return parseFloat((runs / wickets).toFixed(2)); 
}

export function calculateBowlingStrikeRate (balls: number, wickets: number): number {
  if (wickets === 0) return 0;
  return parseFloat((balls / wickets).toFixed(2)); 
}

export function calculateBattingAverage (runs: number, innings: number, notOuts: number): number {
  const dismissals = innings - notOuts;
  if (dismissals === 0) return runs > 0 ? Infinity : 0;
  return parseFloat((runs / dismissals).toFixed(2) );
}

export function calculateCurrentRunRate (runs: number, balls: number): number {
  if (balls === 0) return 0;
  return parseFloat((runs / (balls / 6)).toFixed(2));
}

export function calculateRequiredRunRate (target: number, currentScore: number, ballsRemaining: number): number {
  if (ballsRemaining <= 0) return 0;
  const runsNeeded = target - currentScore;
  return parseFloat((runsNeeded / (ballsRemaining / 6)).toFixed(2));
}

export function calculateProjectedScore (currentScore: number, ballsBowled: number, totalBalls: number): number {
  if (ballsBowled === 0) return 0;
  return Math.round((currentScore / ballsBowled) * totalBalls);
}

// NET RUN RATE

export function calculateNetRunRate (
  forRuns: number,
  forOvers: number,
  againstRuns: number,
  againstOvers: number,
): number {
  if (forOvers === 0 || againstOvers === 0) return 0;
  const forRat = forRuns / forOvers;
  const againstRate = againstRuns / againstOvers;
  return parseFloat((forRat - againstRate).toFixed(2));
}

// MAIDEN OVER

export function isMaidenOer (balls: { runs: number; isLegalDelivery: boolean; extrasType?: E.ExtrasType }[]): boolean {
  const legalBalls = balls.filter((b) => b.isLegalDelivery);
  if (legalBalls.length < 6) return false;
  return balls.every((b) => b.runs === 0);
}

// DOT BALL PERCENTAGE

export function calculateDotBallPercentage (dotBalls: number, totalBalls: number): number {
  if (totalBalls === 0) return 0;
  return parseFloat(((dotBalls / totalBalls) * 100).toFixed(1));
}

// BOUNDARY PERCENTAGE

export function calculateBoundaryPercentage (boundaryRuns: number, totalRuns: number): number {
  if (totalRuns === 0) return 0;
  return parseFloat(((boundaryRuns / totalRuns) * 100).toFixed(1));
}

// POWERPLAY DETECTION

export function getCurrentPhase (currentBall: number, powerplayConfig: { phase: { name: string; startOver: number; endOver: number }[] }): string {
  const currentOver = Math.floor(currentBall / 6);
  for (const phase of powerplayConfig.phase) {
    if (currentOver >= phase.startOver - 1 && currentOver < phase.endOver) {
      return phase.name;
    }
  }
  return "Middle Overs";
}

// ==================== DISMISSAL DESCRIPTION ====================

export function formatDismissal(
  dismissalType: E.DismissalType,
  batsmanName: string,
  bowlerName?: string,
  fielderName?: string,
  fielderPosition?: E.FieldPosition,
  secondFielderName?: string
): string {
  switch (dismissalType) {
    case E.DismissalType.BOWLED:
      return `b ${bowlerName}`;
    case E.DismissalType.CAUGHT:
      return `c ${fielderName} b ${bowlerName}`;
    case E.DismissalType.CAUGHT_BEHIND:
      return `c †${fielderName} b ${bowlerName}`;
    case E.DismissalType.CAUGHT_AND_BOWLED:
      return `c & b ${bowlerName}`;
    case E.DismissalType.LBW:
      return `lbw b ${bowlerName}`;
    case E.DismissalType.RUN_OUT:
      if (secondFielderName) return `run out (${fielderName}/${secondFielderName})`;
      return `run out (${fielderName || "direct"})`;
    case E.DismissalType.STUMPED:
      return `st †${fielderName} b ${bowlerName}`;
    case E.DismissalType.HIT_WICKET:
      return `hit wicket b ${bowlerName}`;
    case E.DismissalType.RETIRED_HURT:
      return "retired hurt";
    case E.DismissalType.RETIRED_OUT:
      return "retired out";
    case E.DismissalType.RETIRED_NOT_OUT:
      return "retired not out";
    case E.DismissalType.MANKADED:
      return `run out (Mankad) (${bowlerName})`;
    case E.DismissalType.OBSTRUCTING_FIELD:
      return "obstructing the field";
    case E.DismissalType.HIT_BALL_TWICE:
      return "hit the ball twice";
    case E.DismissalType.TIMED_OUT:
      return "timed out";
    case E.DismissalType.HANDLED_THE_BALL:
      return "handled the ball";
    case E.DismissalType.ABSENT_HURT:
      return "absent hurt";
    default:
      return `out b ${bowlerName || "unknown"}`;
  }
}

// ==================== MILESTONES DETECTION ====================

export function detectBatsmanMilestones(previousRuns: number, currentRuns: number): string[] {
  const milestones: string[] = [];
  const thresholds = [
    { value: 50, label: "FIFTY" },
    { value: 100, label: "CENTURY" },
    { value: 150, label: "150" },
    { value: 200, label: "DOUBLE CENTURY" },
    { value: 250, label: "250" },
    { value: 300, label: "TRIPLE CENTURY" },
  ];

  for (const t of thresholds) {
    if (previousRuns < t.value && currentRuns >= t.value) milestones.push(t.label);
  }
  return milestones;
}

export function detectBowlerMilestones(previousWickets: number, currentWickets: number): string[] {
  const milestones: string[] = [];
  if (previousWickets < 3 && currentWickets >= 3) milestones.push("3 WICKETS");
  if (previousWickets < 4 && currentWickets >= 4) milestones.push("4 WICKETS");
  if (previousWickets < 5 && currentWickets >= 5) milestones.push("5 WICKET HAUL");
  if (previousWickets < 7 && currentWickets >= 7) milestones.push("7 WICKETS");
  if (previousWickets < 10 && currentWickets >= 10) milestones.push("10 WICKETS");
  return milestones;
}

// ==================== HAT-TRICK DETECTION ====================

export function isHatTrick(lastThreeDeliveries: { isWicket: boolean; bowler: string }[]): boolean {
  if (lastThreeDeliveries.length < 3) return false;
  const last3 = lastThreeDeliveries.slice(-3);
  return (
    last3.every((d) => d.isWicket) &&
    last3[0].bowler === last3[1].bowler &&
    last3[1].bowler === last3[2].bowler
  );
}

// ==================== MATCH RESULT ====================

export function determineResult(
  team1: { id: string; name: string; shortName: string },
  team2: { id: string; name: string; shortName: string },
  innings1: { runs: number; wickets: number; balls: number; oversLimit: number },
  innings2: { runs: number; wickets: number; balls: number; oversLimit: number; playersPerSide: number },
  dlsApplied: boolean = false,
  dlsTarget?: number
): {
  type: E.MatchResultType;
  winner?: string;
  loser?: string;
  margin?: number;
  marginType?: "runs" | "wickets" | "innings_and_runs";
  description: string;
  team1Score: string;
  team2Score: string;
} {
  const effectiveTarget = dlsApplied && dlsTarget ? dlsTarget : innings1.runs + 1;

  const team1Score = `${innings1.runs}/${innings1.wickets} (${ballsToOvers(innings1.balls)})`;
  const team2Score = `${innings2.runs}/${innings2.wickets} (${ballsToOvers(innings2.balls)})`;

  if (innings2.runs >= effectiveTarget) {
    const wicketsRemaining = (innings2.playersPerSide - 1) - innings2.wickets;
    return {
      type: E.MatchResultType.WIN_BY_WICKETS,
      winner: team2.id,
      loser: team1.id,
      margin: wicketsRemaining,
      marginType: "wickets",
      description: `${team2.name} won by ${wicketsRemaining} wicket${wicketsRemaining !== 1 ? "s" : ""}${
        dlsApplied ? " (DLS)" : ""
      }`,
      team1Score,
      team2Score,
    };
  }

  if (innings1.runs > innings2.runs) {
    const runMargin = dlsApplied && dlsTarget ? effectiveTarget - 1 - innings2.runs : innings1.runs - innings2.runs;
    return {
      type: dlsApplied ? E.MatchResultType.WIN_BY_DLS : E.MatchResultType.WIN_BY_RUNS,
      winner: team1.id,
      loser: team2.id,
      margin: runMargin,
      marginType: "runs",
      description: `${team1.name} won by ${runMargin} run${runMargin !== 1 ? "s" : ""}${dlsApplied ? " (DLS)" : ""}`,
      team1Score,
      team2Score,
    };
  }

  return {
    type: E.MatchResultType.TIE,
    description: "Match tied",
    team1Score,
    team2Score,
  };
}

// ==================== COMMENTARY ENGINE ====================

export function generateCommentary(
  input: ScoreInput,
  batsmanName: string,
  bowlerName: string,
  fielderName?: string,
  totalScore?: number,
  totalWickets?: number,
  overs?: number
): string {
  // Wicket commentary
  if (input.isWicket) {
    const scoreInfo = totalScore !== undefined ? ` Score: ${totalScore}/${totalWickets || 0}` : "";

    switch (input.dismissalType) {
      case E.DismissalType.BOWLED:
        return `💥 BOWLED! ${bowlerName} castles ${batsmanName}! The stumps are shattered! What a delivery!${scoreInfo}`;
      case E.DismissalType.CAUGHT:
        return `🧤 CAUGHT! ${batsmanName} finds ${fielderName || "the fielder"} at ${
          input.fielderPosition?.replace(/_/g, " ") || "the boundary"
        } off ${bowlerName}!${scoreInfo}`;
      case E.DismissalType.CAUGHT_BEHIND:
        return `🧤 CAUGHT BEHIND! The keeper takes a brilliant catch to dismiss ${batsmanName} off ${bowlerName}!${scoreInfo}`;
      case E.DismissalType.CAUGHT_AND_BOWLED:
        return `🎯 CAUGHT & BOWLED! Brilliant reflexes from ${bowlerName}! ${batsmanName} has to walk back!${scoreInfo}`;
      case E.DismissalType.LBW:
        return `☝️ LBW! ${bowlerName} traps ${batsmanName} plumb in front! The umpire has no hesitation!${scoreInfo}`;
      case E.DismissalType.RUN_OUT: {
        const end = input.runOutEnd === E.RunOutEnd.STRIKER_END ? "striker's" : "non-striker's";
        return `🏃 RUN OUT! Direct hit at the ${end} end! ${fielderName || "Brilliant fielding"} sends ${batsmanName} packing!${scoreInfo}`;
      }
      case E.DismissalType.STUMPED:
        return `⚡ STUMPED! Lightning quick work from ${fielderName || "the keeper"}! ${batsmanName} was dancing down the track to ${bowlerName}!${scoreInfo}`;
      case E.DismissalType.HIT_WICKET:
        return `😱 HIT WICKET! Oh dear! ${batsmanName} has dislodged the bails while playing ${bowlerName}!${scoreInfo}`;
      case E.DismissalType.MANKADED:
        return `⚠️ MANKADED! ${bowlerName} whips the bails off at the non-striker's end! ${batsmanName} was backing up too far!${scoreInfo}`;
      default:
        return `OUT! ${batsmanName} is dismissed!${scoreInfo}`;
    }
  }

  // Boundary commentary
  if (input.batsmanRuns === 6) {
    const shots: Record<string, string> = {
      [E.ShortType.SLOG]: "slog over the boundary",
      [E.ShortType.LOFT]: "lofted straight down the ground",
      [E.ShortType.PULL]: "pulled majestically over square leg",
      [E.ShortType.SWEEP]: "swept for a maximum",
      [E.ShortType.SCOOP]: "audacious scoop over the keeper",
      [E.ShortType.HELICOPTER]: "helicopter shot! What a hit",
      [E.ShortType.SWITCH_HIT]: "switch hit for six! Incredible",
      [E.ShortType.REVERSE_SWEEP]: "reverse swept for six! Unbelievable",
    };
    const shotDesc = input.shotType ? shots[input.shotType] || "deposited into the stands" : "launched over the boundary";
    return `🚀 SIX! ${batsmanName} has ${shotDesc} off ${bowlerName}! Massive hit!`;
  }

  if (input.batsmanRuns === 4) {
    const shots: Record<string, string> = {
      [E.ShortType.DRIVE_COVER]: "cover driven to perfection",
      [E.ShortType.DRIVE_STRAIGHT]: "driven straight past the bowler",
      [E.ShortType.CUT]: "cut fiercely through point",
      [E.ShortType.PULL]: "pulled through mid-wicket",
      [E.ShortType.FLICK]: "flicked off the pads",
      [E.ShortType.SWEEP]: "swept fine",
      [E.ShortType.EDGE]: "edged and it races to the boundary",
      [E.ShortType.LATE_CUT]: "delicate late cut through the slips",
      [E.ShortType.UPPER_CUT]: "upper cut over the slips",
    };
    const shotDesc = input.shotType ? shots[input.shotType] || "finds the gap" : "finds the gap and the ball races away";
    return `4️⃣ FOUR! ${batsmanName} has ${shotDesc} off ${bowlerName}! Beautiful shot!`;
  }

  // Extras
  if (input.extrasType === E.ExtrasType.WIDE)
    return `↔️ Wide ball from ${bowlerName}. Strayed down the ${input.bowlingLine?.replace(/_/g, " ") || "leg side"}.`;
  if (isNoBall(input.extrasType))
    return `🚫 No ball! ${bowlerName} has overstepped. Free hit coming up!`;
  if (input.extrasType === E.ExtrasType.BYE)
    return `🔄 ${input.extras || 0} bye${(input.extras || 0) > 1 ? "s" : ""}. The ball goes past everything.`;
  if (input.extrasType === E.ExtrasType.LEG_BYE)
    return `🦵 ${input.extras || 0} leg bye${(input.extras || 0) > 1 ? "s" : ""}. Off the pads and away.`;

  // Regular runs
  if (input.batsmanRuns === 0) return `⭕ Dot ball. ${bowlerName} keeps it tight. ${batsmanName} defends solidly.`;
  if (input.batsmanRuns === 1) return `1️⃣ Single taken by ${batsmanName}. Good running between the wickets.`;
  if (input.batsmanRuns === 2) return `2️⃣ Two runs to ${batsmanName}. Quick running, good placement.`;
  if (input.batsmanRuns === 3) return `3️⃣ Three runs! Excellent running between the wickets by ${batsmanName}.`;
  if (input.batsmanRuns === 5) return `5️⃣ Five runs including an overthrow! Lucky for ${batsmanName}.`;

  return `${input.batsmanRuns} runs to ${batsmanName} off ${bowlerName}.`;
}

// ==================== VALIDATION ====================

export function validateScoreInput(input: ScoreInput, isOnFreeHit: boolean): { valid: boolean; error?: string } {
  if (input.batsmanRuns > 6 && !input.isOverthorw) {
    return { valid: false, error: "Maximum 6 runs off the bat" };
  }

  if (isOnFreeHit && input.isWicket && !isValidDismissalOnFreeHit(input.dismissalType)) {
    return {
      valid: false,
      error: `Cannot dismiss by ${input.dismissalType} on a free hit. Only run out is allowed.`,
    };
  }

  if (isWide(input.extrasType) && input.isWicket && !isValidDismissalOnWide(input.dismissalType)) {
    return { valid: false, error: `Cannot dismiss by ${input.dismissalType} on a wide ball.` };
  }

  if (isWide(input.extrasType) && input.batsmanRuns > 0) {
    return { valid: false, error: "Cannot score batsman runs on a wide" };
  }

  if (input.isWicket && !input.dismissalType) {
    return { valid: false, error: "Dismissal type is required for a wicket" };
  }

  if (
    input.isWicket &&
    [E.DismissalType.CAUGHT, E.DismissalType.CAUGHT_BEHIND, E.DismissalType.STUMPED].includes(input.dismissalType!) &&
    !input.fielder
  ) {
    return { valid: false, error: "Fielder is required for this dismissal type" };
  }

  return { valid: true };
}

// ==================== WIN PROBABILITY (SIMPLIFIED) ====================

export function calculateWinProbability(
  target: number,
  currentScore: number,
  wicketsLost: number,
  ballsRemaining: number,
  playersPerSide: number = 11
): { battingTeam: number; bowlingTeam: number } {
  const runsNeeded = target - currentScore;
  const wicketsInHand = (playersPerSide - 1) - wicketsLost;
  const ballsFactor = ballsRemaining / 120; // Normalize to T20
  const wicketsFactor = wicketsInHand / 10;
  const runsFactor = runsNeeded <= 0 ? 1 : Math.max(0, 1 - runsNeeded / (ballsRemaining * 2));

  let battingProb = (runsFactor * 0.5 + wicketsFactor * 0.3 + ballsFactor * 0.2) * 100;
  battingProb = Math.min(99, Math.max(1, battingProb));

  return {
    battingTeam: Math.round(battingProb),
    bowlingTeam: Math.round(100 - battingProb),
  };
}
