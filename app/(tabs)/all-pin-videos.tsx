import {
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import VideoCard from "@/components/video-card";
import { VideoData } from "@/types/interface";
import { fetchVideos } from "@/lib/actions/get-data";
import { showToast } from "@/lib/utils";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import CategoriesTab from "@/components/categories-tab";
import { useCategoryStore } from "@/store/use-category";
import { useVideosStore } from "@/store/use-videos";

const AllPinVideoList = () => {
  const { activeCategory, setActiveCategory } = useCategoryStore();
  const { videos, setVideos } = useVideosStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getVideos = async () => {
    setLoading(true);
    try {
      const res = await fetchVideos();

      if (res.error) {
        setError(true);
        showToast(res.error);
      } else {
        // show the pin videos first then the rest
        const pinnedVideos = res.filter((video: VideoData) => video.is_pinned);
        const unpinnedVideos = res.filter(
          (video: VideoData) => !video.is_pinned
        );

        setVideos([...pinnedVideos, ...unpinnedVideos]);
        setActiveCategory("all");
      }
    } catch (error) {
      setError(true);
      showToast("An error occurred while fetching videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videos.length < 1) {
      getVideos();
    }
  }, []);

  const filteredVideos =
    activeCategory === "all" || activeCategory === null
      ? videos
      : videos.filter(
          (video) => video.category.toLowerCase() === activeCategory
        );

  const refreshControl = (
    <RefreshControl
      refreshing={loading}
      onRefresh={getVideos}
      colors={["#0081C9", "#EB8535"]}
      progressBackgroundColor="#1E1E2F"
      tintColor="#0081C9"
    />
  );

  return (
    <View className="min-h-screen h-full bg-dark p-2">
      <Text className="text-white px-2 pb-2 font-bold">Must Watch</Text>

      {error && (
        <Animated.View
          entering={FadeInDown}
          className="mx-4 my-2 bg-[#2D1B1B] border border-[#4D2C2C] rounded-xl overflow-hidden"
        >
          <BlurView intensity={20} tint="dark" className="p-5">
            <View className="items-center">
              <Feather name="alert-circle" size={28} color="#E57373" />
              <Text className="text-white font-semibold mt-2 mb-1 text-center">
                Error fetching videos
              </Text>
              <Text className="text-[#BBBBBB] text-sm mb-4 text-center">
                Please try again or check your connection
              </Text>
              <TouchableOpacity
                className="bg-[#0081C9] py-2 px-6 rounded-full"
                onPress={() => {
                  setError(false);
                  getVideos();
                }}
              >
                <Text className="text-white font-medium">Try Again</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
      )}

      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0081C9" />
          <Text className="text-[#BBBBBB] mt-4">Loading videos...</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={filteredVideos}
          refreshControl={refreshControl}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          ListHeaderComponent={() => (
            <View className="pb-2 bg-dark">
              <CategoriesTab />
            </View>
          )}
          stickyHeaderIndices={[0]}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(index * 100).springify()}
              className="flex-1"
            >
              <VideoCard item={item} />
            </Animated.View>
          )}
          columnWrapperStyle={{ justifyContent: "center" }}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading && !error ? (
              <View className="flex-1 justify-center items-center pt-20">
                <Feather name="video-off" size={40} color="#666" />
                <Text className="text-[#BBBBBB] mt-4 text-center">
                  No videos available
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default AllPinVideoList;
