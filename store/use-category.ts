import { create } from "zustand";

// Define the store interface
interface CategoryStore {
  activeCategory: string | null;
  setActiveCategory: (title: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  activeCategory: "all",
  setActiveCategory: (title: string) =>
    set({ activeCategory: title.toLowerCase() }),
}));
