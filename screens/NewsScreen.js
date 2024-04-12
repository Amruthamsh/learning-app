import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  FlatList,
  ScrollView,
  Divider,
  Image,
  Spinner,
} from "native-base";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { newsServices } from "../components/CurrentAffairs";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function NewsScreen() {
  const [newsData, setNewsData] = useState([]);

  const catArray = [
    "business",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  useEffect(() => {
    const randomElement = catArray[Math.floor(Math.random() * catArray.length)];
    newsServices(randomElement)
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <ImageBackground
      source={require("../assets/back (3).png")} // Change the path accordingly
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <NativeBaseProvider>
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <View style={styles.newsContainer}>
                {item.urlToImage && (
                  <Image
                    style={{ width: 550, height: 250 }}
                    resizeMode={"contain"}
                    source={{ uri: item.urlToImage }}
                    alt="Image not Available"
                  />
                )}
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.publishedAt}</Text>
                <Text style={styles.newsDescription}>
                  {item.description}...
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </NativeBaseProvider>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch" for different cover options
    justifyContent: "center",
  },
  newsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "600",
  },
  newsDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  date: {
    fontSize: 14,
  },
  listContainer: {
    marginTop: 50,
  },
});
