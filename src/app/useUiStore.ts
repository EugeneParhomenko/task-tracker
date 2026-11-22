import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UiState = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist<UiState>(
    (set) => ({
      isSidebarOpen: false,
      setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
    }),
    { name: 'ui' },
  ),
);
