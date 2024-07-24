import React, { useCallback, useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CourseCard } from '../../../components';
import DashboardStyles from '../../../themes/DashboardStyles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { getCourses, getUserJoinedCourses } from '../../../lib/appwrite';
import ClassRoomCard from '../../../components/ClassRoomCard';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from '../../../contexts/AuthContext';
import FinanceCard from '../../../components/FinanceCard';

const LearningSection = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuth(); // Get current user from AuthContext
  const [courses, setCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleButtonPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleClassPress = () => {
    navigation.navigate('ClassRoomHome');
  };

  const handleFinancePress = () => {
    navigation.navigate('FinanceTab');
  };

  const onRefresh = useCallback(async () => {
    console.log('Refreshing data...');
    setRefreshing(true);
    const fetchedCourses = await fetchCourses(); // Fetch courses and get the data
    console.log('Refetched courses:', fetchedCourses); // Log the fetched data
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchCourses(); // Fetch courses when component mounts and currentUser is defined
    }
  }, [currentUser]);

  const fetchCourses = async () => {
    try {
      const cachedCourses = await AsyncStorage.getItem('courses');
      let fetchedCourses = [];

      if (cachedCourses) {
        fetchedCourses = JSON.parse(cachedCourses);
      } else {
        const coursesData = await getCourses();
        const userJoinedCourses = await getUserJoinedCourses(currentUser.$id); // Use current user's ID
        const joinedCourseIds = userJoinedCourses.map(course => course.courseId);
        fetchedCourses = coursesData.filter(course => joinedCourseIds.includes(course.$id));
        await AsyncStorage.setItem('courses', JSON.stringify(fetchedCourses)); // Cache courses in AsyncStorage
      }

      setCourses(fetchedCourses); // Set the fetched courses in state
      return fetchedCourses; // Return fetched courses for logging
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={DashboardStyles.scrollContainerWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={DashboardStyles.scrollContainer}
            >
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course.$id} course={course} navigation={navigation} />
                ))
              ) : (
                <View style={DashboardStyles.centeredContainer}>
                  <Icon name="search" size={64} color="#888" />
                  <Text style={DashboardStyles.noResultsText}>No results</Text>
                </View>
              )}
            </ScrollView>
          </View>

          <View style={{ padding: 10 }}>
            <ClassRoomCard
              title={'ClassRoom'}
              onPress={handleClassPress}
              imageSource={{
                uri: 'https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-61229.jpg',
              }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <FinanceCard
              title={'Finance Management'}
              onPress={handleFinancePress}
              imageSource={{
                uri: 'https://www.wealthandfinance-news.com/wp-content/uploads/2021/07/Finance-technology.jpg',
              }}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={DashboardStyles.roundedButton}
          onPress={handleButtonPress}
        >
          <Ionicons name='chevron-back-circle' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LearningSection;
