import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { capitalizeFirstLetter } from "@/lib/utils";
import { VideoData } from "@/types/interface";
import { router } from "expo-router";

// Get screen dimensions to calculate card size
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.5;
const CARD_HEIGHT = CARD_WIDTH * 0.6; // 60% of width

const PinCard = ({ item }: { item: VideoData }) => {
  return (
    <TouchableOpacity
      className={`mr-2 rounded-xl overflow-hidden flex-1 relative border border-white/10 ${
        item.category === "animation" ? "bg-darkOrange" : "bg-darkBlue"
      }`}
      style={{ width: CARD_WIDTH }}
      onPress={() => {
        router.push({
          pathname: "/video-detail",
          params: {
            videoData: JSON.stringify(item),
          },
        });
      }}
    >
      <Image
        source={{ uri: item.image_url }}
        resizeMode="cover"
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        className="rounded-xl border border-white/10"
      />

      <Text
        numberOfLines={1}
        className={`text-white text-xs absolute top-1 right-1 px-2 rounded-full m-1 ${
          item.category === "animation" ? "bg-secondary" : "bg-primary"
        }`}
      >
        {capitalizeFirstLetter(item.sub_category)}
      </Text>

      {/* Content at bottom */}
      <View className="p-2 flex-row items-center justify-between gap-2">
        <Text
          numberOfLines={1}
          className="text-white font-medium text-sm flex-1"
        >
          {item.title}
        </Text>
        <Feather
          name="play-circle"
          size={24}
          color={item.category === "animation" ? "#EB8535" : "#0081C9"}
        />
      </View>
    </TouchableOpacity>
  );
};

const PinSection: React.FC<{ item: VideoData[] }> = ({ item }) => {
  return (
    <View className="border border-white/10 rounded-xl bg-darkBlue/60 p-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white font-bold">Must Watch</Text>
        <TouchableOpacity
          className="bg-darkBlue/60 px-3 py-1 rounded-full border border-white/10"
          onPress={() => {
            router.push("/all-pin-videos");
          }}
        >
          <Text className="text-primary text-sm">View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={item}
        renderItem={({ item }) => <PinCard item={item} />}
        keyExtractor={(item) => item._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 12} // Card width + margin
        decelerationRate="fast"
      />
    </View>
  );
};

export default PinSection;
