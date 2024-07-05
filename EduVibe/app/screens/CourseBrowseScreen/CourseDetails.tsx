import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
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




export default CourseDetails;
