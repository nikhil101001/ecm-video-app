import FeaturedSection from "@/components/featured-section";
import { Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <View className="min-h-screen bg-dark">
      <FeaturedSection />
      <Text className="text-white">HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
