import React, { useCallback, useState, useEffect } from 'react';
import { Text, View, ScrollView, RefreshControl, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardStyles from '../../../themes/DashboardStyles';
import { useNavigation } from '@react-navigation/native';
import { getCourses } from '../../../lib/appwrite';
import Icon from "react-native-vector-icons/Ionicons";
import TeacherCourseCard from '../../../components/TeacherCourseCard';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]); // State to hold courses
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCourses(); // Fetch courses on refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const storedCourses = await AsyncStorage.getItem('courses');
        if (storedCourses) {
          setCourses(JSON.parse(storedCourses));
        } else {
          fetchCourses();
        }
      } catch (error) {
        console.error('Failed to load courses from AsyncStorage:', error.message);
        fetchCourses(); // Fallback to fetching from API if AsyncStorage fails
      }
    };

    loadCourses(); // Load courses when component mounts
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesData = await getCourses(); // Fetch courses from API
      setCourses(coursesData); // Set courses in state

      // Store fetched courses in AsyncStorage
      await AsyncStorage.setItem('courses', JSON.stringify(coursesData));
    } catch (error) {
      console.error('Failed to fetch courses:', error.message);
    }
  };

  return (
    <SafeAreaView style={DashboardStyles.safeArea}>
      <View style={DashboardStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={DashboardStyles.scrollViewContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text style={DashboardStyles.title}>Dashboard</Text>

          <View style={{ alignSelf: "center" }}>
            <View style={[DashboardStyles.courseContainer, { margin: 10 }]}>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <TeacherCourseCard key={course.$id} course={course} navigation={navigation} />
                ))
              ) : (
                <View style={DashboardStyles.centeredContainer}>
                  <Icon name="search" size={64} color="#888" />
                  <Text style={DashboardStyles.noResultsText}>No results</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TeacherDashboard;
