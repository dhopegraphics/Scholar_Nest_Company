import CourseBrowseNestDrawer from "../navigation/CourseBrowseNestDrawer";
import MessagesNestDrawer from "../navigation/MessagesNestDrawer";
import More from "./More";
import Notifications from "./Notifications";
import * as React from "react";
import { useEffect , useState } from "react";
import { View, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import DifferentDrawerNavigator from "../navigation/DifferentDrawerNavigator";
import { useQuestionContext } from "../../contexts/QuestionContext";
import ParentDashboard from "../screens/ParentWards/ParentDashboard";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator(); // Temporary workaround with type assertion

const retrieveUserState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userState');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load user state from AsyncStorage", e);
  }
};

const Tab_Layout = () => {
  const { setAnswer, setEducator } = useQuestionContext();
  const { answer , educator } = useQuestionContext();

  useEffect(() => {
    const fetchUserState = async () => {
      const savedState = await retrieveUserState();
      if (savedState) {
        setAnswer(savedState.answer);
        setEducator(savedState.educator);
      }
    };
    fetchUserState();
  }, []);

  return (
    <>
 
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              paddingBottom: -5, // Adjust padding to ensure tabs are visible
              height: 45, // Adjust height as needed
            },

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
              } else if (route.name === "ParentDashboard") {
                iconName = focused ? "dashboard" : "dashboard";
              }
              // You can return any component that you like here!
              return <FontAwesome name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: "#1C9C9D",
            tabBarInactiveTintColor: "black",
          })}
        >
          {answer ? (
            <Tab.Screen
              name="DifferentDrawerNavigator"
              component={DifferentDrawerNavigator}
              options={{
                tabBarLabel: () => null,
                headerShown: false, // Hide header for Dashboard
              }}
            />
          ) : (
            <Tab.Screen
              name="ParentDashboard"
              component={ParentDashboard}
              options={{
                tabBarLabel: () => null,
                headerShown: false, // Hide header for Dashboard
              }}
            />
          )}
          {educator && (
            <Tab.Screen
              name="Courses"
              component={CourseBrowseNestDrawer}
              options={{
                tabBarLabel: () => null,
                headerShown: false, // Hide header for Courses
              }}
            />
          )}
          <Tab.Screen
            name="Messages"
            component={MessagesNestDrawer}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Messages
            }}
          />

          {answer && (
            <Tab.Screen
              name="Notifications"
              component={Notifications}
              options={{
                tabBarLabel: () => null,
                headerShown: false, // Hide header for Notifications
              }}
            />
          )}
          <Tab.Screen
            name="More"
            component={More}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for More
            }}
          />
        </Tab.Navigator>
    
    </>
  );
};

export default Tab_Layout;