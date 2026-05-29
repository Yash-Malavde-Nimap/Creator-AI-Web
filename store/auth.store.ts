import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/constants/config";
import { AuthTokens, User } from "@/types/auth.types";

interface AuthStore {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,

        setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),

        setTokens: (tokens) => set({ tokens }),

        setLoading: (isLoading) => set({ isLoading }),

        login: (user, tokens) =>
          set({
            user,
            tokens,
            isAuthenticated: true,
            isLoading: false,
          }),

        logout: () =>
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
          }),

        updateUser: (updates) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
          })),
      }),
      {
        name: STORAGE_KEYS.USER,
        partialize: (state) => ({ user: state.user, tokens: state.tokens }),
      },
    ),
    { name: "AuthStore" },
  ),
);
