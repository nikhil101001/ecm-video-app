import { useUserStore } from "@/store/use-user";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function TabLayout() {
  const { setUser, setLocalUser, checkAuth, clearLocalUser } = useUserStore();
  const [isChecking, setIsChecking] = useState(true);

  const checkUser = async () => {
    setIsChecking(true);
    try {
      const isAuthenticated = await checkAuth();

      if (isAuthenticated) {
        router.push("/(tabs)");
      } else {
        // If no stored user, try Google Sign-in
        const googleUser = await GoogleSignin.getCurrentUser();
        if (googleUser) {
          const appUser = {
            ...googleUser.user,
            email: googleUser.user.email || "",
            name: googleUser.user.name || "",
          };
          setUser(appUser);
          await setLocalUser(appUser);
          router.push("/(tabs)");
        }
      }
    } catch (error) {
      console.error("Error checking authentication state:", error);
      clearLocalUser();
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (isChecking) {
    return (
      <SafeAreaView className="min-h-screen bg-dark flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
