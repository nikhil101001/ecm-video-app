import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const GoogleHeaderProfile = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View className="px-4">
      <TouchableOpacity onPress={toggleDropdown}>
        <View className="flex-row items-center">
          <Text className="text-base font-medium text-white">Profile</Text>
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
                  onPress={() => {
                    // Handle Sign out action
                    setShowDropdown(false);
                  }}
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
