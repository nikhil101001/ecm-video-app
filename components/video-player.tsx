import { extractYouTubeVideoId, isYouTubeUrl } from "@/lib/utils";
import { useVideoPlayer, VideoView } from "expo-video";
import { Image, View, useWindowDimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";

interface VideoPlayerProps {
  videoUrl: string;
  imageUrl: string;
}

const VideoPlayer = ({ videoUrl, imageUrl }: VideoPlayerProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Adjusted dimension calculations
  const playerWidth = width;
  const playerHeight = isLandscape ? height : (width * 9) / 16;

  // Special handling for YouTube in landscape
  const youtubeWidth = isLandscape ? (height * 16) / 9 : width;
  const youtubeHeight = isLandscape ? height : (width * 9) / 16;

  const videoPlayer = useVideoPlayer(videoUrl, (player) => {
    player.play();
    player.playbackRate = 1.0;
    player.volume = 1.0;
    player.loop = true;
  });
  const isYouTubeVideo = isYouTubeUrl(videoUrl);
  const youtubeVideoId = isYouTubeVideo
    ? extractYouTubeVideoId(videoUrl)
    : null;

  return (
    <View
      className="z-10"
      style={{
        width: "100%",
        height: playerHeight,
        justifyContent: isLandscape && isYouTubeVideo ? "center" : "flex-start",
        alignItems: isLandscape && isYouTubeVideo ? "center" : "flex-start",
      }}
    >
      {isYouTubeVideo && youtubeVideoId ? (
        <YoutubePlayer
          width={youtubeWidth}
          height={youtubeHeight}
          play={true}
          videoId={youtubeVideoId}
          volume={100}
          initialPlayerParams={{
            cc_lang_pref: "en",
            modestbranding: true,
            controls: true,
            rel: false,
          }}
        />
      ) : videoPlayer ? (
        <VideoView
          player={videoPlayer}
          allowsFullscreen={true}
          nativeControls={true}
          style={{ width: playerWidth, height: playerHeight }}
          onFullscreenEnter={() =>
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE
            )
          }
          onFullscreenExit={() =>
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.DEFAULT
            )
          }
        />
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: playerHeight,
          }}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default VideoPlayer;
