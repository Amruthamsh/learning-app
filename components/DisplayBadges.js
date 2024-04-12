import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const getImageSource = (key) => {
  switch (key) {
    case "nutrient":
      return require("../assets/badges/nutrient.png");
    case "supply-chain":
      return require("../assets/badges/supply-chain.png");
    case "self-help":
      return require("../assets/badges/self-help.png");
    case "biopic":
      return require("../assets/badges/biopic.png");
    case "fantasy":
      return require("../assets/badges/fantasy.png");
    case "science-fiction":
      return require("../assets/badges/science-fiction.png");
    case "history":
      return require("../assets/badges/history.png");
    case "mystery":
      return require("../assets/badges/mystery.png");
    case "non-fiction":
      return require("../assets/badges/non-fiction.png");
    default:
      return require("../assets/badges/question_mark.png");
  }
};

const DisplayBadges = ({ userData }) => {
  const totalBadges =
    userData && userData.badges ? Object.entries(userData.badges).length : 0;
  const itemsToDisplay = totalBadges + (3 - (totalBadges % 3));

  // Helper function to create rows of badges
  const createRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items; i += itemsPerRow) {
      const rowItems = [];
      for (let j = i; j < i + itemsPerRow && j < items; j++) {
        rowItems.push(j);
      }
      rows.push(rowItems);
    }
    return rows;
  };

  const badgeRows = createRows(itemsToDisplay, 3); // Create rows with 3 items each

  return (
    <ScrollView>
      <View style={styles.badgesContainer}>
        {badgeRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.badgeRow}>
            {row.map((index) => {
              if (index < totalBadges) {
                const [key, value] = Object.entries(userData.badges)[index];
                const counterValue = value.counter;
                const imageSource = getImageSource(key);
                return (
                  <View key={index} style={styles.badgeBadge}>
                    <Image
                      source={imageSource}
                      style={styles.circularBadgeImage}
                    />
                    <Text style={styles.badgeText}>{counterValue}</Text>
                  </View>
                );
              } else {
                const imageSource = getImageSource("default");
                return (
                  <View key={index} style={styles.badgeBadge}>
                    <Image
                      source={imageSource}
                      style={styles.circularBadgeImage}
                    />
                  </View>
                );
              }
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  badgesContainer: {
    flexDirection: "column", // Align rows in a column
  },
  badgeRow: {
    flexDirection: "row", // Align badges in a row
    justifyContent: "center",
    marginBottom: 18,
  },
  badgeBadge: {
    marginHorizontal: 18,
    alignItems: "center",
  },
  circularBadgeImage: {
    width: 80,
    height: 80,
  },
  badgeText: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default DisplayBadges;
