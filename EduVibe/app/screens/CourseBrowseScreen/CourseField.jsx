import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const LecturesScreen = ({ course }) => (
  <View>
    <Text>LecturesScreen</Text>
    <Text>{course.title}</Text>
    <Text>{course.description}</Text>
  </View>
);

const DownloadsScreen = () => (
  <View style={styles.center}>
    <Text style={styles.header}>No downloads yet</Text>
    <Text>Your downloaded lectures go here</Text>
  </View>
);

const MoreScreen = () => (
  <View>
    <Text>No Content</Text>
  </View>
);

const CourseField = ({ course }) => (
  <Tab.Navigator
    initialRouteName="Lectures"
    screenOptions={{
      tabBarLabelStyle: { fontSize: 16 },
      tabBarStyle: { backgroundColor: '#f5f5f5' },
      tabBarIndicatorStyle: { backgroundColor: '#3b82f6' },
      tabBarActiveTintColor: '#3b82f6',
      tabBarInactiveTintColor: 'gray',
      tabBarShowIcon: false,
      tabBarShowLabel: true,
    }}
    tabBarPosition="top"
    swipeEnabled
  >
    <Tab.Screen name="Lectures">
      {props => <LecturesScreen {...props} course={course} />}
    </Tab.Screen>
    <Tab.Screen name="Downloads" component={DownloadsScreen} />
    <Tab.Screen name="More" component={MoreScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default CourseField;
