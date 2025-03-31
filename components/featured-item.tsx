import { memo, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import YoutubePlayer from "react-native-youtube-iframe";

import { FeaturedItemProps } from "@/types/types";
import { extractYouTubeVideoId, isYouTubeUrl } from "@/hooks/common";

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
      <View
        className={`overflow-hidden rounded-xl bg-neutral-800 shadow-lg me-4 ${
          isActive ? "opacity-100" : "opacity-70"
        }`}
        style={{ width, height }}
      >
        {isActive ? (
          isYoutube && youtubeVideoId ? (
            <YoutubePlayer
              height={height}
              width={width}
              play={playing}
              videoId={youtubeVideoId}
              onReady={() => setYoutubeReady(true)}
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
              style={{
                width: "100%",
                height: "100%",
              }}
              className="mb-auto"
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
        <View
          className={`absolute bottom-0 left-0 right-0 p-4 rounded-b-xl ${
            item.category === "video" ? "bg-dark/90" : "bg-darkOrange/90"
          }`}
        >
          <View className="flex-row items-center w-full justify-between gap-2">
            <Text className="text-white text-sm font-bold mb-1">
              {item.title}
            </Text>
            <Text
              className={`text-white text-xs font-bold mb-1 rounded-full px-2 py-0.5 ${
                item.category === "video" ? "bg-primary" : "bg-secondary"
              }`}
            >
              {item.sub_category}
            </Text>
          </View>
          <Text className="text-white/80 text-xs" numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  }
);

export default FeaturedItemComponent;
