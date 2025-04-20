import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useState } from "react";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useUserStore } from "@/store/use-user";

const GoogleHeaderProfile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { clearLocalUser, user } = useUserStore();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await clearLocalUser();
      setShowDropdown(false);

      router.replace("/(auth)");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View className="px-4">
      <TouchableOpacity onPress={toggleDropdown}>
        <View className="flex-row items-center">
          {user?.photoURL ? (
            <Image
              source={{ uri: user?.photoURL }} // Replace with actual user photo URL
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <View className="w-8 h-8 rounded-full bg-gray-800 items-center justify-center">
              <AntDesign name="user" size={14} color="white" />
            </View>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View className="flex-1">
            <TouchableWithoutFeedback>
              <View className="absolute right-4 top-14 bg-gray-950 shadow-md rounded-lg w-fit px-2 z-10 border border-white/10">
                <TouchableOpacity
                  className="px-2 py-3 border-b border-white/10 flex-row items-center gap-2"
                  onPress={() => {
                    router.push("/profile");
                    setShowDropdown(false);
                  }}
                >
                  <Feather name="user" size={14} color="white" />
                  <Text className="text-sm text-white">My Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="px-2 py-3 flex-row items-center gap-2"
                  onPress={handleSignOut}
                >
                  <FontAwesome6 name="power-off" size={14} color="white" />
                  <Text className="text-sm text-white">Sign out</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default GoogleHeaderProfile;
