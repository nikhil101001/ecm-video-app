import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { fetchUsersByEmail, updateUser } from "@/lib/actions/user-action";
import { useUserStore } from "@/store/use-user";
import { showToast } from "@/lib/utils";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { user, setUser, clearLocalUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleUpdatePhone = async () => {
    if (!phoneNumber.trim()) {
      showToast("Phone number cannot be empty");
      return;
    }

    // Add validation for 10-digit phone number
    if (!/^\d{10}$/.test(phoneNumber.trim())) {
      showToast("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      const res = await updateUser({
        _id: user?._id,
        name: user?.name || "",
        phone: phoneNumber,
        email: user?.email || "",
      });

      if (res.error) {
        showToast(res.error);
      } else {
        setUser({
          ...user,
          name: user?.name || "",
          email: user?.email || "",
          phone: phoneNumber,
        });
        showToast("Phone number updated successfully");
      }

      showToast("Phone number updated successfully");
    } catch (error) {
      console.error("Error updating phone:", error);
      showToast("Could not update phone number. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await clearLocalUser();

      router.replace("/(auth)");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await fetchUsersByEmail(user?.email || "");

      if (res.error) {
        showToast(res.error);
      } else {
        setUser(res);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      showToast("Could not fetch user info. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.phone) {
      setPhoneNumber(user.phone);
    }
  }, [user?.phone]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-dark">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-dark"
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getUserInfo} />
      }
    >
      <View className="px-5 py-8">
        {/* Profile Header */}
        <View className="flex-row items-center mb-8">
          <View className="mr-4">
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                className="w-20 h-20 rounded-full"
                style={{ borderWidth: 3, borderColor: "#3b82f6" }}
              />
            ) : (
              <View className="w-20 h-20 rounded-full bg-secondary items-center justify-center">
                <Text className="text-white text-xl font-bold">
                  {user?.name?.charAt(0) || "U"}
                </Text>
              </View>
            )}
          </View>
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">{user?.name}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="mail-outline" size={14} color="#9ca3af" />
              <Text className="text-gray-400 ml-1 text-sm">{user?.email}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="time-outline" size={14} color="#9ca3af" />
              <Text className="text-gray-400 ml-1 text-sm">
                Joined -{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not available"}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View className="mb-6">
          <View className="flex-row items-center mb-4">
            <Ionicons name="person-outline" size={20} color="#3b82f6" />
            <Text className="text-white text-lg font-semibold ml-2">
              Account Information
            </Text>
          </View>

          <View className="bg-gray-900 rounded-xl p-5 shadow-md">
            <View className="mb-4 border-b border-gray-800 pb-3">
              <Text className="text-gray-400 text-xs mb-1">EMAIL ADDRESS</Text>
              <Text className="text-white">{user?.email}</Text>
            </View>

            <View>
              <Text className="text-gray-400 text-xs mb-1">
                ACCOUNT CREATED
              </Text>
              <Text className="text-white text-sm">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not available"}
              </Text>
            </View>
          </View>
        </View>

        {/* Update Phone Section */}
        <View className="mb-6">
          <View className="flex-row items-center mb-4">
            <Ionicons name="call-outline" size={20} color="#3b82f6" />
            <Text className="text-white text-lg font-semibold ml-2">
              Update Phone Number
            </Text>
          </View>

          <View className="bg-gray-900 rounded-xl p-5 shadow-md">
            <TextInput
              className="bg-gray-800 text-white p-4 rounded-xl mb-4"
              placeholder="Enter phone number"
              placeholderTextColor="#9ca3af"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              style={{ fontSize: 16 }}
            />
            <TouchableOpacity
              className="bg-primary p-4 rounded-xl items-center disabled:bg-gray-600"
              onPress={handleUpdatePhone}
              disabled={loading || phoneNumber === user?.phone}
              style={{ elevation: 4 }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-white font-bold">
                  Update Phone Number
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-transparent border border-red-500 p-4 rounded-xl items-center mt-4 disabled:bg-gray-600"
          onPress={handleLogout}
          disabled={loading}
        >
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2">Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
