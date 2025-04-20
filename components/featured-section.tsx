import { View, Dimensions, Pressable, FlatList } from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSharedValue } from "react-native-reanimated";
import FeaturedItemComponent from "./featured-item";
import { VideoData } from "@/types/interface";

const FeaturedSection = ({ item }: { item: VideoData[] }) => {
  const flatListRef = useRef<FlatList>(null);
  const videoData = item;
  const progress = useSharedValue<number>(0);

  const windowWidth = Dimensions.get("window").width;
  const ITEM_WIDTH = windowWidth - 32; // 16 padding on each side
  const ITEM_HEIGHT = 215;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (activeIndex + 1) % videoData.length;
        scrollToIndex(nextIndex);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex, videoData.length]);

  const scrollToIndex = useCallback((index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewOffset: 0,
        viewPosition: 0,
      });
    }
  }, []);

  const handleScroll = useCallback(
    (event: any) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollX / ITEM_WIDTH);
      setActiveIndex(index);
      progress.value = scrollX / ITEM_WIDTH;
    },
    [ITEM_WIDTH, progress]
  );

  const renderPaginationDots = () => {
    return (
      <View className="flex-row justify-center mt-2 space-x-1.5">
        {videoData.map((_, index) => (
          <Pressable
            key={`dot-${index}`}
            onPress={() => {
              scrollToIndex(index);
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

  const renderItem = useCallback(
    ({ item, index }: { item: VideoData; index: number }) => {
      const isActive = indexIsActive(activeIndex, index);

      if (!isActive) {
        return (
          <View
            key={`placeholder-${item._id}`}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              marginRight: 8,
            }}
          />
        );
      }

      return (
        <View style={{ width: ITEM_WIDTH, marginRight: 8 }}>
          <FeaturedItemComponent
            item={item}
            isActive={index === activeIndex}
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
          />
        </View>
      );
    },
    [activeIndex, ITEM_WIDTH, ITEM_HEIGHT]
  );

  function indexIsActive(currentIndex: number, myIndex: number) {
    return (
      currentIndex === myIndex ||
      currentIndex - 1 === myIndex ||
      currentIndex + 1 === myIndex
    );
  }

  return (
    <View className="m-4">
      <FlatList
        ref={flatListRef}
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH + 8} // ITEM_WIDTH + marginRight
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        initialScrollIndex={0}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH + 8, // ITEM_WIDTH + marginRight
          offset: (ITEM_WIDTH + 8) * index,
          index,
        })}
        style={{ height: ITEM_HEIGHT }}
      />

      {renderPaginationDots()}
    </View>
  );
};

export default FeaturedSection;
