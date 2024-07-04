import CoursesBrowse from "./CoursesBrowse";
import Messages from "./Messages";
import More from "./More";
import Notifications from "./Notifications";
import * as React from "react";
import { View, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import DifferentDrawerNavigator from "../navigation/DifferentDrawerNavigator";

const Tab = createBottomTabNavigator(); // Temporary workaround with type assertion

const Tab_Layout = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="black" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "DifferentDrawerNavigator") {
                iconName = focused ? "dashboard" : "dashboard";
              } else if (route.name === "Courses") {
                iconName = focused ? "book" : "book";
              } else if (route.name === "Messages") {
                iconName = focused ? "snapchat" : "snapchat";
              } else if (route.name === "Notifications") {
                iconName = focused ? "bell" : "bell-o";
              } else if (route.name === "More") {
                iconName = focused ? "align-center" : "align-justify";
              }

              // You can return any component that you like here!
              return <FontAwesome name={iconName} size={20} color={color} />;
            },
            tabBarActiveTintColor: "#6200EE",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="DifferentDrawerNavigator"
            component={DifferentDrawerNavigator}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Dashboard
            }}
          />
          <Tab.Screen
            name="Courses"
            component={CoursesBrowse}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Courses
            }}
          />
          <Tab.Screen
            name="Messages"
            component={Messages}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Messages
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Notifications
            }}
          />
          <Tab.Screen
            name="More"
            component={More}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for More
            }}
          />
        </Tab.Navigator>
      </View>
    </>
  );
};

export default Tab_Layout;
