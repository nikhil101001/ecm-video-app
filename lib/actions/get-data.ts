import axios from "axios";
import { ApiUrl } from "../utils";

export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${ApiUrl}/api/users`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error || "Failed to fetch users",
      };
    }
    return { error: "Failed to fetch users" };
  }
};

export const fetchVideos = async () => {
  try {
    const res = await axios.get(`${ApiUrl}/api/videos`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error || "Failed to fetch videos",
      };
    }
    return { error: "Failed to fetch videos" };
  }
};

export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${ApiUrl}/api/categories`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error || "Failed to fetch categories",
      };
    }
    return { error: "Failed to fetch categories" };
  }
};
