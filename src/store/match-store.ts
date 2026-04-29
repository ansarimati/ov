import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./auth-store";

interface MatchState {
  matches: any[];
  currentMatch: any | null;
  isLoading: boolean;
  pagination: { total: number; page: number; limit: number, totalPages: number };

  fetchMatches: (params?: Record<string, string>) => Promise<void>;
  fetchMatch: (id: string) => Promise<void>;
  createMatch: (data: any) => Promise<void>;
  updateMatch: (id: string, data: any) => Promise<void>;
  deleteMatch: (id: string) => Promise<void>;
  setCurrentMatch: (match: any) => void;
};

const getHeaders = () => ({
  Authorization: `Bearer ${useAuthStore.getState().accessToken}`
});

export const useMatchScore = create<MatchState>((set) => ({
  matches: [],
  currentMatch: null,
  isLoading: false,
  pagination: { total: 0, page: 1, limit: 20, totalPages: 0},

  fetchMatches: async (params) => {
    set({ isLoading: true });
    try {
      const queryString = params ? "?" + new URLSearchParams(params).toString() : "";
      const res = await axios.get(`/api/matches${queryString}`, {
        headers: getHeaders(),
      });
      set({
        matches: res.data.data,
        pagination: res.data.pagination,
        isLoading: false
      });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchMatch: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/api/matches/${id}`, {
        headers: getHeaders(),
      });
      set({
        currentMatch: res.data.data, isLoading: false
      })
    } catch {
      set({ isLoading: false });
    }
  },

  createMatch: async (data) => {
    const res = await axios.post("/api/matches", data, {
      headers: getHeaders()
    });
    set((state) => ({ matches: [res.data.data, ...state.matches] }));
    return res.data.data
  },

  updateMatch: async (id, data) => {
    const res = await axios.put(`/api/matches/${id}`, data, {
      headers: getHeaders(),
    });
    set((state) => ({ matches: state.matches.map((m) => (m._id === id ? res.data.data : m)), currentMatch: res.data.data }))
  },

  deleteMatch: async (id) => {
    await axios.delete(`/api/matches/${id}`, {
      headers: getHeaders(),
    });
    set((state) => ({
      matches: state.matches.filter((m) => m._id !== id)
    }));
  },

  setCurrentMatch: (match) => set({ currentMatch: match }),
}))