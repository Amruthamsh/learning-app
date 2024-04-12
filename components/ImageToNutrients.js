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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
const { GoogleGenerativeAI } = require("@google/generative-ai");
//import { GEMINI_API_KEY } from "@env";

import { useNavigation } from "@react-navigation/native";

import { earnBadge } from "./EarnBadge";

export default function ImageToNutrients() {
  const [imageUri, setImageUri] = useState(null);
  const [textOutput, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questComplete, setQuestComplete] = useState(false);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const navigation = useNavigation();

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
      Question: Detect the food item in the image. explain the various components of it in detail.
      Give the OUTPUT in JSON format as shown below:
      {
          "ItemName": ...,
          "Macro": explain in detail the Macro nutrients present in the food item. Dont create child JSON objects,
          "Micro": explain in detail the Micro nutrients present in the food item. Dont create child JSON objects,
          "Fiber": Give the fiber present in the food item. elaborate on the fiber content in this food item. Dont create child JSON objects,
          "Cal": Give the calorires with units present in the food item. elaborate on the calorires in this food item. If multiple items, give total calorie content. Dont create child JSON objects,
          "Ingredients": Explain in detail the ingredients present in the food item. Dont create child JSON objects,
          "Allergens": Explain in detail about the allergens present in the food item. Also give what medical conditions people should look out for before eating the food item. Dont create child JSON objects,
          "Sus": Explain in detail about the sustainiblity and environmental impact of the food item. Dont create child JSON objects,
          "Frequency": Explain in detail how frequent a person should eat the given food to keep a healthy diet. Dont create child JSON objects
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
      <Text style={styles.title}>Know Your Nutrients</Text>
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
                <Text style={{ fontWeight: "bold" }}>Ingredients</Text>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/nutrients/ing.png")}
                    style={styles.descriptionImage}
                  />

                  <Text style={styles.descriptionText}>
                    {textOutput?.Ingredients}
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold" }}>
                  Macronutrients Present
                </Text>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/nutrients/macro.png")}
                    style={styles.descriptionImage}
                  />

                  <Text style={styles.descriptionText}>
                    {textOutput?.Macro}
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold" }}>
                  Micronutrients Present
                </Text>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/nutrients/micro.png")}
                    style={styles.descriptionImage}
                  />

                  <Text style={styles.descriptionText}>
                    {textOutput?.Micro}
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold" }}>Fiber Content</Text>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/nutrients/fiber.png")}
                    style={styles.descriptionImage}
                  />

                  <Text style={styles.descriptionText}>
                    {textOutput?.Fiber}
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold" }}>Calorires</Text>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/nutrients/cal.png")}
                    style={styles.descriptionImage}
                  />

                  <Text style={styles.descriptionText}>{textOutput?.Cal}</Text>
                </View>

                <Text style={{ fontWeight: "bold" }}>Allergens</Text>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/nutrients/allergens.png")}
                    style={styles.descriptionImage}
                  />

                  <Text style={styles.descriptionText}>
                    {textOutput?.Allergens}
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold" }}>
                  Sustainiblity and Environmental Factors
                </Text>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/nutrients/sus.png")}
                    style={styles.descriptionImage}
                  />

                  <Text style={styles.descriptionText}>{textOutput?.Sus}</Text>
                </View>
                <Text style={{ fontWeight: "bold" }}>
                  Recommended frequency of Intake
                </Text>
                <View style={styles.descriptionCard}>
                  <Image
                    source={require("../assets/nutrients/intake.png")}
                    style={styles.descriptionImage}
                  />

                  <Text style={styles.descriptionText}>
                    {textOutput?.Frequency}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {questComplete && (
          <TouchableOpacity onPress={() => earnBadge("nutrient", navigation)}>
            <Text style={styles.text}>Finish quest and earn a badge!</Text>
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
