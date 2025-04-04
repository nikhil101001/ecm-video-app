import { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  Linking,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import { extractYouTubeVideoId, isYouTubeUrl } from "@/lib/utils";
import YoutubePlayer from "react-native-youtube-iframe";

interface VideoPlayerProps {
  videoUrl: string;
  imageUrl: string;
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
}

const { width } = Dimensions.get("window");

const VideoPlayer = ({
  videoUrl,
  imageUrl,
  onPlaybackStatusUpdate,
}: VideoPlayerProps) => {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isYouTubeVideo, setIsYouTubeVideo] = useState(false);
  const [youtubeReady, setYoutubeReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const youtubeVideoId = isYouTubeVideo
    ? extractYouTubeVideoId(videoUrl)
    : null;

  // Check if video URL is from YouTube
  useEffect(() => {
    const isYoutube = isYouTubeUrl(videoUrl);
    setIsYouTubeVideo(isYoutube);

    if (!isYoutube) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [videoUrl]);

  // Helper function to check if status is a success status object
  const isPlayingStatus = (
    status: AVPlaybackStatus
  ): status is AVPlaybackStatusSuccess => {
    return status.isLoaded === true;
  };

  // Open YouTube video in YouTube app or browser
  const openYouTubeVideo = async () => {
    try {
      const youtubeUrl = videoUrl;
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
        await Linking.openURL(videoUrl);
      }
    } catch (error) {
      console.error("Error opening YouTube video:", error);
      await Linking.openURL(videoUrl);
    }
  };

  // Handle video playback
  const handlePlayback = async () => {
    if (isYouTubeVideo) {
      if (youtubeVideoId) {
        setPlaying(!playing);
      } else {
        openYouTubeVideo();
      }
      return;
    }

    const videoStatus = await videoRef.current?.getStatusAsync();
    if (videoStatus && isPlayingStatus(videoStatus) && videoStatus.isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
  };

  // Update parent component with playback status
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status);
    if (status.isLoaded) {
      setIsLoading(false);
    }
    if (onPlaybackStatusUpdate) {
      onPlaybackStatusUpdate(status);
    }
  };

  // For the TouchableOpacity opacity style
  const getOpacityValue = () => {
    if (!isYouTubeVideo && isPlayingStatus(status) && status.isPlaying) {
      return 0;
    }
    if (isYouTubeVideo && playing) {
      return 0;
    }
    return 1;
  };

  return (
    <View className="w-full aspect-video relative">
      {isLoading && !isYouTubeVideo && (
        <View className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/80 z-10">
          <ActivityIndicator size="large" color="#ff3b30" />
        </View>
      )}

      {isYouTubeVideo && youtubeVideoId ? (
        <View className="w-full h-full">
          <YoutubePlayer
            width={width}
            height={500}
            play={playing}
            videoId={youtubeVideoId}
            onReady={() => {
              setYoutubeReady(true);
              setIsLoading(false);
            }}
            onChangeState={(state) => {
              if (state === "ended") setPlaying(false);
            }}
            webViewProps={{
              renderToHardwareTextureAndroid: true,
            }}
            initialPlayerParams={{
              preventFullScreen: false,
              cc_lang_pref: "en",
              modestbranding: true,
              rel: false,
            }}
          />
          {!youtubeReady && (
            <Image
              source={{
                uri:
                  imageUrl ||
                  `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`,
              }}
              className="absolute w-full h-full"
              resizeMode="cover"
            />
          )}
        </View>
      ) : isYouTubeVideo ? (
        // YouTube video thumbnail with play button (fallback)
        <View className="w-full h-full relative">
          <Image
            source={{
              uri:
                imageUrl || "https://img.youtube.com/vi/default/hqdefault.jpg",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      ) : (
        // Regular video player
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          posterSource={
            imageUrl ? { uri: imageUrl } : require("@/assets/images/icon.png")
          }
          posterStyle={{ resizeMode: "cover" }}
          usePoster={true}
          style={{ width: "100%", height: "100%" }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onError={(error) => {
            console.error("Video error:", error);
            setIsLoading(false);
          }}
        />
      )}

      <TouchableOpacity
        onPress={handlePlayback}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: getOpacityValue() }}
      >
        <View className="bg-primary/80 rounded-full p-4 shadow-lg">
          <Ionicons
            name={isYouTubeVideo ? "logo-youtube" : "play"}
            size={40}
            color="white"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;
