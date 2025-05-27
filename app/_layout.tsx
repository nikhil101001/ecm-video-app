import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import "react-native-reanimated";
import "../global.css";
import * as ScreenOrientation from "expo-screen-orientation";

export default function RootLayout() {
  const [statusBarVisible, setStatusBarVisible] = useState(false);

  useEffect(() => {
    // Prevent the splash screen from auto-hiding before asset loading is complete.
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  const handleOrientationChange = useCallback(async () => {
    try {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      setStatusBarVisible(
        currentOrientation !== ScreenOrientation.Orientation.PORTRAIT_UP
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
    <>
      <Stack initialRouteName="(auth)">
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" hidden={statusBarVisible} />
    </>
  );
}

// just to check git commits
