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

export default function ImageToStory() {
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

  const generateDescription = async () => {
    setLoading(true);
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = `
    Question: Detect the main item in the image. explain to a 15 year old the complexity of its supply chain process in detail by dividing the answer into 6 sections.
    Let the output be in JSON format in the following structure:
    {
        "RawMaterials": ...,
        "Manufacturing": ...,
        "Assembly": ...,
        "Transport": ...,
        "Distribution": ...
        "Usage": ...
    }
    `;

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

      {imageUri && (
        <TouchableOpacity
          disabled={loading} // Disable when loading is true
          onPress={generateDescription}
          style={styles.button}
        >
          <Text style={styles.text}>Generate Description</Text>
        </TouchableOpacity>
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
