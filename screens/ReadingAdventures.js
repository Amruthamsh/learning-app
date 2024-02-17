import { StyleSheet, View, SafeAreaView } from "react-native";
import DetectText from "../components/Vision";
import { useState } from "react";

export default function ReadingAdventures() {
  return (
    <SafeAreaView style={styles.container}>
      <DetectText />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
