// CourseDetails.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCourseContext } from '../../../contexts/useCourseContext';

const CourseDetails = () => {
  const { course } = useCourseContext();
  if (!course) {
    return <Text>No course selected</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.creator}>Created by: {course.creator}</Text>
      {/* Add more course details here */}
    </View>
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
});

export default CourseDetails;
