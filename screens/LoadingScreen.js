import React from "react";
import { ActivityIndicator, Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo_main.png")}
        style={{ height: 70, width: 70, marginBottom: 10 }}
      />
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Questify - Techno Exhibition 2024
      </Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
