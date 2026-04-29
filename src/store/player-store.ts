import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./auth-store";

interface PlayerState {
  players: any[];
  currentPlayer: any | null;
  isLoading: boolean;

  fetchPlayers: (params?: Record<string, string>) => Promise<void>;
  fetchPlayer: (id: string) => Promise<void>;
  createPlayer: (data: any) => Promise<any>;
  updatePlayer: (id: string, data: any) => Promise<void>;
  deletePlayer: (id: string) => Promise<void>; 
};

const getHeader = () => ({
  Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
});

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [],
  currentPlayer: null,
  isLoading: false,

  fetchPlayers: async (params) => {
    set({ isLoading: true });
    try {
      const queryString = params ? "?" + new URLSearchParams(params).toString() : "";
      const res = await axios.get(`/api/players${params}`, {
        headers: getHeader()
      });
      set({ players: res.data.data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchPlayer: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/api/players/${id}`, {
        headers: getHeader()
      });
      set({ currentPlayer: res.data.data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  createPlayer: async (data) => {
    const res = await axios.post(`/api/players`, data, {
      headers: getHeader()
    });
    set((state) => ({ players: [res.data.data, ...state.players] }));
    return res.data.data;
  },

  updatePlayer: async (id, data) => {
    const res = await axios.put(`/api/players/${id}`, data, {
      headers: getHeader()
    });
    set((state) => ({
      players: state.players.map((p) => (p._id == id ? res.data.data : p)),
      currentPlayer: res.data.data
    }));
  },

  deletePlayer: async (id) => {
    await axios.delete(`/api/players/${id}`, {
      headers: getHeader()
    });
    set((state) => ({
      players: state.players.filter((p) => (p._id !== id)),
    }))
  }
}))