import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
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
    try {
      setLoading(true);
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt = `
    Question: Detect the main item in the image. explain the complexity of its supply chain process in detail.
    OUTPUT:
    {
        "ItemName": ...,
        "Materials": explain the materials used,
        "Manufacturing": explain the different manufacturing processes,
        "Assembly": explain the assembly process,
        "Transport": explain the transportation process,
        "Distribution": explain the distribution process,
        "Usage": explain usage
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
      //console.log(text);

      setLoading(false);

      let startIndex = text.indexOf("{");
      let endIndex = text.lastIndexOf("}");
      if (startIndex !== -1 && endIndex !== -1) {
        let jsonString = text.substring(startIndex, endIndex + 1);
        console.log(jsonString);
        setOutput(JSON.parse(jsonString));
      } else {
        console.log("No JSON object found within curly braces");
        setOutput(text);
      }
    } catch (error) {
      console.error("Error Analyzing Image: ", error);
      alert("Error generating description from gemini");
    }
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

      {loading ? (
        <ActivityIndicator size="medium" color="#0000ff" /> // Activity indicator or custom loading text
      ) : (
        <ScrollView>
          {typeof textOutput === "string" ? (
            <Text>{textOutput}</Text>
          ) : (
            <View>
              <Text>ItemName: {textOutput?.ItemName}</Text>
              <Text>Materials: {textOutput?.Materials}</Text>
              <Text>Manufacturing: {textOutput?.Manufacturing}</Text>
              <Text>Assembly: {textOutput?.Assembly}</Text>
              <Text>Distribution: {textOutput?.Distribution}</Text>
              <Text>Usage: {textOutput?.Usage}</Text>
            </View>
          )}
        </ScrollView>
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
