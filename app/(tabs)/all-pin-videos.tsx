import { View, Text, RefreshControl, FlatList } from "react-native";
import React from "react";

import { featuredVideoData } from "@/data/data";
import VideoCard from "@/components/video-card";

const AllPinVideoList = () => {
  const filteredVideos = featuredVideoData.filter((item) => item.is_pinned);

  const refreshControl = (
    <RefreshControl
      refreshing={false}
      onRefresh={() => {
        // Handle refresh logic here
      }}
      colors={["#0081C9", "#EB8535"]}
      progressBackgroundColor="#1E1E2F"
      tintColor="#0081C9"
    />
  );

  return (
    <View className="min-h-screen bg-dark p-2">
      <Text className="text-white px-2 pb-2">Must Watch</Text>

      <FlatList
        data={filteredVideos}
        refreshControl={refreshControl}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <VideoCard item={item} />}
        columnWrapperStyle={{ justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllPinVideoList;
