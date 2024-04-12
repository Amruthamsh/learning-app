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
  const KnowYourNutrients = {
    name: "Know Your Nutrients",
    image: require("../assets/nutrients_card.png"),
    difficulty: "easy",
    objectives: [
      "Take a picture of a food item",
      "Learn all about its Nutrients!",
    ],
    points: 100, //for every new book
    screen: "KnowYourNutrients",
  };
  const NewsScreen = {
    name: "Current Affairs",
    image: require("../assets/current_affairs.png"),
    difficulty: "easy",
    objectives: ["NewsNews", "NewsNews"],
    points: 100,
    screen: "NewsScreen",
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
          <QuestCard {...KnowYourNutrients} />
          <QuestCard {...ReadingAdventures} />
          <QuestCard {...NewsScreen} />
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
