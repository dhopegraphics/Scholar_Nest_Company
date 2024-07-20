import React, { useCallback, useState, useContext, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DashboardStyles from '../../../themes/DashboardStyles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { getCourses } from '../../../lib/appwrite';
import Icon from "react-native-vector-icons/Ionicons";
import TeacherCourseCard from '../../../components/TeacherCourseCard';


const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]); // State to hold courses
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);


  const handleButtonPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text style={DashboardStyles.title}>Dashboard</Text>

          <View style={{ alignSelf: "center" }}>

            <View style={DashboardStyles.courseContainer}>
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
        <TouchableOpacity style={DashboardStyles.roundedButton} onPress={handleButtonPress}>
          <Ionicons name="chevron-back-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TeacherDashboard;
