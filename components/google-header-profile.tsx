import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

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
              <View className="absolute right-4 top-14 bg-gray-950 shadow-md rounded-md w-fit px-2 z-10 border border-white/10">
                <TouchableOpacity
                  className="px-2 py-3 border-b border-white/10"
                  onPress={() => {
                    // Handle My Account action
                    setShowDropdown(false);
                  }}
                >
                  <Text className="text-sm text-white">My Account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="px-2 py-3"
                  onPress={() => {
                    // Handle Sign out action
                    setShowDropdown(false);
                  }}
                >
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
