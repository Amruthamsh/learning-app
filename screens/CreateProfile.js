import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";

export default function CreateProfile({}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    if (!name || !age || !email || !password) {
      alert("Incomplete Info");
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createProfile(response);
    } catch (error) {
      alert("Sign in Failed: " + error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (response) => {
    const db = getDatabase();
    set(ref(db, "users/" + response.user.uid), {
      name,
      age,
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text>Login</Text>
        <TextInput
          value={name}
          placeholder="Name"
          autoCapitalize="none"
          onChangeText={(text) => setName(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={age?.toString()}
          placeholder="Age"
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Create Account" onPress={signUp} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
