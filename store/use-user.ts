import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "@/lib/utils";
import { User } from "@/types/interface";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  userLoading: boolean;
  setUserLoading: (loading: boolean) => void;
  getLocalUser: () => Promise<void>;
  setLocalUser: (user: User | null) => Promise<void>;
  clearLocalUser: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),

  userLoading: false,

  setUserLoading: (loading) => set({ userLoading: loading }),

  getLocalUser: async () => {
    try {
      set({ userLoading: true });
      const userJSON = await AsyncStorage.getItem("user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      set({ user: userData });
    } catch (error) {
      showToast("Error getting local user");
    } finally {
      set({ userLoading: false });
    }
  },

  setLocalUser: async (user: User | null) => {
    try {
      set({ userLoading: true });
      await AsyncStorage.setItem("user", JSON.stringify(user));
      set({ user });
    } catch (error) {
      showToast("Error setting local user");
    } finally {
      set({ userLoading: false });
    }
  },

  clearLocalUser: async () => {
    try {
      set({ userLoading: true });
      await AsyncStorage.removeItem("user");
      set({ user: null });
    } catch (error) {
      showToast("Error clearing local user");
    } finally {
      set({ userLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      // Check if user data exists in memory
      if (get().user) {
        return true;
      }

      // If not in memory, try to get from AsyncStorage
      const userJSON = await AsyncStorage.getItem("user");
      const userData = userJSON ? JSON.parse(userJSON) : null;

      // Update the store with user data if found
      if (userData) {
        set({ user: userData });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Authentication check failed:", error);
      return false;
    }
  },
}));
