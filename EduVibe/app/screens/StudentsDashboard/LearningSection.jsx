import React, { useCallback, useState, useContext , useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { CourseCard } from '../../../components';
import DashboardStyles from '../../../themes/DashboardStyles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { getCourses } from '../../../lib/appwrite';
import ClassRoomCard from '../../../components/ClassRoomCard';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";

const LearningSection = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]); // State to hold courses
  const [refreshing, setRefreshing] = useState(false);
 

  const handleButtonPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleClassPress = () => {
    navigation.navigate('ClassRoomHome');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchCourses(); // Fetch courses when component mounts
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesData = await getCourses(); // Fetch courses from API
      setCourses(coursesData); // Set courses in state
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