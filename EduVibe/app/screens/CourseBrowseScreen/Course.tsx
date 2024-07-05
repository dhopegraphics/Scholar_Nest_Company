// CourseDetails.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCourseContext } from '../../../contexts/useCourseContext';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Course = () => {
  const { course } = useCourseContext();
  if (!course) {
    return <Text>No course selected</Text>;
  }
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <><View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.creator}>Created by: {course.creator}</Text>

    </View><TouchableOpacity style={styles.roundedButton} onPress={handleButtonPress}>
        <Ionicons name="chevron-back-circle" size={24} color="white" />
      </TouchableOpacity>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  creator: {
    fontSize: 18,
    marginTop: 8,
  },
  roundedButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -25 }],
    backgroundColor: "#3b82f6", // Adjust the button color as needed
    width: 70,
    height: 50,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Course;
