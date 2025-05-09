import {
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useCategoryStore } from "@/store/use-category";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/actions/get-data";
import { Category } from "@/types/interface";
import Animated, { FadeInRight, FadeIn } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const CategoriesTab = () => {
  const { activeCategory, setActiveCategory } = useCategoryStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchCategories();
      if (!res.error) {
        const all = [{ title: "All" }, ...res];
        setCategories(all);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return (
      <Animated.View
        entering={FadeIn}
        className="h-12 justify-center items-center"
      >
        <ActivityIndicator size="small" color="#0081C9" />
      </Animated.View>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  // Get category icon based on title
  const getCategoryIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    switch (lowerTitle) {
      case "all":
        return "grid";
      case "animation":
        return "film";
      case "video":
        return "video";
      case "technology":
        return "cpu";
      case "design":
        return "layout";
      case "business":
        return "briefcase";
      case "marketing":
        return "trending-up";
      default:
        return "hash";
    }
  };

  const handleCategoryPress = (categoryTitle: string) => {
    // Use toLowerCase to match the existing behavior
    setActiveCategory(categoryTitle.toLowerCase());
  };

  return (
    <Animated.View entering={FadeIn} className="my-2">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        data={categories}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => {
          const isActive = activeCategory === item.title.toLowerCase();
          const icon = getCategoryIcon(item.title);

          return (
            <Animated.View
              key={item.title}
              entering={FadeInRight.delay(index * 50)}
            >
              <TouchableOpacity
                className={`mr-2 px-4 py-1 rounded-full flex-row items-center ${
                  isActive
                    ? "bg-primary shadow-sm shadow-primary/50"
                    : "bg-darkBlue/50 border border-white/5"
                }`}
                style={{
                  elevation: isActive ? 3 : 0,
                }}
                onPress={() => handleCategoryPress(item.title)}
              >
                <Feather
                  name={icon}
                  size={12}
                  color={isActive ? "#FFF" : "#999"}
                />
                <Text
                  className={`font-medium ml-1 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {capitalizeFirstLetter(item.title)}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </Animated.View>
  );
};
export default CategoriesTab;
