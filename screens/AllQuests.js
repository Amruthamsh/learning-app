import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import QuestCard from "../components/QuestCard";

export default function AllQuests() {
  const libraryQuestData = {
    name: "Library Hunt",
    image: require("../assets/library.png"),
    type: "visit a place",
    difficulty: "medium",
    objectives: [
      "Find book",
      "Take Picture of the Introduction",
      "Complete Quiz",
    ],
    completion_status: false,
    points_earned: 0,
  };

  const HistoricalLocation = {
    name: "Time Machine",
    image: require("../assets/retro-cam.jpg"),
    type: "visit a place",
    difficulty: "medium",
    objectives: [
      "Find book",
      "Take Picture of the Introduction",
      "Complete Quiz",
    ],
    completion_status: false,
    points_earned: 0,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Completed Quests: 5/25</Text>
      <ScrollView>
        <QuestCard {...libraryQuestData} />
        <QuestCard {...HistoricalLocation} />
        <QuestCard {...libraryQuestData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
