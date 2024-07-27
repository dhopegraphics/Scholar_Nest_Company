import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from "@react-navigation/native";
import Course from "./Course";
import ParticipantsTab from "./ParticipantsTab";
import CourseCustomHeader from "./CourseCustomHeader";
import { useCourseHeader } from "../../../contexts/CourseHeaderContext";

const Tab = createMaterialTopTabNavigator();

const CourseTopTabs = ({ navigation, route }) => {
  const { headerProps, setHeaderProps } = useCourseHeader();
  const { course } = route.params;

  const activeTab = getFocusedRouteNameFromRoute(route) ?? "Course";

  useFocusEffect(
    React.useCallback(() => {
      // Reset headerComponent when the screen is focused
      setHeaderProps((prevProps) => ({
        ...prevProps,
        headerComponent: null,
      }));
    }, [setHeaderProps])
  );

  useEffect(() => {
    if (!headerProps.headerComponent) {
      setHeaderProps({
        activeTab,
        animateType: "tab",
        course,
        progressPercentage: 75,
        thumbnailImage: { uri: course.courseAvatar },
      });
    }
  }, [activeTab, course, headerProps.headerComponent, setHeaderProps]);

  return (
    <View style={styles.container}>
      {headerProps.headerComponent ? (
        headerProps.headerComponent
      ) : (
        <CourseCustomHeader {...headerProps} />
      )}
      <Tab.Navigator
        initialRouteName="Course"
        screenOptions={{
          tabBarActiveTintColor: "#1C9C9D",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        }}
      >
        <Tab.Screen name="Course">
          {(props) => <Course {...props} course={course} />}
        </Tab.Screen>
        <Tab.Screen name="Participants">
          {(props) => (
            <ParticipantsTab
              {...props}
              course={course}
              component={ParticipantsTab}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CourseTopTabs;
