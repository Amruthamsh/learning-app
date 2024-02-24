import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

export default function QuizScreen({ route, navigation }) {
  const { jsonString } = route.params;
  const questions = JSON.parse(jsonString);
  /*
  ---------FOR TESTING--------
  const questions = {
    output: [
      {
        question:
          "According to the excerpt, what is the primary purpose of art?",
        options: [
          "To provide an escape from reality",
          "To provoke thought and challenge perspectives",
          "To celebrate beauty and harmony",
          "To document historical events",
        ],
        answer: 1,
      },
      {
        question: "The author suggests that art can impact society by:",
        options: [
          "Promoting empathy and understanding",
          "Challenging social norms and injustice",
          "Providing a voice to the marginalized",
          "All of the above",
        ],
        answer: 3,
      },
      {
        question:
          "Which of the following is NOT a characteristic of transformative art?",
        options: [
          "It challenges societal structures",
          "It prompts personal growth",
          "It is focused on beauty alone",
          "It sparks dialogue and reflection",
        ],
        answer: 2,
      },
      {
        question: "The author argues that art is essential because:",
        options: [
          "It enhances our cognitive abilities",
          "It connects us to our emotions and experiences",
          "It fosters creativity and imagination",
          "All of the above",
        ],
        answer: 3,
      },
      {
        question:
          "What does the excerpt imply about the relationship between art and technology?",
        options: [
          "Technology has largely replaced art",
          "Technology can be a powerful tool for artistic expression",
          "Technology is irrelevant to the true purpose of art",
          "Art is inherently incompatible with technology",
        ],
        answer: 1,
      },
      {
        question:
          "Which of the following is a key theme explored in the excerpt?",
        options: [
          "The transformative power of art",
          "The importance of artistic freedom",
          "The role of art in preserving cultural heritage",
          "The decline of art in modern society",
        ],
        answer: 0,
      },
    ],
  };
*/

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions.output[currentQuestionIndex];
  const [hasFinishedQuiz, setFinishedQuiz] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.output.length).fill(null)
  );

  const handleNextQuestion = () => {
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    // Move to the previous question
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const calculateScore = () => {
    let score = 0;
    selectedOptions.forEach((selectedOption, index) => {
      if (selectedOption === questions.output[index].answer) {
        score++;
      }
    });
    return score;
  };

  const retryQuiz = () => {
    console.log("Retry");
    setSelectedOptions(Array(questions.output.length).fill(null));
    setCurrentQuestionIndex(0);
  };

  const finishQuiz = async () => {
    console.log("Finish");
    setFinishedQuiz(true);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    Alert.alert(
      "Quiz Result",
      `Your score is ${score}/${questions.output.length}`,
      [
        { text: "Retry", onPress: retryQuiz },
        { text: "Finish", onPress: finishQuiz },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../assets/back-light2.png")} // Change the path accordingly
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
          marginHorizontal: Platform.OS === "ios" ? 16 : 0,
        }}
      >
        <Text style={{ fontSize: 30, marginVertical: 20 }}>Quiz</Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </Text>
        {currentQuestion.options.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            disabled={hasFinishedQuiz}
            onPress={() => handleOptionSelect(optionIndex)}
            style={{
              backgroundColor: hasFinishedQuiz
                ? optionIndex === currentQuestion.answer
                  ? "lightgreen"
                  : selectedOptions[currentQuestionIndex] === optionIndex
                  ? "red"
                  : "white"
                : selectedOptions[currentQuestionIndex] === optionIndex
                ? "#6369D1"
                : "white",
              padding: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color:
                  selectedOptions[currentQuestionIndex] === optionIndex
                    ? "white"
                    : "black",
                fontSize: 15,
              }}
            >
              {String.fromCharCode(97 + optionIndex)}. {option}
            </Text>
          </TouchableOpacity>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Text
              style={{ color: currentQuestionIndex === 0 ? "gray" : "blue" }}
            >
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNextQuestion}
            disabled={currentQuestionIndex === questions.output.length - 1}
          >
            <Text
              style={{
                color:
                  currentQuestionIndex === questions.output.length - 1
                    ? "gray"
                    : "blue",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>

        {selectedOptions.every((option) => option !== null) &&
          !hasFinishedQuiz && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                margin: 20,
              }}
            >
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={{ fontSize: 20 }}>Submit!</Text>
              </TouchableOpacity>
            </View>
          )}

        {hasFinishedQuiz && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              margin: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Quests")}>
              <Text style={{ fontSize: 20 }}>Return to quests!</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch" for different cover options
    justifyContent: "center",
  },
});
