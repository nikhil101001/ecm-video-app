import { VideoData } from "@/types/interface";
import { create } from "zustand";

// Define the store interface
interface VideosStore {
  videos: VideoData[];
  setVideos: (videos: VideoData[]) => void;
}

export const useVideosStore = create<VideosStore>((set) => ({
  videos: [],
  setVideos: (videos) => set({ videos }),
}));
