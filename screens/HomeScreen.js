import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";

export default function HomeScreen() {
  const [userData, setUserData] = useState(null);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      const user = FIREBASE_AUTH.currentUser;
      const db = getDatabase();
      const userDataRef = ref(db, "users/" + user?.uid);
      onValue(userDataRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    };
    getUser();
  }, []);

  const toggleProfileModal = () => {
    setProfileModalVisible(!isProfileModalVisible);
  };

  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  const handleStartQuest = () => {
    navigation.navigate("Quests");
  };

  // Dummy data for badges earned
  const badgesEarnedData = [
    { image: require("../assets/nonfic (1).png"), text: "Badge 1" },
    { image: require("../assets/scifi.png"), text: "Badge 2" },
    { image: require("../assets/mys.png"), text: "Badge 3" },
    { image: require("../assets/fantasy.png"), text: "Badge 4" },
    { image: require("../assets/history.png"), text: "Badge 5" },
    { image: require("../assets/bio.png"), text: "Badge 6" },
    { image: require("../assets/selfhelp.png"), text: "Badge 6" },
    { image: require("../assets/question_mark.png"), text: "Badge 6" },
    { image: require("../assets/question_mark.png"), text: "Badge 6" },
  ];

  // Calculate the number of rows
  const numRows = Math.ceil(badgesEarnedData.length / 3);

  return (
    <ImageBackground
      source={require("../assets/back (3).png")} // Change the path accordingly
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            margin: 20,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Questify
        </Text>
        <View style={styles.header}>
          <Text style={styles.greetingText}>👋 Hello {userData?.name}!</Text>
          <TouchableOpacity onPress={toggleProfileModal}>
            <Image
              source={require("../assets/girl_w_pony.png")}
              style={styles.profileIcon}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.questSection}>
          <View style={styles.questBox}>
            <Text style={styles.questText}>Begin Your{"\n"}Quest</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartQuest}
            >
              <Text style={styles.startButtonText}>Start now</Text>
            </TouchableOpacity>
            <Image
              source={require("../assets/logo_main.png")}
              style={styles.questImage}
            />
          </View>
        </View>
        <View>
          <Text style={styles.badgesEarnedHeading}>Badges Earned</Text>
        </View>
        <ScrollView style={styles.badgesSection} vertical={true}>
          <View style={styles.badgesContainer}>
            {[...Array(numRows)].map((_, rowIndex) => (
              <View key={rowIndex} style={styles.badgesEarnedRow}>
                {badgesEarnedData
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((badge, index) => (
                    <View key={index} style={styles.badgeBadge}>
                      <Image
                        source={badge.image}
                        style={styles.circularBadgeImage}
                      />
                      <Text style={styles.badgeText}>{badge.text}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        </ScrollView>
        <ScrollView style={styles.lessonsSection} horizontal={true}>
          {/* Add your circular widgets for lessons here */}
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isProfileModalVisible}
          onRequestClose={toggleProfileModal}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={toggleProfileModal}
          ></TouchableOpacity>

          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => console.log("Badges earned")}>
              <Text>Select Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // ... (Your existing styles)
  badgesEarnedRow: {
    flexDirection: "row",
    justifyContent: "center", // Center badges horizontally
    alignItems: "center", // Center badges vertically
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",

    // Set to transparent if you want the background image to be visible
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch" for different cover options
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginHorizontal: Platform.OS === "ios" ? 15 : 0,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2, // Add border width
    borderColor: "black",
  },
  questSection: {
    marginBottom: 20,
    marginLeft: Platform.OS === "ios" ? 16 : 0,
    marginRight: Platform.OS === "ios" ? 16 : 0,
  },
  questBox: {
    backgroundColor: "rgba(43, 88, 110, 1)",
    borderRadius: 10,
    padding: 25,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
  },
  questTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  questText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },
  startButton: {
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#747bdb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    marginTop: 40,
    marginLeft: Platform.OS === "ios" ? -250 : -210,
    alignSelf: "flex-end",
    marginBottom: -10,
  },
  startButtonText: {
    color: "#f7f7f7",
    fontWeight: "bold",
  },
  questImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginLeft: -40,
  },
  badgesSection: {
    flexDirection: "column",
    marginBottom: 20,
    marginHorizontal: Platform.OS === "ios" ? 16 : 0,
  },
  badgesEarnedHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  badgeBadge: {
    marginRight: 22,
    marginLeft: 22,
    alignItems: "center",
  },
  circularBadgeImage: {
    width: 80,
    height: 80,
    borderRadius: 0,
    marginBottom: 20,
  },
  badgeText: {
    textAlign: "center",
  },
  lessonsSection: {
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,

    justifyContent: "space-between",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15, // Set borderRadius to 0 for sharp corners
    elevation: 5,
    position: "absolute",
    top: 120,
    right: 11,
    transform: [{ translateY: 0 }, { translateX: -5 }],
    // Add border width
    // Add border color
  },
});
