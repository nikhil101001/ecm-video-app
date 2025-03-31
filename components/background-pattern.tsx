import { View, Image, StyleSheet, Dimensions } from "react-native";

const BackgroundPattern = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/squiggly-texture.png")}
        style={styles.backgroundImage}
        resizeMode="repeat"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: Dimensions.get("window").height,
    zIndex: -1,
  },
  backgroundImage: {
    width: "200%",
    height: "200%",
    transform: [{ scale: 2 }],
    opacity: 0.15,
  },
});

export default BackgroundPattern;
