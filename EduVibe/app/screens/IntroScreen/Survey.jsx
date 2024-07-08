import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";

const questions = [
  {
    question: 'Do you want set up your account up as',
    answers: ['Student', 'Educator', 'Parent' ],
  },
  {
    question: 'Welcome to Eduvibe',
    answers: ['Learner', 'Educator', ],
  },
  {
    question: 'Your Hobby',
    answers: ['Learn', 'Photography', 'Writing', 'Teaching', 'Creativity'],
  },
];

const SurveyScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigation = useNavigation();

  const handleNext = () => {
    if (selectedAnswer !== null) { // Check if an answer has been selected
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        navigation.replace('Back');
      }
    } else {
      // Handle case where no answer has been selected (show error, alert, etc.)
      alert('Please select an answer before moving to the next question.');
    }
  };

  const progress = (currentQuestion + 1) / questions.length;

  return (
    <View style={styles.container}>
       <Text style={styles.Text}>Lets Get Started</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.title}>{questions[currentQuestion].question}</Text>
      <View style={styles.answersContainer}>
        {questions[currentQuestion].answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === index && styles.selectedAnswerButton,
            ]}
            onPress={() => setSelectedAnswer(index)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
      <Icon name="send" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    paddingBottom : 200,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1976d2',
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
    marginRight : 110,
    fontWeight : 'bold'

  },
  answersContainer: {
    width: '50%',
    marginBottom: 20,
    marginRight : 40,
    alignSelf : "flex-start",
    marginLeft : 10,
   
  },
  answerButton: {
    padding: 12,
    marginVertical: 10,
    borderRadius: 30,
   borderWidth : 1.5,
    alignItems: 'center',
    borderColor : "#1976d2"
  },
  selectedAnswerButton: {
    backgroundColor: '#90CAF9',
  },
  answerText: {
    fontSize: 18,
  },
  nextButton: {
    position: 'absolute',
    bottom: 50,
    right: 35,
    padding: 15,
    borderRadius: 70,
    backgroundColor: '#1976d2',
    width : 70,
    height : 70,
    alignItems : 'center',
    alignContent : "center",
    justifyContent : 'center'
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  Text: {
    color: 'black',
    fontSize: 18,
    fontWeight : 'bold',
    marginBottom : 20,
    alignSelf : "flex-start"
  },
});

export default SurveyScreen;
