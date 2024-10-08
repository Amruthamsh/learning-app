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
  StatusBar,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import DisplayBadges from "../components/DisplayBadges";

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

  return (
    <ImageBackground
      source={require("../assets/back (3).png")} // Change the path accordingly
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/questify.png")}
            style={{
              margin: 10,
              width: 170,
              height: 60,
            }}
          />
        </View>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleProfileModal}>
            <Image
              source={require("../assets/girl_w_pony.png")}
              style={styles.profileIcon}
              resizeMode="center"
            />
          </TouchableOpacity>
          <Text style={styles.greetingText}>Hello {userData?.name}!👋🏽</Text>
          <TouchableOpacity style={{ marginLeft: "auto" }}>
            <Image
              source={require("../assets/settings-icon.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.questSection}>
          <View style={styles.questBox}>
            <View style={styles.questTextContainer}>
              <Text style={styles.questText}>Begin Your{"\n"}Quest</Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartQuest}
              >
                <Text style={styles.startButtonText}>Start now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/logo_main.png")}
              style={styles.questImage}
            />
          </View>
        </View>
        <View>
          <Text style={styles.badgesEarnedHeading}>Badges Earned</Text>
        </View>
        <DisplayBadges userData={userData} />

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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // Set to transparent if you want the background image to be visible
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch" for different cover options
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: Platform.OS === "ios" ? 15 : 0,
  },
  greetingText: {
    fontSize: 22,
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
    marginHorizontal: Platform.OS === "ios" ? 16 : 0,
  },
  questBox: {
    backgroundColor: "rgba(43, 88, 110, 1)",
    borderRadius: 10,
    padding: 25,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
  },
  questTextContainer: {
    flex: 1,
  },
  questText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  startButton: {
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#747bdb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    marginTop: 30,
    marginRight: "auto",
  },
  startButtonText: {
    color: "#f7f7f7",
    fontWeight: "bold",
  },
  questImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
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
    top: 0,
    rleft: 0,
    transform: [{ translateY: 125 }, { translateX: 16 }],
    // Add border width
    // Add border color
  },
});
