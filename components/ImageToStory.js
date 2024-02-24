import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
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

  const [imageUri, setImageUri] = useState(null);
  const [textOutput, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questComplete, setQuestComplete] = useState(false);

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

  const generateDescription = async () => {
    try {
      setLoading(true);
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt = `
    Question: Detect the main item in the image. explain the complexity of its supply chain process in detail.
    Give the OUTPUT in JSON format as shown below:
    {
        "ItemName": ...,
        "Materials": explain the materials used,
        "Manufacturing": explain the different manufacturing processes,
        "Assembly": explain the assembly process,
        "Transport": explain the transportation process,
        "Distribution": explain the distribution process,
        "Usage": explain usage,
        "Dispose": explain how the item must be disposed off,
        "Career": {"career_name": unique career specific to this job or supply chain,"description": description of each career opportunities},
        {"career_name": unique career specific to this job or supply chain,"description": description of each career opportunities},
        {"career_name": unique career specific to this job or supply chain,"description": description of each career opportunities}
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
      setQuestComplete(true);

      setLoading(false);
    } catch (error) {
      console.log("Error Analyzing Image , try again ");
      alert("Error generating description from gemini");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Source to Shelf</Text>
      <ScrollView>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: Dimensions.get("window").width - 30, height: 300 }}
            resizeMode="contain"
          />
        )}
        {!questComplete && !questComplete && (
          <>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.text}>Choose an Image from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={camImage} style={styles.button}>
              <Text style={styles.text}>Choose an Image from Camera</Text>
            </TouchableOpacity>
          </>
        )}

        {imageUri && !questComplete && (
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
          <View>
            {typeof textOutput === "string" ? (
              <Text style={styles.description}>{textOutput}</Text>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: "center",
                    margin: 8,
                    marginTop: 15,
                  }}
                >
                  {textOutput?.ItemName}
                </Text>
                <Text style={styles.text}>Career Opportunities</Text>

                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/supply-chain/mats (2).png")}
                    style={styles.descriptionImage}
                  />
                  <Text style={styles.descriptionText}>
                    {textOutput?.Materials}
                  </Text>
                </View>

                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/supply-chain/manu.png")}
                    style={styles.descriptionImage}
                  />
                  <Text style={styles.descriptionText}>
                    {textOutput?.Manufacturing}
                  </Text>
                </View>

                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/supply-chain/assemble.png")}
                    style={styles.descriptionImage}
                  />
                  <Text style={styles.descriptionText}>
                    {textOutput?.Assembly}
                  </Text>
                </View>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/supply-chain/dist.png")}
                    style={styles.descriptionImage}
                  />
                  <Text style={styles.descriptionText}>
                    {textOutput?.Distribution}
                  </Text>
                </View>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/supply-chain/usage.png")}
                    style={styles.descriptionImage}
                  />
                  <Text style={styles.descriptionText}>
                    {textOutput?.Usage}
                  </Text>
                </View>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/supply-chain/dispose.png")}
                    style={styles.descriptionImage}
                  />
                  <Text style={styles.descriptionText}>
                    {textOutput?.Dispose}
                  </Text>
                </View>
                <Text style={styles.text}>Career Opportunities</Text>
                <View style={styles.descriptionCard}>
                  <Image
                    style={styles.descriptionImage}
                    source={require("../assets/supply-chain/career-job.png")}
                  />

                  <Text style={styles.descriptionText}>
                    {textOutput?.Career.map((career, index) => (
                      <Text key={index}>
                        {index + 1}. {career.career_name}: {career.description}
                        {"\n"} {"\n"}
                      </Text>
                    ))}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {questComplete && (
          <TouchableOpacity>
            <Text style={styles.text}>Finish quest and earn points!</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
    marginHorizontal: 30,
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
  description: {
    margin: 10,
  },
  descriptionImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    flexWrap: "wrap",
    resizeMode: "contain",
  },
  descriptionCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  descriptionText: {
    flex: 1,
  },
});
