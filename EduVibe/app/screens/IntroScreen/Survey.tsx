import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

interface Question {
  id: number;
  text: string;
  answers: { id: number; text: string; icon: string }[];
}

const Survey: React.FC = () => {
  const navigation = useNavigation(); // Initialize navigation
  const questions: Question[] = [
    {
      id: 1,
      text: "Are You Student Or Teacher",
      answers: [
        { id: 1, text: "STUDENT", icon: "smile-o" },
        { id: 2, text: "TEACHER", icon: "meh-o" },
      ],
    },
    {
      id: 2,
      text: "",
      answers: [
        { id: 4, text: "Answer 1", icon: "thumbs-up" },
        { id: 5, text: "Answer 2", icon: "thumbs-down" },
        { id: 6, text: "Answer 3", icon: "hand-paper-o" },
      ],
    },
    // Add more questions as needed
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // State to hold selected answer id

  const handleAnswer = (answerId: number) => {
    setSelectedAnswer(answerId);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for next question
    } else {
      // Navigate to Tab_Layout after finishing the survey
      navigation.navigate("Tab_Layout");
    }
  };

  // Dynamically update the question text based on the selected answer of the first question
  if (currentQuestion === 1 && selectedAnswer !== null) {
    const selectedText = questions[0].answers.find(
      (answer) => answer.id === selectedAnswer
    )?.text;
    questions[1].text = `${selectedText} Answer`;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "blue" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.question}>
          {questions[currentQuestion].text}
        </Text>
        {questions[currentQuestion].answers.map((answer) => (
          <TouchableOpacity
            key={answer.id}
            style={[
              styles.answerButton,
              selectedAnswer === answer.id && styles.selectedAnswer,
            ]}
            onPress={() => handleAnswer(answer.id)}
          >
            <Icon
              name={answer.icon}
              size={20}
              color={selectedAnswer === answer.id ? "#ffffff" : "#000000"}
            />
            <Text style={{ marginLeft: 10 }}>{answer.text}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          disabled={selectedAnswer === null} // Disable button if no answer selected
        >
          <Text style={{ color: "#ffffff", marginRight: 10 }}>
            {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
          </Text>
          <Icon name="chevron-right" size={20} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "blue",
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    color: "#ffffff", // Text color for question
  },
  answerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedAnswer: {
    backgroundColor: "#007BFF", // Change color for selected answer
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default Survey;
