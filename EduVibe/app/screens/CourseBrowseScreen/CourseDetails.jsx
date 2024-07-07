import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Course from './Course';
import ParticipantsTab from './ParticipantsTab';
import CourseCustomHeader from './CourseCustomHeader';
import { useCourseHeader } from '../../../contexts/CourseHeaderContext';

const Tab = createMaterialTopTabNavigator();

const CourseDetails = ({ navigation, route }) => {
  const { headerProps, setHeaderProps, scrollY } = useCourseHeader();
  const activeTab = getFocusedRouteNameFromRoute(route) ?? 'Participants';

  useEffect(() => {
    setHeaderProps({
      activeTab,
      animateType: 'tab',
    });
  }, [activeTab]);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: headerHeight }}>
        <CourseCustomHeader {...headerProps} />
      </Animated.View>
      <Tab.Navigator
        initialRouteName="Course"
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
