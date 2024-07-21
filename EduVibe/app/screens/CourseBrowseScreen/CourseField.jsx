import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VideoPlayerHeader from './videoPlayerHeader';
import { useCourseHeader } from '../../../contexts/CourseHeaderContext';

const Tab = createMaterialTopTabNavigator();

const LecturesScreen = ({ course }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [status, setStatus] = useState({});
  const { setHeaderProps } = useCourseHeader();

  const handleVideoPress = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setHeaderProps({
      headerComponent: <VideoPlayerHeader videoUrl={videoUrl} onStatusUpdate={setStatus} />,
    });
  };

  return (
    <View>
      {course.videoHeader.map((header, index) => (
        <View key={index} style={styles.videoContainer}>
          <TouchableOpacity onPress={() => handleVideoPress(course.videos[index])}>
            <Text style={styles.videoHeader}>{header}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const DownloadsScreen = ({ course }) => (
  <View style={styles.center}>
    <Text style={styles.header}>No downloads yet</Text>
    <Text>Your downloaded lectures go here</Text>
  </View>
);

const MoreScreen = ({ course }) => (
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
  >
    <Tab.Screen name="Lectures">
      {props => <LecturesScreen {...props} course={course} />}
    </Tab.Screen>
    <Tab.Screen name="Downloads">
      {props => <DownloadsScreen {...props} course={course} />}
    </Tab.Screen>
    <Tab.Screen name="More">
      {props => <MoreScreen {...props} course={course} />}
    </Tab.Screen>
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
  videoContainer: {
    marginBottom: 20,
  },
  videoHeader: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default CourseField;
