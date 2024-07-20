import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Course from './Course';
import ParticipantsTab from './ParticipantsTab';
import CourseCustomHeader from './CourseCustomHeader';
import { useCourseHeader } from '../../../contexts/CourseHeaderContext';

const Tab = createMaterialTopTabNavigator();

const CourseTopTabs = ({ navigation, route }) => {
  const { headerProps, setHeaderProps } = useCourseHeader();
  const { course } = route.params;

  const activeTab = getFocusedRouteNameFromRoute(route) ?? 'Course';

  useEffect(() => {
    setHeaderProps({
      activeTab,
      animateType: 'tab',
      course, 
      progressPercentage: 75, 
    });
  }, [activeTab, course, setHeaderProps]);

  return (
    <View style={styles.container}>
      <CourseCustomHeader {...headerProps} /> 
      <Tab.Navigator
        initialRouteName="Course"
        screenOptions={{
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        }}
      >
        <Tab.Screen name="Course">
          {props => <Course {...props} course={course} />}
        </Tab.Screen>
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

export default CourseTopTabs;
