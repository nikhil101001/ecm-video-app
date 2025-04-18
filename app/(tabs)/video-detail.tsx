import VideoPlayer from "@/components/video-player";
import { featuredVideoData } from "@/data/data";
import { capitalizeFirstLetter } from "@/lib/utils";
import { VideoData } from "@/types/interface";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const VideoDetail = () => {
  const params = useLocalSearchParams();
  const videoData: VideoData = useMemo(
    () => JSON.parse(params.videoData as string),
    [params.videoData]
  );

  const [relatedVideos, setRelatedVideos] = useState<VideoData[]>([]);
  const [expandDescription, setExpandDescription] = useState(false);

  // Get related videos based on category
  useEffect(() => {
    const related = featuredVideoData.filter(
      (video) =>
        video.id !== videoData.id &&
        (video.category === videoData.category ||
          video.sub_category === videoData.sub_category)
    );

    setRelatedVideos(related);
  }, [videoData]);

  return (
    <View className="flex-1 h-full relative bg-dark">
      {/* Video Player */}

      <VideoPlayer
        videoUrl={videoData.video_url}
        imageUrl={videoData.image_url}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={relatedVideos.length > 0 ? [1] : []} // <-- index 1, not 4
      >
        <View className="flex-1 px-4 pt-6 space-y-4">
          {/* Title */}
          <View className="flex flex-row items-center justify-between">
            <View className="flex-1 gap-2">
              <Text className="text-xl font-bold text-white">
                {videoData.title}
              </Text>
              {/* Categories */}
              <Text className="text-xs text-white/50">
                {capitalizeFirstLetter(videoData.sub_category)}
              </Text>
            </View>
            <Text
              className={`text-sm font-semibold text-white rounded-full bg-primary px-2 py-1 ${
                videoData.category === "animation" && "bg-secondary"
              }`}
            >
              {capitalizeFirstLetter(videoData.category)}
            </Text>
          </View>

          {/* Description */}
          <View className="mt-2">
            <Text className="text-sm font-semibold text-white mb-2">
              Description
            </Text>
            <View className="bg-darkBlue p-4 rounded-xl">
              <Text className="text-gray-300 text-sm break-all" selectable>
                {videoData.description.length > 100 && !expandDescription
                  ? `${videoData.description.slice(0, 100)}...`
                  : videoData.description}
              </Text>
              {videoData.description.length > 100 && (
                <TouchableOpacity
                  onPress={() => setExpandDescription(!expandDescription)}
                  className="mt-2"
                >
                  <Text className="text-primary text-xs">
                    {expandDescription ? "Show less" : "Show more"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Related Videos Header (sticky) */}
        {relatedVideos.length > 0 && (
          <View className="bg-dark px-4 py-3">
            <Text className="text-white font-semibold text-lg">
              Related Videos
            </Text>
          </View>
        )}

        {/* Related Videos List */}
        {relatedVideos.length > 0 ? (
          <View className="px-4">
            {relatedVideos.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="mr-3 mb-4 flex-1 w-full"
                onPress={() => {
                  router.push({
                    pathname: "/video-detail",
                    params: { videoData: JSON.stringify(item) },
                  });
                }}
              >
                <View
                  className={`${
                    item?.category === "animation"
                      ? "bg-darkOrange"
                      : "bg-darkBlue"
                  } w-full h-full rounded-xl overflow-hidden`}
                >
                  <Image
                    source={{ uri: item.image_url }}
                    className="w-full"
                    resizeMode="cover"
                    height={Dimensions.get("window").width / 2}
                  />
                  <View className="px-4 py-3 flex-row items-center justify-between">
                    <View>
                      <Text
                        numberOfLines={2}
                        className="text-white text-sm font-medium"
                      >
                        {item.title}
                      </Text>

                      {item.created_at && (
                        <Text className="text-gray-400 text-xs mt-1">
                          {new Date(item.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </Text>
                      )}
                    </View>

                    <Feather
                      name="play-circle"
                      size={24}
                      color={
                        item.category === "animation" ? "#EB8535" : "#0081C9"
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="py-4 items-center px-4">
            <Text className="text-gray-400">No related videos found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default VideoDetail;
