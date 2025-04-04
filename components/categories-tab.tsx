import { categories } from "@/data/data";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useCategoryStore } from "@/store/use-category";
import { capitalizeFirstLetter } from "@/lib/utils";

const CategoriesTab = () => {
  const { activeCategory, setActiveCategory } = useCategoryStore();

  // Create a special "all" tab
  const allCategories = [{ title: "All" }, ...categories];

  if (categories.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-2"
    >
      {allCategories.map((category) => (
        <TouchableOpacity
          key={category.title}
          className={`px-4 py-1 rounded-full ${
            activeCategory === category.title.toLowerCase() && "bg-primary"
          }`}
          onPress={() => setActiveCategory(category.title)}
        >
          <Text
            className={`font-medium ${
              activeCategory === category.title.toLowerCase()
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            {capitalizeFirstLetter(category.title)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoriesTab;
