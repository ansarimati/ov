import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  subscription: any;
}

interface AuthStat {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  fetchMe: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthStat>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await axios.post("/api/login", { email, password });
          const { user, accessToken, refreshToken } = res.data.data;
          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.error || "login failed")
        };
      },

      register: async (email, password, name) => {
        set({ isLoading: true });
        try {
          const res = await axios.post("/api/register", { email, password, name });
          const { user, accessToken, refreshToken } = res.data.data;
          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.error || "Registration failed");
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return;
        try {
          const res = await axios.post("/api/auth/refresh", { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = res.data.data;
          set({
            accessToken,
            refreshToken: newRefreshToken,
          })
        } catch {
          get().logout();
        }
      },

      fetchMe: async () => {
        const { accessToken } = get();
        if (!accessToken) return;
        try {
          const res = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          set({ user: res.data.data, isAuthenticated: true });
        } catch {
          get().logout();
        }
      },

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },
    }),

    {
      name: "cricket-overlay-auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      })
    }
  )
)
