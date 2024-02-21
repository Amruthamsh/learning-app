import { StyleSheet, View, SafeAreaView } from "react-native";
import ImageToQuiz from "../components/ImageToQuiz";
import { useState } from "react";

export default function ReadingAdventures() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageToQuiz />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
