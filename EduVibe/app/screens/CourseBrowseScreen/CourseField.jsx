import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet , TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Video, ResizeMode } from 'expo-av';

const Tab = createMaterialTopTabNavigator();

const LecturesScreen = ({ course }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [status, setStatus] = useState({});
  const videoRef = useRef(null);

  const handleVideoPress = (videoUrl) => {
    setSelectedVideo(videoUrl);
    console.log(`Selected Video URL: ${videoUrl}`);
  };

  const handlePlayPause = () => {
    if (status.isPlaying) {
      console.log('Pausing video');
      videoRef.current.pauseAsync().catch(error => console.error('Pause Error:', error));
    } else {
      console.log('Playing video');
      videoRef.current.playAsync().catch(error => console.error('Play Error:', error));
    }
  };

  useEffect(() => {
    console.log('Playback Status:', status);
  }, [status]);

  return (
    <View>
      {course.videoHeader.map((header, index) => (
        <View key={index} style={styles.videoContainer}>
          <TouchableOpacity onPress={() => handleVideoPress(course.videos[index])}>
            <Text style={styles.videoHeader}>{header}</Text>
          </TouchableOpacity>
          {selectedVideo === course.videos[index] && (
            <View>
              <Video
                ref={videoRef}
                style={styles.video}
                source={{ uri: selectedVideo }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => {
                  console.log('Playback Status Update:', status);
                  setStatus(status);
                }}
                onError={(error) => console.error('Video Playback Error:', error)}
              />
              <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
                <Text style={styles.buttonText}>{status.isPlaying ? 'Pause' : 'Play'}</Text>
              </TouchableOpacity>
            </View>
          )}
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
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CourseField;
