import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUsers } from '../../../contexts/UsersContext';
import { useQuestionContext } from '../../../contexts/QuestionContext';
import { useParticipants } from '../../../contexts/ParticipantContext';
import { useAuth } from '../../../contexts/AuthContext';

const CourseSchema = ({ route, navigation }) => {
  const { educator } = useQuestionContext();
  const { course } = route.params;
  const { users } = useUsers();
  const { joinCourse, hasJoinedCourse } = useParticipants();
  const { currentUser } = useAuth();
  const [teacherName, setTeacherName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [status, setStatus] = useState({});
  const [hasJoined, setHasJoined] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchTeacherName = () => {
      const user = users.find(user => user.id === course.userId);
      if (user) {
        setTeacherName(user.username);
        console.log(`Teacher Name: ${user.username}`);
      }
    };

    fetchTeacherName();
  }, [course.userId, users]);

  useEffect(() => {
    const checkUserEnrollment = async () => {
      if (currentUser) {
        try {
          const joined = await hasJoinedCourse(currentUser.$id, course.$id);
          setHasJoined(joined);
        } catch (error) {
          console.error('Failed to check user enrollment:', error.message);
          setHasJoined(false);
        }
      }
    };

    checkUserEnrollment();
  }, [currentUser, course.$id, hasJoinedCourse]);

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

  const handleJoinCourse = async () => {
    try {
      if (currentUser) {
        await joinCourse(currentUser.$id, course.$id);
        console.log('Navigating to Course_Information with course:', course);
        Alert.alert('Course Joined', 'You have successfully joined this course!', [
          {
            text: 'OK',
            onPress: () => {
              setHasJoined(true);
              navigation.navigate('Course_Information', { course });
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'User not logged in');
      }
    } catch (error) {
      console.error('Failed to join course:', error.message);
      Alert.alert('Error', 'Failed to join course');
    }
  };

  const saveCourseToAsyncStorage = async (courseData) => {
    try {
      await AsyncStorage.setItem(`course_${course.$id}`, JSON.stringify(courseData));
      console.log('Course data saved to AsyncStorage');
    } catch (error) {
      console.error('Failed to save course data to AsyncStorage:', error.message);
    }
  };

  const fetchCourseFromAsyncStorage = async () => {
    try {
      const storedCourse = await AsyncStorage.getItem(`course_${course.$id}`);
      if (storedCourse) {
        const courseData = JSON.parse(storedCourse);
        console.log('Course data retrieved from AsyncStorage:', courseData);
        return courseData;
      } else {
        console.log('No course data found in AsyncStorage');
        return null;
      }
    } catch (error) {
      console.error('Failed to retrieve course data from AsyncStorage:', error.message);
      return null;
    }
  };

  useEffect(() => {
    const loadCourseData = async () => {
      const courseData = await fetchCourseFromAsyncStorage();
      if (!courseData) {
        console.log('Fetching course data from API');
        try {
          // Replace with actual data fetching logic
          // Example: const fetchedCourseData = await fetchCourseDataFromAPI(course.$id);
          // Simulate API call with mock data
          const fetchedCourseData = { ...course }; // Mocked data
          await saveCourseToAsyncStorage(fetchedCourseData);
        } catch (error) {
          console.error('Failed to fetch or save course data:', error.message);
        }
      }
    };

    loadCourseData();
  }, [course.$id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.sectionHeader}>Lectures</Text>
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
      <Text style={styles.sectionHeader}>Resources</Text>
      <Text style={styles.resources}>{course.resources}</Text>
      <Text style={styles.sectionHeader}>Teacher</Text>
      <Text style={styles.userId}>{teacherName}</Text>
      <Text style={styles.sectionHeader}>Created At</Text>
      <Text style={styles.createdAt}>{new Date(course.createdAt).toLocaleDateString()}</Text>
      {educator && (
        <TouchableOpacity
          onPress={handleJoinCourse}
          style={[styles.joinButton, hasJoined && styles.joinedButton]}
          disabled={hasJoined}
        >
          <Text style={styles.joinButtonText}>{hasJoined ? 'Joined' : 'Join this Course'}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  videoContainer: {
    marginBottom: 10,
  },
  videoHeader: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  resources: {
    fontSize: 16,
    marginBottom: 20,
  },
  userId: {
    fontSize: 16,
    marginBottom: 20,
  },
  createdAt: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  joinButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
  },
  joinedButton: {
    backgroundColor: 'gray',
  },
});

export default CourseSchema;
