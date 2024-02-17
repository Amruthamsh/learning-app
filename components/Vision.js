import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const DetectText = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyALCba9aabUcsQ0xz_qJ4ziGaM67-o3BNs"
  );
  const [loading, setLoading] = useState(false);

  const [imageUri, setImageUri] = useState(null);
  const [textOutput, setOutput] = useState("");

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
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
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,

        quality: 1,
        cameraType: "back",
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!imageUri) {
        alert("Please select an image!");
        return;
      }

      const apiKey = "AIzaSyCBFfJzE6p4O0E3yJYpRCanbGC6LL8Z3L4";
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: "TEXT_DETECTION", maxResults: 5 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData);
      setOutput(apiResponse.data.responses[0].fullTextAnnotation.text);
      console.log(textOutput);
    } catch (error) {
      console.error("Error Analyzing Image: ", error);
      alert("Error analyzing image, please try again later");
    }
  };

  const generateQuiz = async () => {
    setLoading(true);
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      "Generate a 5 multiple choice questions from the given excerpt such that it is a combination of simple and thought-provoking questions";

    const result = await model.generateContent([textOutput, prompt]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cloud Vision Test</Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: Dimensions.get("window").width - 30, height: 300 }}
          resizeMode="contain"
        />
      )}
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.text}>Choose an Image from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={camImage} style={styles.button}>
        <Text style={styles.text}>Choose an Image from Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.text}>Analyze</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={loading} // Disable when loading is true
        onPress={generateQuiz}
        style={styles.button}
      >
        <Text style={styles.text}>Generate Quiz</Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator size="medium" color="#0000ff" /> // Activity indicator or custom loading text
      )}
    </View>
  );
};
export default DetectText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
