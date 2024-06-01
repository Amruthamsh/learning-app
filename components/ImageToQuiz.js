import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { useNavigation } from "@react-navigation/native";
import { GEMINI_API_KEY } from "@env";

export default function ImageToQuiz() {
  const [loading, setLoading] = useState(false);

  const [imageUri, setImageUri] = useState(null);
  const [textOutput, setOutput] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookConfirmed, confirmBook] = useState(false);

  const navigation = useNavigation();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.6,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const camImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.6,
        cameraType: "back",
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const generateQuizFromImage = async () => {
    try {
      setLoading(true);
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt = `
    Question: Detect the text in the image. Generate 5 to 10 thought provoking multiple choice questions from the given excerpt. 
         Let the output be in JSON format in the following structure:
         {
          "genre": select one value in the array of genres ["biopic","fantasy","history","mystery", "non-fiction","science-fiction","self-help"] most relevant to the given book,
        "output": [
        {
        "question": ...,
        "options": [],
        "answer": index of options
        },
        {
        "question": ...,
        "options": [],
        "answer": index of options
        }
        ],
        }`;
      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const image = {
        inlineData: {
          data: base64ImageData,
          mimeType: "image/png",
        },
      };

      const result = await model.generateContent([prompt, image]);

      const response = await result.response;
      const text = response.text();

      let startIndex = text.indexOf("{");
      let endIndex = text.lastIndexOf("}");
      if (startIndex !== -1 && endIndex !== -1) {
        let jsonString = text.substring(startIndex, endIndex + 1);
        console.log(jsonString);
        setOutput(JSON.parse(jsonString));
        navigation.navigate("QuizScreen", { jsonString });
      } else {
        console.log("No JSON object found within curly braces");
        setOutput(text);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error Analyzing Image , try again " + error);
      alert("Error generating description from gemini");
    }
  };

  const generateQuizFromBookName = async () => {
    try {
      setLoading(true);
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

      const prompt = `Generate a multiple choice quiz from the novel ${bookName} such that it contains 10 thought-provoking questions. 
      Let the output be in JSON format in the following structure:
        {
          "genre": select one value in the array of genres ["biopic","fantasy","history","mystery", "non-fiction","science-fiction","self-help"] most relevant to the given book,
        "output": [
        {
        "question": ...,
        "options": [],
        "answer": index of options
        },
        {
        "question": ...,
        "options": [],
        "answer": index of options
        }
        ],
        }`;

      const result = await model.generateContent([prompt]);
      const response = result.response;
      const text = response.text();

      console.log(text);

      let startIndex = text.indexOf("{");
      let endIndex = text.lastIndexOf("}");
      if (startIndex !== -1 && endIndex !== -1) {
        let jsonString = text.substring(startIndex, endIndex + 1);
        navigation.navigate("QuizScreen", { jsonString });
      } else {
        console.log("No JSON object found within curly braces");
        setOutput(text);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error creating quiz: ", error);
      alert("Error generating Quiz from gemini");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading Adventures</Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: Dimensions.get("window").width - 30,
            height: 300,
          }}
          resizeMode="contain"
        />
      )}

      {!bookConfirmed && (
        <>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.text}>Choose an Image from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={camImage} style={styles.button}>
            <Text style={styles.text}>Choose an Image from Camera</Text>
          </TouchableOpacity>
        </>
      )}

      {imageUri && (
        <TouchableOpacity
          disabled={loading} // Disable when loading is true
          onPress={generateQuizFromImage}
          style={styles.button}
        >
          <Text style={styles.text}>Analyze and Generate quiz</Text>
        </TouchableOpacity>
      )}

      {!imageUri && (
        <View>
          {!bookConfirmed && <Text style={styles.text}>or</Text>}
          <TextInput
            editable={!bookConfirmed}
            value={bookName}
            style={styles.button}
            placeholder="Enter a Book Name"
            onChangeText={(text) => setBookName(text)}
          ></TextInput>

          {bookConfirmed ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => confirmBook(false)}
            >
              <Text style={styles.text}>Change Book</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => confirmBook(true)}
            >
              <Text style={styles.text}>Confirm Book</Text>
            </TouchableOpacity>
          )}

          {bookConfirmed && (
            <TouchableOpacity
              style={styles.button}
              onPress={generateQuizFromBookName}
            >
              <Text style={styles.text}>Generate Quiz on the Book</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {loading && (
        <ActivityIndicator size="medium" color="#0000ff" /> // Activity indicator or custom loading text
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "brown",
  },
  button: {
    width: 275,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
