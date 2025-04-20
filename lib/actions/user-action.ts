import axios from "axios";
import { ApiUrl } from "../utils";
import { User } from "@/types/interface";

export const fetchUsersByEmail = async (email: string) => {
  try {
    const res = await axios.get(`${ApiUrl}/api/users?email=${email}`);
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching users by email:", error);

    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error || "Failed to fetch users",
      };
    }
    return { error: "Failed to fetch users" };
  }
};

export const addUser = async (user: User) => {
  try {
    const res = await axios.post(`${ApiUrl}/api/users`, user);
    return res.data;
  } catch (error: unknown) {
    console.error("Error adding user:", error);

    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error || "Failed to add user",
      };
    }
    return { error: "Failed to add user" };
  }
};

export const updateUser = async (user: User) => {
  try {
    const res = await axios.put(`${ApiUrl}/api/users`, user);
    return res.data;
  } catch (error: unknown) {
    console.error("Error updating user:", error);

    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error || "Failed to update user",
      };
    }
    return { error: "Failed to update user" };
  }
};
