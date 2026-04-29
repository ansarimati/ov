import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  };
  return config;
});

api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      await useAuthStore.getState().refreshAccessToken();
      const newToken = useAuthStore.getState().accessToken;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch  {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      return  Promise.reject(error);
    }
  }

  return Promise.reject(error);
});

export default api;