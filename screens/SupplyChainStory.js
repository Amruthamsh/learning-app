import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ImageBackground,
} from "react-native";
import ImageToStory from "../components/ImageToStory";
import { useState } from "react";

export default function SupplyChainStory() {
  return (
    <ImageBackground
      source={require("../assets/back (3).png")} // Change the path accordingly
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <SafeAreaView style={styles.container}>
        <ImageToStory />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch" for different cover options
    justifyContent: "center",
  },
});
