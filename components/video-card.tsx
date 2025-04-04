import { capitalizeFirstLetter } from "@/lib/utils";
import { VideoData } from "@/types/interface";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const VideoCard = ({ item }: { item: VideoData }) => {
  return (
    <TouchableOpacity
      className={`m-2 flex-1 rounded-xl overflow-hidden relative border border-white/10 ${
        item.category === "animation" ? "bg-darkOrange" : "bg-darkBlue"
      }`}
      onPress={() => {
        router.push({
          pathname: "/video-detail",
          params: { videoData: JSON.stringify(item) },
        });
      }}
    >
      <Image
        source={{ uri: item.image_url }}
        resizeMode="cover"
        className="rounded-xl border border-white/10 flex-1 w-full min-h-[100px] sm:h-[200px]"
      />

      <View className="p-2 flex-row items-center justify-between">
        <View className="gap-1">
          <Text numberOfLines={1} className="text-white font-medium text-sm">
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            className={`font-medium text-xs ${
              item.category === "animation" ? "text-secondary" : "text-primary"
            }`}
          >
            {capitalizeFirstLetter(item.sub_category)}
          </Text>
        </View>

        <Feather
          name="play-circle"
          size={24}
          color={item.category === "animation" ? "#EB8535" : "#0081C9"}
        />
      </View>

      <Text numberOfLines={1} className="text-white text-xs p-2 pt-0">
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

export default VideoCard;
