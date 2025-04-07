// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api";
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.postJSON<AuthResponse>(
            "/auth/login",
            credentials
          );

          if (!response.token || !response.user) {
            throw new Error("Invalid response from server");
          }

          // Set authorization header for subsequent requests
          api.setAuthToken(response.token);

          localStorage.setItem("token", response.token);
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.error || "Login failed",
            isLoading: false,
            user: null,
            token: null,
          });
          localStorage.removeItem("token");
          throw error;
        }
      },

      register: async (data) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.postJSON<AuthResponse>(
            "/auth/register",
            data
          );

          localStorage.setItem("token", response.token);
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.error || "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },

      fetchUser: async () => {
        try {
          set({ isLoading: true, error: null });
          const user = await api.get<User>("/auth/me");
          set({ user, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.error || "Failed to fetch user",
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);
