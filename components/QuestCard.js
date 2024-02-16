import { View, Text, StyleSheet, Platform, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function QuestCard({
  name,
  image,
  type,
  difficulty,
  objectives,
  completion_status,
  points_earned,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View>
        <Text>{name}</Text>
        <Text>{type}</Text>
      </View>

      <Image
        style={styles.image}
        source={image}
        accessibilityLabel={`${name} quest`}
        resizeMode="contain"
      />
      <View style={styles.submitContainer}>
        <Text>Difficulty: {difficulty}</Text>
        {completion_status ? (
          <Text>{points_earned}</Text>
        ) : (
          <Button
            color={"orange"}
            title="Start Quest"
            onPress={() => navigation.navigate("Scanner")}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 16,
    marginBottom: 16,
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
