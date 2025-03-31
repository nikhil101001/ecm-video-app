import {
  View,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItemInfo,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";

import { FeaturedItem } from "@/types/interface";
import { featuredVideoData } from "@/data/data";
import FeaturedItemComponent from "./featured-item";

const FeaturedSection = () => {
  const flatListRef = useRef<FlatList<FeaturedItem>>(null);
  const videoData = featuredVideoData;

  const windowWidth = Dimensions.get("window").width;
  const ITEM_WIDTH = windowWidth * 0.9;
  const ITEM_HEIGHT = 210;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (activeIndex + 1) % videoData.length;
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setActiveIndex(nextIndex);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex, videoData.length]);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / ITEM_WIDTH);
    setActiveIndex(index);
  };

  const handleScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<FeaturedItem>) => {
      const isActive = index === activeIndex;
      return (
        <FeaturedItemComponent
          item={item}
          isActive={isActive}
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
        />
      );
    },
    [activeIndex, ITEM_WIDTH, ITEM_HEIGHT]
  );

  const keyExtractor = useCallback(
    (item: FeaturedItem, index: number) => `${item.id}-${index}`,
    []
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    [ITEM_WIDTH]
  );

  return (
    <View className="my-2">
      <FlatList
        ref={flatListRef}
        data={videoData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        initialScrollIndex={0}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        removeClippedSubviews={true}
        maxToRenderPerBatch={2}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        initialNumToRender={3}
        contentContainerStyle={{
          paddingHorizontal: 6,
        }}
      />
    </View>
  );
};

export default FeaturedSection;
