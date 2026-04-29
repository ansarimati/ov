"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useScoringStore } from "@/store/scoring-store";
import { toast } from "sonner";
import {
  Undo2,
  ArrowRightLeft,
  SkipForward,
  StopCircle,
  Radio,
  Wifi,
  WifiOff,
} from "lucide-react";

export default function ScorerPanel() {
  const { matchId } = useParams();
  const { accessToken } = useAuthStore();
  const {
    connect,
    disconnect,
    sendBall,
    undoLastBall,
    endOver,
    endInnings,
    swapBatsman,
    isConnected,
    liveData,
    ballLog,
    isUndoAvailable,
  } = useScoringStore();

  useEffect(() => {
    if (accessToken && matchId) {
      connect(matchId as string, accessToken);
    }
    return () => disconnect();
  }, [accessToken, matchId]);

  const handleRun = (runs: number) => {
    sendBall({ runs, isWicket: false, isExtra: false });
  };

  const handleExtra = (type: string, runs: number = 1) => {
    sendBall({ runs, isExtra: true, extraType: type, extraRuns: runs });
  };

  const handleWicket = (dismissalType: string) => {
    sendBall({ runs: 0, isWicket: true, dismissalType });
  };

  const currentInnings = liveData?.innings?.[liveData?.currentInnings];
  const score = currentInnings?.totalRuns ?? 0;
  const wickets = currentInnings?.totalWickets ?? 0;
  const overs = currentInnings?.oversCompleted ?? 0;
  const balls = currentInnings?.ballsInCurrentOver ?? 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Radio className="h-5 w-5 text-red-400 animate-pulse" />
          Live Scoring
        </h1>
        <div
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full ${
            isConnected
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isConnected ? (
            <Wifi className="h-3 w-3" />
          ) : (
            <WifiOff className="h-3 w-3" />
          )}
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </div>

      {/* Current Score Display */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center">
        <p className="text-sm text-zinc-400 mb-1">
          {liveData?.teamA?.team?.shortName || "A"} vs{" "}
          {liveData?.teamB?.team?.shortName || "B"}
        </p>
        <div className="text-5xl font-black text-white">
          {score}
          <span className="text-zinc-500">/</span>
          {wickets}
        </div>
        <p className="text-lg text-zinc-400 mt-1">
          Overs: {overs}.{balls}
        </p>
      </div>

      {/* Run Buttons */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-zinc-400 mb-3">Runs</h3>
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => (
            <button
              key={r}
              onClick={() => handleRun(r)}
              disabled={!isConnected}
              className={`h-14 rounded-xl text-xl font-bold transition disabled:opacity-30 ${
                r === 4
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : r === 6
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : r === 0
                  ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white"
              }`}
            >
              {r === 0 ? "•" : r}
            </button>
          ))}
        </div>
      </div>

      {/* Extras */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-zinc-400 mb-3">Extras</h3>
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: "Wide", type: "wide" },
            { label: "No Ball", type: "no_ball" },
            { label: "Bye", type: "bye" },
            { label: "Leg Bye", type: "leg_bye" },
            { label: "Penalty", type: "penalty", runs: 5 },
          ].map((extra) => (
            <button
              key={extra.type}
              onClick={() => handleExtra(extra.type, extra.runs || 1)}
              disabled={!isConnected}
              className="h-12 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 rounded-xl text-xs font-semibold transition disabled:opacity-30"
            >
              {extra.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wicket */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-zinc-400 mb-3">Wicket</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            "bowled",
            "caught",
            "lbw",
            "run_out",
            "stumped",
            "hit_wicket",
            "caught_behind",
            "caught_and_bowled",
            "retired_hurt",
          ].map((type) => (
            <button
              key={type}
              onClick={() => handleWicket(type)}
              disabled={!isConnected}
              className="h-11 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl text-xs font-semibold capitalize transition disabled:opacity-30"
            >
              {type.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={undoLastBall}
          disabled={!isConnected || !isUndoAvailable}
          className="flex items-center justify-center gap-2 h-12 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition disabled:opacity-30"
        >
          <Undo2 className="h-4 w-4" />
          Undo
        </button>
        <button
          onClick={swapBatsman}
          disabled={!isConnected}
          className="flex items-center justify-center gap-2 h-12 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition disabled:opacity-30"
        >
          <ArrowRightLeft className="h-4 w-4" />
          Swap
        </button>
        <button
          onClick={endOver}
          disabled={!isConnected}
          className="flex items-center justify-center gap-2 h-12 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition disabled:opacity-30"
        >
          <SkipForward className="h-4 w-4" />
          End Over
        </button>
        <button
          onClick={endInnings}
          disabled={!isConnected}
          className="flex items-center justify-center gap-2 h-12 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl text-xs font-semibold transition disabled:opacity-30"
        >
          <StopCircle className="h-4 w-4" />
          End Innings
        </button>
      </div>

      {/* Ball Log */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-zinc-400 mb-3">
          This Over
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {ballLog
            .filter(
              (b) =>
                b.overNumber === overs
            )
            .map((ball, i) => (
              <div
                key={i}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  ball.isWicket
                    ? "bg-red-600 text-white"
                    : ball.isExtra
                    ? "bg-amber-600 text-white"
                    : ball.runs === 4
                    ? "bg-blue-600 text-white"
                    : ball.runs === 6
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {ball.isWicket ? "W" : ball.isExtra ? ball.extraType?.[0]?.toUpperCase() : ball.runs === 0 ? "•" : ball.runs}
              </div>
            ))}
          {ballLog.filter((b) => b.overNumber === overs).length === 0 && (
            <p className="text-zinc-500 text-sm">No balls bowled yet</p>
          )}
        </div>
      </div>
    </div>
  );
}