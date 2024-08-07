import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useVisibility } from '../../../contexts/VisibilityContext';
import { useQuestionContext } from '../../../contexts/QuestionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserState = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save user state to AsyncStorage", e);
  }
};

const questions = [
  {
    question: 'Do you want set up your account up as',
    answers: ['Student', 'Educator', 'Parent'],
  },
  {
    question: 'Do You Want to Set Up The Username Of Your Wards',
    answers: ['Yes', 'Will Do it later'],
  },
  {
    question: 'Your Hobby',
    answers: ['Learn', 'Photography', 'Writing', 'Teach', 'Creativity'],
  },
  {
    question: 'Allow Students To Access Your Courses?',
    answers: ['Yes', 'No'],
  },
];

const SurveyScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [fadeAnim] = useState(new Animated.Value(1));
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setButtonVisible } = useVisibility(); // Import visibility context
  const {setCourseButtonVisible} = useVisibility();
  const {setAppSettingsVisible} = useVisibility();
  const { setAnswer } = useQuestionContext();
const {setEducator}  = useQuestionContext();
const {setShowDrawerItems} = useQuestionContext();

  useEffect(() => {
    setLoading(false);
  }, [currentQuestion]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswers(selectedAnswers => {
          const updatedAnswers = [...selectedAnswers];
          updatedAnswers[currentQuestion] = selectedAnswers[currentQuestion];
          return updatedAnswers;
        });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      setLoading(true); // Show loading indicator before navigating to "Back"
      navigation.navigate("Back");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestion(currentQuestion - 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleAnswerSelection = (index) => {
    let newState = {};
    
    if (currentQuestion === 0 && questions[currentQuestion].answers[index] === 'Student') {
      console.log('Student selected');
      setButtonVisible(false);
      setCourseButtonVisible (false);
      setAppSettingsVisible (true);
      setCurrentQuestion(2);
      setAnswer(!null);
      setEducator(!null);
      setShowDrawerItems(!null);
      newState = { role: 'Student', isButtonVisible: false, isCourseButtonVisible: false, isAppSettingsVisible: true, answer: !null, educator: !null, showDrawerItems: !null };
    } else if (currentQuestion === 0 && questions[currentQuestion].answers[index] === 'Educator') {
      console.log('Educator selected');
      setCurrentQuestion(3);
      setButtonVisible(false);
      setCourseButtonVisible (true);
      setAppSettingsVisible (true);
      setAnswer(!null);
      setEducator(null);
      setShowDrawerItems(null);
      newState = { role: 'Educator', isButtonVisible: false, isCourseButtonVisible: true, isAppSettingsVisible: true, answer: !null, educator: null, showDrawerItems: null };
    } else if (currentQuestion === 0 && questions[currentQuestion].answers[index] === 'Parent') {
      console.log('Parent selected');
      setCurrentQuestion(1);
      setButtonVisible(true);
      setCourseButtonVisible (false);
      setAppSettingsVisible (false);
      setAnswer(null);
      setEducator(null);
      setShowDrawerItems(null);
      newState = { role: 'Parent', isButtonVisible: true, isCourseButtonVisible: false, isAppSettingsVisible: false, answer: null, educator: null, showDrawerItems: null };
    } else if (currentQuestion === 1 && questions[currentQuestion].answers[index] === 'Yes') {
      console.log('Yes selected');
      setLoading(true); // Show loading indicator before navigating to "ParentWardSetUpScreen"
      setButtonVisible(true); // Show the button
      setCourseButtonVisible (false);
      setAppSettingsVisible (false);
      setAnswer(null);
      setShowDrawerItems(null);
      navigation.navigate("ParentWardSetUpScreen");
      newState = { role: 'Parent', isButtonVisible: true, isCourseButtonVisible: false, isAppSettingsVisible: false, answer: null, showDrawerItems: null };
    } else if (currentQuestion === 1 && questions[currentQuestion].answers[index] === 'Will Do it later') {
      console.log('Will Do it later selected');
      setLoading(true); // Show loading indicator before navigating to "Back"
      setButtonVisible(true); // Show the button
      setCourseButtonVisible (false);
      setAppSettingsVisible (false);
      setAnswer(null);
      setShowDrawerItems(null);
      navigation.navigate("Back");
      newState = { role: 'Parent', isButtonVisible: true, isCourseButtonVisible: false, isAppSettingsVisible: false, answer: null, showDrawerItems: null };
    } else if (currentQuestion === 3 && questions[currentQuestion].answers[index] === 'Yes') {
      console.log('Yes selected from 3');
      setLoading(true); // Show loading indicator before navigating to "Back"
      setButtonVisible(false); // Show the button
      setCourseButtonVisible (true);
      setAppSettingsVisible (true);
      setAnswer(!null);
      setEducator(null);
      setShowDrawerItems(!null);
      navigation.navigate("Back");
      newState = { role: 'Educator', isButtonVisible: false, isCourseButtonVisible: true, isAppSettingsVisible: true, answer: !null, educator: null, showDrawerItems: !null };
    } else if (currentQuestion === 3 && questions[currentQuestion].answers[index] === 'No') {
      console.log('No selected from 3');
      setLoading(true); // Show loading indicator before navigating to "Back"
      setButtonVisible(false); // Hide the button
      setCourseButtonVisible (true);
      setAppSettingsVisible (true);
      setAnswer(!null);
      setEducator(null);
      setShowDrawerItems(!null);
      navigation.navigate("Back");
      newState = { role: 'Educator', isButtonVisible: false, isCourseButtonVisible: true, isAppSettingsVisible: true, answer: !null, educator: null, showDrawerItems: !null };
    } else if (currentQuestion === 2 && questions[currentQuestion].answers[index] === 'Learn') {
      setLoading(true); // Show loading indicator before navigating to "Back"
      setButtonVisible(false); // Hide the button
      setCourseButtonVisible (false);
      setAppSettingsVisible (true);
      setAnswer(!null);
      setEducator(!null);
      setShowDrawerItems(!null);
      navigation.navigate("Back");
      newState = { role: 'Student', isButtonVisible: false, isCourseButtonVisible: false, isAppSettingsVisible: true, answer: !null, educator: !null, showDrawerItems: !null };
      
    }  else if (currentQuestion === 2 && questions[currentQuestion].answers[index] === 'Photography') {
      setLoading(true); // Show loading indicator before navigating to "Back"
      setButtonVisible(false); // Hide the button
      setCourseButtonVisible (false);
      setAppSettingsVisible (true);
      setAnswer(!null);
      setEducator(!null);
      setShowDrawerItems(!null);
      navigation.navigate("Back");
      newState = { role: 'Student', isButtonVisible: false, isCourseButtonVisible: false, isAppSettingsVisible: true, answer: !null, educator: !null, showDrawerItems: !null };
    }  else if (currentQuestion === 2 && questions[currentQuestion].answers[index] === 'Writing') {
      setLoading(true); // Show loading indicator before navigating to "Back"
      setButtonVisible(false); // Hide the button
      setCourseButtonVisible (false);
      setAppSettingsVisible (true);
      setAnswer(!null);
      setEducator(!null);
      setShowDrawerItems(!null);
      navigation.navigate("Back");
      newState = { role: 'Student', isButtonVisible: false, isCourseButtonVisible: false, isAppSettingsVisible: true, answer: !null, educator: !null, showDrawerItems: !null };
    }  else if (currentQuestion === 2 && questions[currentQuestion].answers[index] === 'Teach') {
      setLoading(true); // Show loading indicator before navigating to "Back"
      setButtonVisible(false); // Hide the button
      setCourseButtonVisible (false);
      setAppSettingsVisible (true);
      setAnswer(!null);
      setEducator(!null);
      setShowDrawerItems(!null);
      navigation.navigate("Back");
      newState = { role: 'Student', isButtonVisible: false, isCourseButtonVisible: false, isAppSettingsVisible: true, answer: !null, educator: !null, showDrawerItems: !null };
    }  else if (currentQuestion === 2 && questions[currentQuestion].answers[index] === 'Creativity') {
      setLoading(true); // Show loading indicator before navigating to "Back"
      setButtonVisible(false); // Hide the button
      setCourseButtonVisible (false);
      setAppSettingsVisible (true);
      setAnswer(!null);
      setEducator(!null);
      setShowDrawerItems(!null);
      navigation.navigate("Back");
      newState = { role: 'Student', isButtonVisible: false, isCourseButtonVisible: false, isAppSettingsVisible: true, answer: !null, educator: !null, showDrawerItems: !null };
    }  else {
      setLoading(true); // Show loading indicator before navigating to "Back"
      navigation.navigate("Back");
      setCourseButtonVisible (true);
      setAppSettingsVisible (true);
      setButtonVisible(true); 
      setAnswer(!null);
      setEducator(!null);
      setShowDrawerItems(!null);
      newState = { role: 'Other', isButtonVisible: true, isCourseButtonVisible: true, isAppSettingsVisible: true, answer: !null, educator: !null, showDrawerItems: !null };
    }

    setSelectedAnswers(selectedAnswers => {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentQuestion] = index;
      return updatedAnswers;
    });

    saveUserState('userState', newState);
  };

  const navigateToBackScreen = () => {
    setTimeout(() => { // Simulating a delay for demonstration purposes
      setLoading(false); // Hide loading indicator after delay
      navigation.navigate('Back');
    }, 2000); // Delay of 2 seconds
  };

  const progress = (currentQuestion + 1) / questions.length;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Let's Get Started</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>{questions[currentQuestion].question}</Text>
        <View style={styles.answersContainer}>
          {questions[currentQuestion].answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                selectedAnswers[currentQuestion] === index && styles.selectedAnswerButton,
              ]}
              onPress={() => handleAnswerSelection(index)}
            >
              <Text style={styles.answerText}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
        </View>
      )}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Icon name="send" size={30} color="white" />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 200,
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
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
    marginRight: 110,
    fontWeight: 'bold',
  },
  answersContainer: {
    width: '50%',
    marginBottom: 20,
    marginRight: 40,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  answerButton: {
    padding: 12,
    marginVertical: 10,
    borderRadius: 30,
    borderWidth: 1.5,
    alignItems: 'center',
    borderColor: '#1976d2',
  },
  selectedAnswerButton: {
    backgroundColor: '#90CAF9',
  },
  answerText: {
    fontSize: 18,
  },
  navigationButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    right: 35,
  },
  backButton: {
    padding: 15,
    borderRadius: 70,
    backgroundColor: '#1976d2',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  nextButton: {
    padding: 15,
    borderRadius: 70,
    backgroundColor: '#1976d2',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SurveyScreen;
