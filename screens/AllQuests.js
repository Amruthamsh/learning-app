import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
  View,
} from "react-native";
import QuestCard from "../components/QuestCard";

export default function AllQuests() {
  const SupplyChainStory = {
    name: "Source to Shelf",
    image: require("../assets/retro-cam.jpg"),
    difficulty: "easy",
    objectives: [
      "Take a picture of an object",
      "Learn all about its supply chain",
    ],
    completion_status: false,
    points_earned: 50,
    screen: "SupplyChainStory",
  };

  const ReadingAdventures = {
    name: "Reading Adventures",
    image: require("../assets/library.png"),
    difficulty: "medium",
    objectives: [
      "Read a book that you have lying around",
      "Take picture of your favorite section/excerpt",
      "Complete quiz on that",
    ],
    points: 100, //for every new book
    screen: "ReadingAdventures",
  };

  const LanguageExplorer = {
    name: "Language Explorer",
    image: require("../assets/retro-cam.jpg"),
    difficulty: "medium",
    objectives: [
      "Converse with a person who speaks a different language.",
      "Identify and translate simple words or phrases using computer vision / speech to text.",
      "Explore basic phrases from different languages.",
    ],
    completion_status: false,
    points_earned: 200,
  };

  const TimeMachine = {
    name: "Time Machine",
    image: require("../assets/retro-cam.jpg"),
    difficulty: "medium",
    objectives: [
      "Track your location",
      "Return a picture from decades ago",
      "Go to that location and explore how the place has evolved",
      "Compare pictures: Then and now",
    ],
    completion_status: false,
    points_earned: 400,
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

  const DisabilityFriendlyLesson = {
    name: "Disability Friendly Lesson",
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
    <ImageBackground
      source={require("../assets/back (3).png")} // Change the path accordingly
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <SafeAreaView style={styles.container}>
        <View style={{ margin: 16 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: "brown",
              marginVertical: 10,
            }}
          >
            Continue your journey...
          </Text>
          <Text style={{ fontSize: 16 }}>Completed Quests: 5/25</Text>
        </View>
        <ScrollView>
          <QuestCard {...SupplyChainStory} />
          <QuestCard {...ReadingAdventures} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch" for different cover options
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
