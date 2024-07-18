import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useUsers } from '../../../contexts/UsersContext';

const CourseSchema = ({ route }) => {
  const { course } = route.params;
  const { users } = useUsers(); // Access the UsersContext
  const [teacherName, setTeacherName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null); // State to keep track of the selected video
  const [status, setStatus] = useState({});
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchTeacherName = () => {
      const user = users.find(user => user.id === course.userId);
      if (user) {
        setTeacherName(user.username); // Use `username` from the context
        console.log(`Teacher Name: ${user.username}`); // Log the teacher's name
      }
    };

    fetchTeacherName();
  }, [course.userId, users]); // Depend on `course.userId` and `users`

  const handleVideoPress = (videoUrl) => {
    setSelectedVideo(videoUrl); // Set the selected video URL
    console.log(`Selected Video URL: ${videoUrl}`); // Log the selected video URL
  };

  const handlePlayPause = () => {
    if (status.isPlaying) {
      console.log('Pausing video'); // Log the pause action
      videoRef.current.pauseAsync().catch(error => console.error('Pause Error:', error));
    } else {
      console.log('Playing video'); // Log the play action
      videoRef.current.playAsync().catch(error => console.error('Play Error:', error));
    }
  };

  useEffect(() => {
    console.log('Playback Status:', status); // Log playback status changes
  }, [status]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.sectionHeader}>Videos</Text>
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
                onError={(error) => console.error('Video Playback Error:', error)} // Log video playback errors
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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
  resources: {
    fontSize: 14,
    color: '#555',
  },
  userId: {
    fontSize: 14,
    color: '#555',
  },
  createdAt: {
    fontSize: 14,
    color: '#555',
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

export default CourseSchema;
