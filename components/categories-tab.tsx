import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
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

  return (
    <Animated.View entering={FadeIn} className="my-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {categories.map((category, index) => {
          const isActive = activeCategory === category.title.toLowerCase();
          const icon = getCategoryIcon(category.title);

          return (
            <Animated.View
              key={category.title}
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
                onPress={() => setActiveCategory(category.title)}
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
                  {capitalizeFirstLetter(category.title)}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default CategoriesTab;
