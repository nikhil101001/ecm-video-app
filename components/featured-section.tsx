import { View, Dimensions, Pressable } from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import PagerView from "react-native-pager-view";
import FeaturedItemComponent from "./featured-item";
import { VideoData } from "@/types/interface";

const FeaturedSection = ({ item }: { item: VideoData[] }) => {
  const pagerRef = useRef<PagerView>(null);
  const videoData = item;

  const windowWidth = Dimensions.get("window").width;
  const ITEM_WIDTH = windowWidth - 32; // 16 padding on each side
  const ITEM_HEIGHT = 215;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pagerRef.current) {
        const nextIndex = (activeIndex + 1) % videoData.length;
        pagerRef.current.setPage(nextIndex);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex, videoData.length]);

  const handlePageSelected = useCallback((event: any) => {
    const newIndex = event.nativeEvent.position;
    setActiveIndex(newIndex);
  }, []);

  const renderPaginationDots = () => {
    return (
      <View className="flex-row justify-center mt-2 space-x-1.5">
        {videoData.map((_, index) => (
          <Pressable
            key={`dot-${index}`}
            onPress={() => {
              pagerRef.current?.setPage(index);
            }}
          >
            <View
              className={`h-2 mx-0.5 rounded-full ${
                index === activeIndex ? "w-4 bg-primary" : "w-2 bg-white/10"
              }`}
            />
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View className="m-4">
      <PagerView
        ref={pagerRef}
        style={{ height: ITEM_HEIGHT }}
        initialPage={0}
        onPageSelected={handlePageSelected}
        pageMargin={8}
        offscreenPageLimit={2}
      >
        {videoData.map((item, index) => (
          <View key={`${item._id}-${index}`} style={{ padding: 0 }}>
            <FeaturedItemComponent
              item={item}
              isActive={index === activeIndex}
              width={ITEM_WIDTH}
              height={ITEM_HEIGHT}
            />
          </View>
        ))}
      </PagerView>
      {renderPaginationDots()}
    </View>
  );
};

export default FeaturedSection;
