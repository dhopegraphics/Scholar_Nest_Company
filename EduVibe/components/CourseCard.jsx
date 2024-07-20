import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../contexts/UsersContext';

const CourseCard = ({ course }) => {
  const navigation = useNavigation();
  const { users } = useUsers();
  const [teacherName, setTeacherName] = useState('');

  useEffect(() => {
    const fetchTeacherName = () => {
      const user = users.find(user => user.id === course.userId);
      if (user) {
        setTeacherName(user.username);
      }
    };

    fetchTeacherName();
  }, [course.userId, users]);

  const handlePress = () => {
    navigation.navigate('Course_Information', { course });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: course.courseAvatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.userId}>Teacher: {teacherName}</Text>
          <Text style={styles.createdAt}>Created At: {new Date(course.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 16,
    width: 270,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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

export default CourseCard;
