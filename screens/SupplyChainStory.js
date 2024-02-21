import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import ImageToStory from "../components/ImageToStory";
import { useState } from "react";

export default function SupplyChainStory() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageToStory />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
