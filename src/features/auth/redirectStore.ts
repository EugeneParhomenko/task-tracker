import { create } from "zustand";

type RedirectStore = {
  redirectTo: string | null;

  setRedirectTo: (redirectTo: string) => void;

  clearRedirectTo: () => void;
};

export const useRedirectStore = create<RedirectStore>()((set) => ({
  redirectTo: null,

  setRedirectTo: (redirectTo) => set({ redirectTo }),

  clearRedirectTo: () => set({ redirectTo: null }),
}));
