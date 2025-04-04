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

// GoogleSignin.configure({
//   webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
// });

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    router.push("/(tabs)");

    // try {
    //   setGoogleLoading(true);
    //   await GoogleSignin.hasPlayServices({
    //     showPlayServicesUpdateDialog: true,
    //   });
    //   const signInResult = await GoogleSignin.signIn();
    //   const token = signInResult.data?.idToken;
    //   if (!token) {
    //     throw new Error("No token found");
    //   }
    //   const googleCredential = auth.GoogleAuthProvider.credential(token);
    //   const { user } = await auth().signInWithCredential(googleCredential);
    //   const existingUser = await axios.get(
    //     `${apiEndpoint}/get-user?email=${user.email}`
    //   );
    //   if (!existingUser?.data) {
    //     await axios.post(`${apiEndpoint}/users`, {
    //       email: user.email,
    //       name: user.displayName,
    //     });
    //   }
    //   setUser(user);
    //   await setLocalUser(user);
    //   showToast("Signed In Successfully");
    // } catch (error) {
    //   console.error("Google Sign-In Error", error);
    //   setUser(null);
    //   showToast("Error signing in with Google");
    // } finally {
    //   setGoogleLoading(false);
    // }
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
            source={require("../../assets/images/icon.png")}
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
            className="py-4 rounded-full flex items-center flex-row gap-x-2 max-w-xs justify-center px-8"
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
