import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  Share,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, router } from "expo-router";
import { AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { useState, useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { VideoData } from "@/types/interface";
import { capitalizeFirstLetter, isYouTubeUrl } from "@/lib/utils";
import VideoPlayer from "@/components/video-player";
import { featuredVideoData } from "@/data/data";
import { BlurView } from "expo-blur";

const VideoDetail = () => {
  const params = useLocalSearchParams();
  const videoData: VideoData = useMemo(
    () => JSON.parse(params.videoData as string),
    [params.videoData]
  );

  const [status, setStatus] = useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );
  const [isYouTubeVideo, setIsYouTubeVideo] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState<VideoData[]>([]);
  const [liked, setLiked] = useState(false);

  // Get related videos based on category
  useEffect(() => {
    const related = featuredVideoData
      .filter(
        (video) =>
          video.id !== videoData.id &&
          (video.category === videoData.category ||
            video.sub_category === videoData.sub_category)
      )
      .slice(0, 5);

    setRelatedVideos(related);
  }, [videoData]);

  // Check if video URL is from YouTube
  useEffect(() => {
    setIsYouTubeVideo(isYouTubeUrl(videoData.video_url));
  }, [videoData.video_url]);

  // Helper function to check if status is a success status object with isPlaying property
  const isPlayingStatus = (
    status: AVPlaybackStatus
  ): status is AVPlaybackStatusSuccess => {
    return status.isLoaded === true;
  };

  // Handle sharing video
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this video: ${videoData.title}\n${videoData.video_url}`,
        url: videoData.video_url,
        title: videoData.title,
      });
    } catch (error) {
      console.error("Error sharing video:", error);
    }
  };

  // For the call-to-action button text
  const getButtonText = () => {
    if (isYouTubeVideo) {
      return "Watch on YouTube";
    }
    return isPlayingStatus(status) && status.isPlaying
      ? "Pause Video"
      : "Play Video";
  };

  // Handle the bottom button press
  const handleMainAction = async () => {
    if (isYouTubeVideo) {
      // Open in YouTube app or browser
      try {
        const youtubeUrl = videoData.video_url;
        let youtubeAppUrl = youtubeUrl;

        if (youtubeUrl.includes("youtube.com/watch")) {
          const videoId = youtubeUrl.split("v=")[1].split("&")[0];
          youtubeAppUrl =
            Platform.OS === "ios"
              ? `youtube://www.youtube.com/watch?v=${videoId}`
              : `vnd.youtube:${videoId}`;
        } else if (youtubeUrl.includes("youtu.be")) {
          const videoId = youtubeUrl.split("youtu.be/")[1];
          youtubeAppUrl =
            Platform.OS === "ios"
              ? `youtube://www.youtube.com/watch?v=${videoId}`
              : `vnd.youtube:${videoId}`;
        }

        const canOpen = await Linking.canOpenURL(youtubeAppUrl);

        if (canOpen) {
          await Linking.openURL(youtubeAppUrl);
        } else {
          await Linking.openURL(videoData.video_url);
        }
      } catch (error) {
        console.error("Error opening YouTube video:", error);
        await Linking.openURL(videoData.video_url);
      }
    }
  };

  return (
    <View className="flex-1 h-full relative bg-dark">
      <StatusBar translucent backgroundColor="transparent" />

      {/* Back button with blur effect */}
      <BlurView
        intensity={80}
        tint="dark"
        className="absolute top-12 left-4 z-10 overflow-hidden rounded-full"
      >
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </BlurView>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Video Player */}
        <VideoPlayer
          videoUrl={videoData.video_url}
          imageUrl={videoData.image_url}
          onPlaybackStatusUpdate={(status) => setStatus(status)}
        />

        <View className="flex-1 px-5 pt-6 space-y-4 pb-24 rounded-t-3xl bg-darkBlue mt-20 shadow-lg">
          {/* Title */}
          <Text className="text-xl font-bold text-white">
            {videoData.title}
          </Text>

          {/* Categories */}
          <View className="flex flex-row items-center justify-between">
            <View className="bg-dark/50 py-1 px-3 rounded-full">
              <Text className="text-sm text-gray-300">
                {capitalizeFirstLetter(videoData.sub_category)}
              </Text>
            </View>
            <View className="rounded-full bg-primary px-4 py-2">
              <Text className="text-sm font-semibold text-white">
                {capitalizeFirstLetter(videoData.category)}
              </Text>
            </View>
          </View>

          {/* Stats and actions */}
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center">
              <Ionicons name="eye-outline" size={18} color="#9ca3af" />
              <Text className="text-gray-400 text-sm ml-1">10.2k views</Text>
            </View>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setLiked(!liked)}
              >
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={22}
                  color={liked ? "#ff3b30" : "#9ca3af"}
                />
                <Text
                  className={`text-sm ml-1 ${
                    liked ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {liked ? "327" : "326"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={handleShare}
              >
                <Ionicons
                  name="share-social-outline"
                  size={22}
                  color="#9ca3af"
                />
                <Text className="text-gray-400 text-sm ml-1">Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View className="mt-2">
            <Text className="text-lg font-semibold text-white mb-2">
              Description
            </Text>
            <View className="bg-dark/30 p-4 rounded-xl">
              <Text className="text-gray-300 leading-6">
                {videoData.description || "No description available."}
              </Text>
            </View>
          </View>

          {/* Related Videos */}
          <View className="mt-2">
            <Text className="text-lg font-semibold text-white mb-2">
              Related Videos
            </Text>
            {relatedVideos.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pt-2"
              >
                {relatedVideos.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="mr-3"
                    onPress={() => {
                      router.push({
                        pathname: "/video-detail",
                        params: { videoData: JSON.stringify(item) },
                      });
                    }}
                  >
                    <View className="w-[160px] bg-dark rounded-xl overflow-hidden shadow-md">
                      <Image
                        source={{ uri: item.image_url }}
                        className="w-full h-24"
                        resizeMode="cover"
                      />
                      <View className="p-2">
                        <Text
                          numberOfLines={2}
                          className="text-white text-sm font-medium"
                        >
                          {item.title}
                        </Text>
                        <Text className="text-gray-400 text-xs mt-1">
                          {capitalizeFirstLetter(item.category)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View className="py-4 items-center">
                <Text className="text-gray-400">No related videos found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom action button */}
      <LinearGradient
        colors={["transparent", "rgba(15, 23, 42, 0.9)", "rgb(15, 23, 42)"]}
        className="absolute right-0 left-0 bottom-0 py-4"
      >
        <TouchableOpacity
          style={{
            elevation: 8,
            shadowColor: "#f43f5e",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
          className="bg-primary rounded-full p-3 mx-5"
          onPress={handleMainAction}
        >
          <Text className="text-center text-base font-bold text-white">
            {getButtonText()}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default VideoDetail;
