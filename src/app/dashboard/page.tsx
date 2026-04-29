"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/auth-store";
import {
  Swords,
  Users,
  UserCheck,
  MapPin,
  Radio,
  TrendingUp,
  Activity
} from "lucide-react";

interface DashboardStats {
  totalMatches: number;
  liveMatches: number;
  totalTeams: number;
  totalPlayers: number;
  totalVenues: number;
  totalScorers: number;
  matchesThisMonth: number;
  recentMatches: any[];
  subscription: any;
};

export default function DashboardPage () {
  const { accessToken, user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const res = await axios.get("/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setStats(res.data.data);
      } catch (error:any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) fetchStat();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Activity className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    )
  };

  const statsCards = [
    {
      label: "Total Matches",
      value: stats?.totalMatches ?? 0,
      icon: Swords,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      label: "Live Now",
      value: stats?.liveMatches ?? 0,
      icon: Radio,
      color: "text-red-400",
      bg: "bg-red-500/10",
      pulse: true
    },
    {
      label: "Teams",
      value: stats?.totalTeams ?? 0,
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      label: "Players",
      value: stats?.totalPlayers ?? 0,
      icon: UserCheck,
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    },
    {
      label: "Venues",
      value: stats?.totalVenues ?? 0,
      icon: MapPin,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      label: "Matches This Mont",
      value: stats?.matchesThisMonth ?? 0,
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
  ];


  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, { user?.name?.split(" ")[0] }👋
        </h1>
        <p className="text-zinc-400 mt-1">
          Here&apos;s what&apos;s happening with your cricket overlay system.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {
          statsCards.map((card, i) => (
            <div key={i} className="bg-zinc-900 border border-white/5 rounded-xl p-4 hover:border-white/10 transition" >
              <div className="flex items-center justify-between mb-3">
                <div className={`${card.bg} p-2 ${card.color}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
                {
                  card.pulse && card.value > 0 && (
                    <span className="h-2 w-2 bg-red-500 rounded-full animate-spin" />
                  )
                }
              </div>
              <p className="text-2xl font-bold text-white">
                {card.value}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {card.label}
              </p>
            </div>
          ))
        }
      </div>

      {/* PLan Usage */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Plan Usage
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              label: "Matches This Month",
              current: stats?.matchesThisMonth ?? 0,
              max: stats?.subscription?.features?.maxMatchesPerMonth ?? 5
            },
            {
              label: "Teams",
              current: stats?.totalTeams ?? 0,
              max: stats?.subscription?.features?.maxTeams ?? 4,
            },
            {
              label: "Scorer",
              current: stats?.totalScorers ?? 0,
              max: stats?.subscription?.features?.maxScorers ?? 1,
            }
          ].map((item, i) => {
            const percentage = item.max === -1 ? 0 : Math.min((item.current / item.max) * 100, 100);
            const isNearLimit = percentage >= 80;

            return (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-zinc-400">
                    {item.label}
                  </span>
                  <span className="text-sm text-zinc-300">
                    {item.current} / {item.max === -1 ? "∞" : item.max}
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${ isNearLimit ? "bg-amber-500" : "bg-emerald-500" }`} style={{ width: `${item.max === -1 ? 10 : percentage}%` }} />
                </div>
              </div>
            )
          })};
        </div>
      </div>

      {/* Recent Matches */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Matches
        </h2>
        { stats?.recentMatches && stats?.recentMatches.length > 0 ? (
          <div className="space-y-3">
            {
              stats.recentMatches.map((match: any) => (
                <div key={match._id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium text-white">
                        { match.teamA?.team?.shortName || "TBA" }
                      </span>
                      <span className="text-zinc-500 mx-2">
                        vs
                      </span>
                      <span className="font-medium text-white">
                        { match.teamB?.team?.shortName || "TBA" }
                      </span>
                    </div>
                  </div>
                  <span  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    match.status === "live"
                      ? "bg-red-500/10 text-red-400"
                      : match.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-zinc-700 text-zinc-300"
                  }`}>
                    {match.status}
                  </span>
                </div>
              ))
            }
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">
            No matches yet. Create your first match to get started!
          </p>
        ) }
      </div>
    </div>
  )
}