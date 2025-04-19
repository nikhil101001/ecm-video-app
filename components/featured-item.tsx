import { memo, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  capitalizeFirstLetter,
  extractYouTubeVideoId,
  isYouTubeUrl,
} from "@/lib/utils";
import { FeaturedItemProps } from "@/types/interface";
import { router } from "expo-router";

const FeaturedItemComponent = memo(
  ({ item, isActive, width, height }: FeaturedItemProps) => {
    const videoUrl = item?.video_url;
    const [youtubeReady, setYoutubeReady] = useState(false);
    const [playing, setPlaying] = useState(false);
    const isYoutube = isYouTubeUrl(videoUrl);
    const youtubeVideoId = isYoutube ? extractYouTubeVideoId(videoUrl) : null;

    const videoPlayer = !isYoutube
      ? useVideoPlayer(videoUrl, (player) => {
          player.playbackRate = 1.0;
          player.muted = true;
          player.volume = 1.0;
          player.loop = true;
          player.seekBy(player.duration / 4);
        })
      : null;

    useEffect(() => {
      if (isActive) {
        if (isYoutube) {
          setPlaying(true);

          // Auto pause after 8 seconds
          const timer = setTimeout(() => {
            setPlaying(false);
          }, 8000);

          return () => clearTimeout(timer);
        } else if (videoPlayer) {
          const playVideo = async () => {
            try {
              videoPlayer?.play();
              videoPlayer?.seekBy(videoPlayer?.duration / 4);

              setTimeout(async () => {
                videoPlayer.pause();
              }, 8000);
            } catch (error) {
              console.log("Error playing video:", error);
            }
          };

          playVideo();
        }
      } else {
        if (isYoutube) {
          setPlaying(false);
        }
      }
    }, [isActive, isYoutube, videoPlayer]);

    return (
      <Pressable
        className={`overflow-hidden !rounded-2xl bg-neutral-800 shadow-lg me-4 border border-white/10 ${
          isActive ? "opacity-100" : "opacity-70"
        }`}
        style={{ width, height }}
        onPress={() => {
          router.push({
            pathname: "/video-detail",
            params: { videoData: JSON.stringify(item) },
          });
        }}
      >
        {isActive ? (
          isYoutube && youtubeVideoId ? (
            <YoutubePlayer
              height={height}
              width={width}
              play={playing}
              videoId={youtubeVideoId}
              onReady={() => setYoutubeReady(true)}
              volume={0}
              webViewProps={{
                renderToHardwareTextureAndroid: true,
              }}
              initialPlayerParams={{
                preventFullScreen: true,
                cc_lang_pref: "en",
                controls: false,
                modestbranding: true,
                rel: false,
              }}
            />
          ) : videoPlayer ? (
            <VideoView
              player={videoPlayer}
              allowsFullscreen={true}
              nativeControls={false}
              style={{ width, height }}
            />
          ) : (
            <Image
              source={{ uri: item.image_url }}
              className="absolute h-full w-full"
              resizeMode="cover"
            />
          )
        ) : (
          <Image
            source={{ uri: item.image_url }}
            className="absolute h-full w-full"
            resizeMode="cover"
          />
        )}

        <Text
          numberOfLines={1}
          className={`absolute top-2 right-2 p-1 z-10 text-white text-xs font-bold mb-1 rounded-full px-2 py-0.5 ${
            item.category === "animation" ? "bg-secondary" : "bg-primary"
          }`}
        >
          {capitalizeFirstLetter(item.sub_category)}
        </Text>

        <View
          className={`absolute bottom-0 left-0 right-0 p-4 rounded-b-2xl ${
            item.category === "animation" ? "bg-darkOrange/90" : "bg-dark/90"
          }`}
        >
          <View className="flex-row items-center w-full justify-between gap-2">
            <Text
              className="text-white text-sm font-bold mb-1"
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </View>
          <Text className="text-white/80 text-xs" numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </Pressable>
    );
  }
);

export default FeaturedItemComponent;
