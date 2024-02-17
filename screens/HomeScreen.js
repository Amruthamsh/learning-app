import {
  View,
  Text,
  SafeAreaView,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getuser = async () => {
      const user = FIREBASE_AUTH.currentUser;
      const db = getDatabase();
      const userData = ref(db, "users/" + user?.uid);
      onValue(userData, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    };
    getuser();
  }, []);

  return (
    <SafeAreaView>
      <Text>Right on Track!</Text>
      <Text>Welcome back {userData?.name}</Text>
      <Button
        title="Begin your journey with quests!"
        color="orange"
        onPress={() => navigation.navigate("Quests")}
      />
      <Text>Badges Earned: share on social media!</Text>
      <Text>Lessons Learnt:</Text>
      <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
    </SafeAreaView>
  );
}
