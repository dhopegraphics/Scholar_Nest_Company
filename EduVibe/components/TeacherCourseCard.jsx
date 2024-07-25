import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../contexts/UsersContext'; // Adjust import path as needed
import ActionSheet from 'react-native-actionsheet';
import { deleteCourse } from '../lib/appwrite';
import { useQuestionContext } from '../contexts/QuestionContext'; // Adjust import path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';

const TeacherCourseCard = ({ course }) => {
  const navigation = useNavigation();
  const { users } = useUsers(); // Access the UsersContext
  const { educator } = useQuestionContext(); // Access the QuestionContext
  const [teacherName, setTeacherName] = useState('');
  const actionSheetRef = useRef();

  useEffect(() => {
    const fetchTeacherName = () => {
      const user = users.find(user => user.id === course.userId);
      if (user) {
        setTeacherName(user.username); // Use `username` from the context
      }
    };

    fetchTeacherName();
  }, [course.userId, users]); // Depend on `course.userId` and `users`

  useEffect(() => {
    const storeCourse = async () => {
      try {
        const courses = JSON.parse(await AsyncStorage.getItem('courses')) || [];
        const updatedCourses = courses.map(c => c.$id === course.$id ? course : c);
        if (!updatedCourses.some(c => c.$id === course.$id)) {
          updatedCourses.push(course);
        }
        await AsyncStorage.setItem('courses', JSON.stringify(updatedCourses));
      } catch (error) {
        console.error('Failed to store course in AsyncStorage:', error.message);
      }
    };

    storeCourse();
  }, [course]); // Store course data when it changes

  const handlePress = () => {
    navigation.navigate('CourseSchema', { course });
  };

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const handleActionSheetPress = async (index) => {
    if (index === 0) { // 'Yes' option
      try {
        await deleteCourse(course.$id);
        Alert.alert('Success', 'Course deleted successfully');
        
        // Update AsyncStorage after deletion
        const courses = JSON.parse(await AsyncStorage.getItem('courses')) || [];
        const updatedCourses = courses.filter(c => c.$id !== course.$id);
        await AsyncStorage.setItem('courses', JSON.stringify(updatedCourses));

        // Optionally, notify parent component or refresh data
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        {...(!educator && { onLongPress: showActionSheet })}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: course.courseAvatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.userId}>Teacher: {teacherName}</Text>
            <Text style={styles.createdAt}>Created At: {new Date(course.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        title={'Do you want to delete this course?'}
        options={['Yes', 'No']}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={handleActionSheetPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 16,
    width: 290,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    margin: 10,
  },
  avatar: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    fontSize: 14,
    color: '#555',
  },
  createdAt: {
    fontSize: 12,
    color: '#888',
  },
});

export default TeacherCourseCard;
