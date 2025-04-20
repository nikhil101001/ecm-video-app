import BackgroundPattern from "@/components/background-pattern";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { firebase } from "@react-native-firebase/auth";

import { showToast } from "@/lib/utils";
import { useUserStore } from "@/store/use-user";
import { firebaseConfig } from "@/firebaseConfig";
import { addUser, fetchUsersByEmail } from "@/lib/actions/user-action";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SignIn = () => {
  const { setUser, setLocalUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      // Validate Google Play Services first
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Sign in process with better error checking
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error("Authentication failed: No token received");
      }

      // Firebase authentication
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const { user: googleUser } = await auth().signInWithCredential(
        googleCredential
      );

      if (!googleUser?.email) {
        throw new Error("Invalid user data: Email required");
      }

      // User management with proper error checking
      const existingUser = await fetchUsersByEmail(googleUser.email);

      if (!existingUser) {
        const newUser = await addUser({
          email: googleUser.email,
          name: googleUser.displayName || "",
          phone: googleUser.phoneNumber || "",
          photoURL: googleUser.photoURL || "",
        });

        setUser(newUser);
        await setLocalUser(newUser);
      } else {
        setUser(existingUser);
        await setLocalUser(existingUser);
      }

      showToast("Signed In Successfully");
      router.push("/(tabs)");
    } catch (error) {
      console.error(
        "Google Sign-In Error:",
        error instanceof Error ? error.message : JSON.stringify(error)
      );
      setUser(null);

      // More descriptive error messages
      showToast(
        `Sign-in failed: ${
          error instanceof Error
            ? error.message
            : "Error signing in with Google"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="min-h-screen bg-dark flex-1">
      <BackgroundPattern />
      <Image
        source={require("../../assets/images/gradient-backdrop.png")}
        className="absolute -top-10 left-0 w-full h-[85vh]"
        resizeMode="cover"
      />

      <View className="p-4 flex-1 items-center justify-between max-h-[80%] m-auto">
        <View className="h-1/2 justify-around items-center">
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            className="w-24 h-24"
          />
          <Image
            source={require("../../assets/images/text-logo.png")}
            className="w-64 h-24"
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
          onPress={handleGoogleLogin}
          disabled={isLoading}
          style={{
            elevation: 5,
          }}
          className="border-white/10 border rounded-full overflow-hidden"
        >
          <LinearGradient
            colors={["#06151D", "#192f6a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="py-4 rounded-full flex items-center flex-row gap-x-2 max-w-xs justify-center px-8 bg-dark"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <AntDesign name="google" size={24} color="white" />
            )}

            <Text className="text-center font-semibold text-white ps-4 text-lg">
              Continue with Google
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
