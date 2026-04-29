"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTeamStore } from "@/store/team-store";
import {
  Plus,
  Search,
  Users,
  Loader2,
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

export default function TeamsPage () {
  const { teams, isLoading, fetchTeams, deleteTeam } = useTeamStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);
  
  const filteredTeams = teams.filter((t) => t.name?.toLowerCase().includes(search.toLocaleLowerCase()) || t.shortName?.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id: string, name: string) => {
    if(!confirm(`Delete team "${name}"? This can not be undone.`)) return;
    try {
      await deleteTeam(id);
      toast.success("Team deleted");
    } catch {
      toast.error("Failed to delete team");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Teams
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your cricket teams and roasters
          </p>
        </div>
        <Link href={"/dashboard/teams/create"} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-lg text-sm transition">
          <Plus className="h-4 w-4" />
          New Team
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teams...."
          className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
        />
      </div>

      {/* Team Grid */}
      {
        isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="text-center py-20">
            <Users className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-zinc-300">No team yet</h3>
            <p className="text-zinc-500 text-sm mt-1">
              Create your first team to get started
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              filteredTeams.map((team) => (
                <div key={team._id} className="bg-zinc-900 border border-white/5 rounded-xl p-5 hover:border-white/10 transition group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                        style={{ backgroundColor: team.primaryColor || "#1a56db" }}>
                          { team?.shortName?.substring(0, 2) }
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {team.name}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          {team.shortName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <Link href={`/dashboard/team/${team._id}`} className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5" >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(team._id, team.name)}
                        className="p-1.5 text-zinc-400 hover:text-red-400 rounded-md hover:bg-red-500/5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-lg font-bold text-white">
                        {team.player?.length || 0}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Players
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">
                        {team.teamStats?.matchesPlayed || 0}
                      </p>
                      <p className="text-xs text-zinc-500">Matches</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-400">
                        {team.teamStats?.wins || 0}
                      </p>
                      <p className="text-xs text-zinc-500">Wins</p>
                    </div>
                  </div>

                  {
                    team.city && (
                      <p className="text-xs text-zinc-500 mt-3">
                        📍 {team.city}
                        {team.country ? `, ${team.country}` : ""}
                      </p>
                    )
                  }
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}