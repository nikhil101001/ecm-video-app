import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { Colors } from "@/constants/Colors";
import GoogleHeaderProfile from "@/components/google-header-profile";

export default function TabLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerBackground: () => (
          <View style={{ backgroundColor: Colors.primary, height: "100%" }} />
        ),
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTitle: () => (
          <Image
            source={require("../../assets/images/icon.png")}
            resizeMode="contain"
            className="w-12 h-12"
          />
        ),
        headerRight: () => <GoogleHeaderProfile />,

        drawerStyle: {
          backgroundColor: Colors.primary,
          width: 240,
        },
        drawerType: "front",
        drawerPosition: "left",
        drawerHideStatusBarOnOpen: false,
        drawerStatusBarAnimation: "fade",

        drawerActiveBackgroundColor: "#3498db",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",

        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
