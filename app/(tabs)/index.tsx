import { RefreshControl, Text, View } from "react-native";
import CategoriesTab from "@/components/categories-tab";
import FeaturedSection from "@/components/featured-section";
import PinSection from "@/components/pin-section";
import { featuredVideoData } from "@/data/data";
import { useCategoryStore } from "@/store/use-category";
import { FlatList } from "react-native";
import VideoCard from "@/components/video-card";

const HomeScreen = () => {
  const { activeCategory } = useCategoryStore();

  const filteredVideos =
    activeCategory === "all" || activeCategory === null
      ? featuredVideoData
      : featuredVideoData.filter(
          (video) => video.category.toLowerCase() === activeCategory
        );

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
    <FlatList
      refreshControl={refreshControl}
      className="flex-1 bg-dark"
      data={filteredVideos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <VideoCard item={item} />}
      numColumns={2}
      ListHeaderComponent={() => (
        <View>
          <FeaturedSection />
          <View className="px-4 py-2 gap-3">
            <PinSection />
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
  );
};

export default HomeScreen;
