import { create } from "zustand";

interface ControlLodingStatus {
  isLoading: boolean;
  setIsLoading: (prev: boolean) => void;
  error: string | null;
  setError: (error: string) => void;
  isAuthLoading: boolean;
  setIsAuthLoading: (prev: boolean) => void;
}

export const useLoadingStore = create<ControlLodingStatus>((set) => ({
  isLoading: false,
  isAuthLoading: false,
  error: null,
  setIsLoading: (prev) => set({ isLoading: !prev }),
  setIsAuthLoading: (prev) => set({ isAuthLoading: !prev }),
  setError: (error: string) => set({ error: error }),
}));
