// import {
//   View,
//   Text,
//   SafeAreaView,
//   Button,
//   ActivityIndicator,
// } from "react-native";
// import { FIREBASE_AUTH } from "../FirebaseConfig";
// import { getDatabase, ref, onValue } from "firebase/database";
// import React, { useEffect, useState } from "react";

// export default function HomeScreen({ navigation }) {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const getuser = async () => {
//       const user = FIREBASE_AUTH.currentUser;
//       const db = getDatabase();
//       const userData = ref(db, "users/" + user?.uid);
//       onValue(userData, (snapshot) => {
//         const data = snapshot.val();
//         setUserData(data);
//       });
//     };
//     getuser();
//   }, []);

//   return (
//     <SafeAreaView>
//       <Text>Right on Track!</Text>
//       <Text>Welcome back {userData?.name}</Text>
//       <Button
//         title="Begin your journey with quests!"
//         color="orange"
//         onPress={() => navigation.navigate("Quests")}
//       />
//       <Text>Badges Earned: share on social media!</Text>
//       <Text>Skills Acquired:</Text>
//       <Text>Lessons Learnt:</Text>
//       <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
//     </SafeAreaView>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
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
    navigation.navigate('Quests');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greetingText}>
          👋 Hello {userData?.name}
        </Text>
        <TouchableOpacity onPress={toggleProfileModal}>
          <Image
            source={require("../assets/retro-cam.jpg")}
            style={styles.profileIcon}
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
            source={require("../assets/retro-cam.jpg")}
            style={styles.questImage}
          />
        </View>
      </View>
      <View style={styles.lessonsSection}>
        <Text>Lessons Learnt:</Text>
        {/* will add cards later */}
        {/* can use scroll methor or flatlist */}
      </View>
      <Modal
        animationType="slide"
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
              <Text>Badges Earned</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingRight: 16,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  questSection: {
    marginBottom: 20,
    marginLeft: Platform.OS === 'ios' ? 16 : 0, // Apply margin only for iOS
    marginRight: Platform.OS === 'ios' ? 16 : 0,
  },
  questBox: {
    backgroundColor: 'rgba(55, 140, 219, 0.60)',
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  questTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  questText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    marginLeft:-245,
    alignSelf: 'flex-end'
    ,
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  questImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: -40,
  },
  lessonsSection: {
    marginBottom: 20,
    fontSize: 20,        // Added fontSize
    fontWeight: 'bold', // Added fontWeight
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    top: 130.5, // Adjust the top value as needed to position the modal below the profile button
    right: 30,

  },
});







