import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const backgroundImage = require("../assets/back.png"); 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Sign in Failed: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.contentContainer}>
          <Text style={styles.heading}>Login</Text>
          <TextInput
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            value={password}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry={true}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={signIn}
                style={[styles.button, styles.loginButton]}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpace} />
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateProfile")}
                style={[styles.button, styles.createProfileButton]}
              >
                <Text style={styles.buttonText}>Create New Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", 
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    color: "#000000", 
  },
  input: {
    marginVertical: 8,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    opacity: 0.8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 4,
    flex: 1,
    opacity: 0.8, 
  },
  loginButton: {
    backgroundColor: "#007BFF",
  },
  createProfileButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
  },
  buttonSpace: {
    marginLeft: 8,
  },
});
