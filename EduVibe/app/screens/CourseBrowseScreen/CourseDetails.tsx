// CourseDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCourseContext } from '../../../contexts/useCourseContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Course from './Course';
import ParticipantsTab from './ParticipantsTab';

const Tab = createMaterialTopTabNavigator();


const CourseDetails = () => {
  const { course } = useCourseContext();
  if (!course) {
    return <Text>No course selected</Text>;
  }

  return (
    <Tab.Navigator>
    <Tab.Screen name="Course" component={Course} />
    <Tab.Screen name="Participants" component={ParticipantsTab} />
  </Tab.Navigator>
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
