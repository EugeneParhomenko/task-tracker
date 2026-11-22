import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: { name: string } | null;

  login: (name: string) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,

      login: (name) => set({ user: { name } }),

      logout: () => set({ user: null }),
    }),
    { name: 'auth' },
  ),
);
