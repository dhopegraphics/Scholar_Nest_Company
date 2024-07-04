import React, { useCallback, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView } from "react-native";
import CourseCard from "../../components/CourseCard";
import { Ionicons } from '@expo/vector-icons';
import DashboardStyles from "../../themes/DashboardStyles";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handlePress = (title: string) => {
    console.log(`Pressed ${title}`);
    // Navigate to the course details or perform other actions
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
              <CourseCard
                title="Course Title 1"
                creator="Creator 1"
                onPress={() => handlePress("Course Title 1")}
              />
              <CourseCard
                title="Course Title 2"
                creator="Creator 2"
                onPress={() => handlePress("Course Title 2")}
              />
              <CourseCard
                title="Course Title 3"
                creator="Creator 3"
                onPress={() => handlePress("Course Title 3")}
              />
              <CourseCard
                title="Course Title 4"
                creator="Creator 4"
                onPress={() => handlePress("Course Title 4")}
              />
              <CourseCard
                title="Course Title 5"
                creator="Creator 5"
                onPress={() => handlePress("Course Title 5")}
              />
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity style={DashboardStyles.roundedButton} onPress={handleButtonPress}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
