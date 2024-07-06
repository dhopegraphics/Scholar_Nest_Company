import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'; // Import getFocusedRouteNameFromRoute function
import Course from './Course';
import ParticipantsTab from './ParticipantsTab';
import CourseCustomHeader from './CourseCustomHeader';

const Tab = createMaterialTopTabNavigator();

const CourseDetails = ({ navigation, route }) => {
  const activeTab = getFocusedRouteNameFromRoute(route) ?? 'Participants'; // Get focused route name or default to 'Participants'

  return (
    <View style={styles.container}>
      <CourseCustomHeader activeTab={activeTab} />
      <Tab.Navigator
        initialRouteName="Participants"
        screenOptions={{
          activeTintColor: '#6200ee',
          inactiveTintColor: 'gray',
          labelStyle: { fontSize: 16, fontWeight: 'bold' },
        }}
      >
        <Tab.Screen name="Course" component={Course} />
        <Tab.Screen name="Participants" component={ParticipantsTab} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CourseDetails;
