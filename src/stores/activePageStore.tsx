import { Page } from "@/types/Page";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PagesState {
  page?: Page;
  setActivePage: (page: Page) => void;
}

export const useActivePagesStore = create<PagesState>()(
  persist(
    (set) => ({
      page: undefined,
      setActivePage: (page: Page) => set({ page }),
    }),
    {
      name: "active-page-storage",
    }
  )
);
