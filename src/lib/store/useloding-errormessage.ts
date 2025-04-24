import { create } from "zustand";

interface ControlLodingStatus {
  isLoading: boolean;
  setIsLoading: (prev: boolean) => void;
  error: string | null;
  setError: (error: string) => void;
}

export const useLoadingStore = create<ControlLodingStatus>((set) => ({
  isLoading: false,
  setIsLoading: (prev) => set({ isLoading: !prev }),
  error: null,
  setError: (error: string) =>
    set({
      error: error,
    }),
}));
