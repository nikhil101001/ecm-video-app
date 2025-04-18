import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const About = () => {
  const openMap = () => {
    Linking.openURL(
      "https://maps.google.com/?q=E-Creations+Multimedia+B19+East+Krishna+Nagar+Delhi"
    );
  };

  const callPhone = () => {
    Linking.openURL("tel:9015803082");
  };

  const sendEmail = () => {
    Linking.openURL("mailto:sandeep@ecreationsmultimedia.com");
  };

  return (
    <ScrollView className="flex-1 bg-dark" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="p-6 bg-darkBlue/60 rounded-lg m-4">
        <Text className="text-3xl font-bold text-white text-center">
          About Us
        </Text>
        <Text className="text-white/70 text-center mt-2 text-base">
          Transform your Vision into Reality
        </Text>
      </View>

      {/* Main Content */}
      <View className="px-4 gap-4">
        {/* Introduction Section */}
        <View className="bg-darkBlue/60 p-6 rounded-2xl shadow-md border border-blue-500/10">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-blue-500/30 items-center justify-center mr-3">
              <Feather name="info" size={22} color="#0081C9" />
            </View>
            <Text className="text-white text-xl font-semibold">
              E-Creations Multimedia
            </Text>
          </View>
          <Text className="text-gray-300 text-base leading-6">
            E-Creations Multimedia specializes in creating digital content,
            including animations, for various purposes like entertainment,
            advertising, and education.
          </Text>
        </View>

        {/* How We Work Section */}
        <View className="bg-darkBlue/60 p-6 rounded-2xl shadow-md border border-blue-500/10">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-blue-500/30 items-center justify-center mr-3">
              <Feather name="settings" size={22} color="#0081C9" />
            </View>
            <Text className="text-white text-xl font-semibold">
              How We Work
            </Text>
          </View>
          <Text className="text-gray-300 text-base leading-6 mb-3">
            E-Creations starts by gathering a team of talented artists,
            animators, and computer experts. Our team works together to bring
            stories and ideas to life.
          </Text>
          <Text className="text-gray-300 text-base leading-6 mb-3">
            We use special software and computers to make characters, objects,
            and backgrounds move and interact with each other.
          </Text>
          <Text className="text-gray-300 text-base leading-6">
            Imagine you want to make a cartoon about talking animals,
            E-Creations can create those animals on a computer, make them talk,
            give them emotions, and make them do all sorts of fun things. We can
            even create the world these animals live in, like a colorful forest
            or a bustling city.
          </Text>
        </View>

        {/* Team Section */}
        <View className="bg-darkBlue/60 p-6 rounded-2xl shadow-md border border-blue-500/10">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-blue-500/30 items-center justify-center mr-3">
              <Feather name="users" size={22} color="#0081C9" />
            </View>
            <Text className="text-white text-xl font-semibold">Our Team</Text>
          </View>
          <Text className="text-gray-300 text-base leading-6 mb-3">
            E-Creations' team is made up of skilled artists, animators, writers,
            and designers who work together like a well-oiled machine.
          </Text>
          <Text className="text-gray-300 text-base leading-6 mb-3">
            We wanted to take storytelling to a whole new level by using
            animation, and that's how E-Creations was born. Our team works
            together to turn ideas into reality. It's a place where creativity
            knows no bounds.
          </Text>
          <Text className="text-gray-300 text-base leading-6">
            Moreover, E-Creations knows that today's world is all about
            technology. We stay up-to-date with the latest trends and tools,
            making sure our animations are not only entertaining but also of the
            highest quality.
          </Text>
        </View>

        {/* Contact Section */}
        <View className="p-6 rounded-2xl shadow-md mb-6 bg-darkOrange">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3">
              <Feather name="mail" size={22} color="#fff" />
            </View>
            <Text className="text-white text-xl font-semibold">Contact Us</Text>
          </View>

          <Text className="text-white text-base leading-6 mb-5">
            Get in touch with us today for all your digital and creative needs.
            Our team of experts is ready to turn your vision into reality.
          </Text>

          <View className="gap-3">
            <TouchableOpacity
              onPress={callPhone}
              className="flex-row items-center p-4 bg-white/10 rounded-xl border border-white/20"
            >
              <Feather name="phone" size={20} color="#fff" />
              <Text className="ml-3 text-white font-medium">9015803082</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openMap}
              className="flex-row items-center p-4 bg-white/10 rounded-xl border border-white/20"
            >
              <Feather name="map-pin" size={20} color="#fff" />
              <View className="ml-3 flex-1">
                <Text className="text-white font-medium">
                  E-Creations Multimedia
                </Text>
                <Text className="text-white/80 text-sm">
                  B19, 2nd & 3rd Floor (beside Khandelwal Hospital) East Krishna
                  Nagar, Delhi 110051
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={sendEmail}
              className="flex-row items-center p-4 bg-white/10 rounded-xl border border-white/20"
            >
              <Feather name="mail" size={20} color="#fff" />
              <Text className="ml-3 text-white font-medium">
                sandeep@ecreationsmultimedia.com
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-white/80 text-sm mt-4 text-center">
            We appreciate your feedback!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
