"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useMatchScore } from "@/store/match-store";
import {
  Plus,
  Search,
  Swords,
  Loader2,
  Radio,
  Filter
} from "lucide-react";

export default function MatchesPage () {
  const { matches, isLoading, fetchMatches, pagination } = useMatchScore();
  const [statusFilter, setStatusFilter] = useState("all");
  
  useEffect(() => {
    const params: Record<string, string> = {};
    if (statusFilter !== "all") params.status = statusFilter;
    fetchMatches(params);
  }, [statusFilter]);

  const statuses = ["all", "upcoming", "toss", "live", "innings_break", "completed", "abandoned"];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl items-center text-white">Matches</h1>
          <p className="text-zinc-400 text-sm mt-1">Create and manage cricket matches</p>
        </div>
        <Link href={"/dashboard/matches/create"} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-lg text-sm transition">
          <Plus className="h-4 w-4" />
          New Match
        </Link>
      </div>

      {/* Status filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {
          statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition ${
              statusFilter === s
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-zinc-900 text-zinc-400 border border-white/5 hover:text-white"
            }`}
            >
              { s === "all" ? "All Matches" : s.replace("_", " ") }
            </button>
          ))
        }
      </div>

      {/* Matches */}
      {
        isLoading ? (
          <div className="flex justify-between py-20">
            <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-20">
            <Swords className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-zinc-300">
              No matches found
            </h3>
            <p className="text-zinc-500 text-sm mt-1">
              Create a new match to start scoring
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {
              matches.map((match) => (
                <Link
                  key={match._id}
                  href={`/dashboard/matches/${match._id}`}
                  className="block bg-zinc-900 border border-white/5 rounded-xl p-5 hover:border-white/10 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Team A */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{
                          backgroundColor:
                          match.teamA?.team?.primaryColor || "#333",
                        }}>
                          {match.teamA?.team?.shortName?.subString(0,2)} || "A"
                        </div>
                        <span className="font-semibold text-white" >
                          { match.teamA?.team?.shortName || "Team A" }
                        </span>
                      </div>

                      <span className="text-zinc-500 text-sm font-medium">
                        VS
                      </span>

                      {/* Team B */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{
                          backgroundColor:
                          match.teamB?.team?.primaryColor || "#333",
                        }}>
                          {match.teamB?.team?.shortName?.subString(0,2) || "B"}
                        </div>
                        <span className="font-semibold text-white">
                          {match.team?.team?.shortName || "Team B"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-500 uppercase">
                          {match.matchFormat}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          match.status === "live"
                          ? "bg-red-500/10 text-red-400"
                          : match.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-zinc-800 text-zinc-300"
                          }`}
                        >
                          {match.status === "live" && (
                            <Radio className="h-3 w-3 inline mr-1 animate-pulse" />
                          )}
                          {match.status}
                        </span>
                    </div>
                  </div>

                  {
                    match.venue && (
                      <p className="text-xs text-zinc-500 mt-3">
                        { match.venue?.name }, {match.venue?.city}
                      </p>
                    )
                  }
                </Link>
              ))
            }
          </div>
        )
      }

      {/* Pagination */}
      {
        pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            {
              Array.from({ length: pagination.totalPages }, (_, i) => (
                <div key={i} onClick={() => fetchMatches({ page: String(i + 1) })} className={`h-8 w-8 rounded-lg text-xs font-medium transition ${
                  pagination.page === i + 1
                  ? "bg-emerald-500 text-black"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}>
                  {i + 1}
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}