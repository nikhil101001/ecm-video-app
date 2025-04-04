import { FlatList } from "react-native";
import VideoCard from "./video-card";
import { VideoData } from "@/types/interface";

const VideoList = ({ videoData }: { videoData: VideoData[] }) => {
  return (
    <FlatList
      data={videoData}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => <VideoCard item={item} />}
      columnWrapperStyle={{ justifyContent: "center" }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default VideoList;
