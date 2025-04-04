import { View, Text } from "react-native";
import React from "react";
import VideoList from "@/components/video-list";
import { featuredVideoData } from "@/data/data";

const AllPinVideoList = () => {
  return (
    <View className="min-h-screen bg-dark p-2">
      <Text className="text-white px-2 pb-2">Must Watch</Text>

      <VideoList
        videoData={featuredVideoData.filter((item) => item.is_pinned)}
      />
    </View>
  );
};

export default AllPinVideoList;
