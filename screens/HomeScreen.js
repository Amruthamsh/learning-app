import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text>Right on Track!</Text>
      <Button
        title="Begin your journey with quests!"
        color="orange"
        onPress={() => navigation.navigate("Quests")}
      />
      <Text>Badges Earned:</Text>
      <Text>Skills Acquired:</Text>
      <Text>Lessons Learnt:</Text>
    </SafeAreaView>
  );
}
