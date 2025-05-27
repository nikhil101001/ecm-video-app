import { Drawer } from "expo-router/drawer";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Image, View } from "react-native";
import { Colors } from "@/constants/Colors";
import GoogleHeaderProfile from "@/components/google-header-profile";
import { useCallback, useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserStore } from "@/store/use-user";
import { router } from "expo-router";

export default function TabLayout() {
  const { checkAuth, clearLocalUser } = useUserStore();

  const [headerVisible, setHeaderVisible] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const verifyAuthentication = async () => {
    setIsAuthChecking(true);
    try {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.replace("/(auth)");
      }
    } catch (error) {
      console.error("Auth verification error:", error);
      clearLocalUser();
      router.replace("/(auth)");
    } finally {
      setIsAuthChecking(false);
    }
  };

  // Authentication check
  useEffect(() => {
    verifyAuthentication();
  }, []);

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

  // Show loading indicator while checking authentication
  if (isAuthChecking) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primary,
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              source={require("../../assets/images/logo.png")}
              resizeMode="contain"
              className="w-32 h-14"
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
          drawerStatusBarAnimation: "slide",

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
    </GestureHandlerRootView>
  );
}
