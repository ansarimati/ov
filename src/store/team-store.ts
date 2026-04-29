import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./auth-store";

interface TeamState {
  teams: any[];
  currentTeam: any | null;
  isLoading: boolean;

  fetchTeams: () => Promise<void>;
  fetchTeam: (id: string) => Promise<void>;
  createTeam: (data: any) => Promise<any>;
  updateTeam: (id: string, data: any) => Promise<void>;
  deleteTeam: (id: string) => Promise<void>;
};

const getHeaders = () => ({
  Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
});

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  currentTeam: null,
  isLoading: false,

  fetchTeams: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/api/teams`, {
        headers: getHeaders()
      });
      set({
        teams: res.data.data, isLoading: false
      });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchTeam: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/api/teams/${id}`, {
        headers: getHeaders(),
      });
      set({ currentTeam: res.data.data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  createTeam: async (data) => {
    const res = await axios.post("/api/teams", data, {
      headers: getHeaders()
    });
    set((state) => ({ teams: [res.data.data, ...state.teams] }));
    return res.data.data;
  },

  updateTeam: async (id, data) => {
    const res = await axios.put(`/api/teams/${id}`, data, {
      headers: getHeaders(),
    });
    set((state) => ({ teams: state.teams.map((t) => ( t._id === id ? res.data.data : t )), currentTeam: res.data.data }))
  },

  deleteTeam: async (id) => {
    await axios.delete(`/api/teams/${id}`, {
      headers: getHeaders(),
    });
    set((state) => ({ teams: state.teams.filter((t) => (t._id !== id)) }));
  }
}))