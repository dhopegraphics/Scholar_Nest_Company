// Dashboard.tsx
import React, { useCallback, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import CourseCard from '../../components/CourseCard';
import { Ionicons } from '@expo/vector-icons';
import DashboardStyles from '../../themes/DashboardStyles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useCourseContext } from '../../contexts/useCourseContext';

const Dashboard = () => {
  const navigation = useNavigation();
  const { setCourse } = useCourseContext();
  const [refreshing, setRefreshing] = useState(false);

  const handlePress = (course: { title: string; creator: string }) => {
    setCourse(course);
    navigation.navigate('CourseDetails');
  };

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

  return (
    <SafeAreaView style={DashboardStyles.safeArea}>
      <View style={DashboardStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={DashboardStyles.scrollViewContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text style={DashboardStyles.title}>Dashboard</Text>

          <View style={DashboardStyles.scrollContainerWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={DashboardStyles.scrollContainer}
            >
              {[
                { title: 'Course Title 1', creator: 'Creator 1' },
                { title: 'Course Title 2', creator: 'Creator 2' },
                { title: 'Course Title 3', creator: 'Creator 3' },
                { title: 'Course Title 4', creator: 'Creator 4' },
                { title: 'Course Title 5', creator: 'Creator 5' },
              ].map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  creator={course.creator}
                  onPress={() => handlePress(course)}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity style={DashboardStyles.roundedButton} onPress={handleButtonPress}>
          <Ionicons name="chevron-back-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
