import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoriesTab from "@/components/categories-tab";
import FeaturedSection from "@/components/featured-section";
import PinSection from "@/components/pin-section";
import { useCategoryStore } from "@/store/use-category";
import { FlatList } from "react-native";
import VideoCard from "@/components/video-card";
import { useEffect, useState } from "react";
import { VideoData } from "@/types/interface";
import { fetchVideos } from "@/lib/actions/get-data";
import { showToast } from "@/lib/utils";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { useVideosStore } from "@/store/use-videos";

const HomeScreen = () => {
  const { activeCategory } = useCategoryStore();
  const { videos, setVideos } = useVideosStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pinnedVideos, setPinnedVideos] = useState<VideoData[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<VideoData[]>([]);

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
        setPinnedVideos(pinnedVideos);
        setFeaturedVideos(res.filter((video: VideoData) => video.is_featured));
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
    } else {
      // Initialize local state from existing store data
      setPinnedVideos(videos.filter((video) => video.is_pinned));
      setFeaturedVideos(videos.filter((video) => video.is_featured));
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
    <View className="flex-1 bg-dark">
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
          refreshControl={refreshControl}
          className="flex-1 bg-dark"
          data={filteredVideos}
          keyExtractor={(item, index) => item._id + index.toString()}
          renderItem={({ item }) => <VideoCard item={item} />}
          numColumns={2}
          ListHeaderComponent={() => (
            <View>
              <FeaturedSection item={featuredVideos} />
              <View className="px-4 py-2 gap-3">
                <PinSection item={pinnedVideos} />
                <CategoriesTab />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-white text-base">
                No videos available for this category
              </Text>
              <Text className="text-gray-400 text-sm mt-2">
                Please try selecting another category
              </Text>
            </View>
          )}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 8,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HomeScreen;
