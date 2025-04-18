import { Drawer } from "expo-router/drawer";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { Colors } from "@/constants/Colors";
import GoogleHeaderProfile from "@/components/google-header-profile";
import { useCallback, useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export default function TabLayout() {
  const [headerVisible, setHeaderVisible] = useState(true);

  const handleOrientationChange = useCallback(async () => {
    try {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      setHeaderVisible(
        currentOrientation === ScreenOrientation.Orientation.PORTRAIT_UP
      );
    } catch (error) {
      console.error("Error checking orientation:", error);
    }
  }, []);

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      handleOrientationChange
    );
    handleOrientationChange();
    return () => subscription.remove();
  }, [handleOrientationChange]);

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
        drawerInactiveTintColor: "#fff",

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
        name="all-pin-videos"
        options={{
          title: "Must Watch",
          drawerIcon: ({ color }) => (
            <Ionicons name="play-circle-outline" size={22} color={color} />
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

      <Drawer.Screen
        name="about-us"
        options={{
          title: "About Us",
          drawerIcon: ({ color }) => (
            <Feather name="info" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="video-detail"
        options={{
          drawerItemStyle: { display: "none" },
          headerShown: headerVisible,
        }}
      />
    </Drawer>
  );
}
