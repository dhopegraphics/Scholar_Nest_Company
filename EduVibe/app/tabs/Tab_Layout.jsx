
import CourseBrowseNestDrawer from "../navigation/CourseBrowseNestDrawer";
import MessagesNestDrawer from "../navigation/MessagesNestDrawer";
import More from "./More";
import Notifications from "./Notifications";
import * as React from "react";
import { View, StatusBar } from "react-native";
import { BottomTabBarHeightContext, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import DifferentDrawerNavigator from "../navigation/DifferentDrawerNavigator";
import { useQuestionContext } from "../../contexts/QuestionContext";


const Tab = createBottomTabNavigator(); // Temporary workaround with type assertion

const Tab_Layout = () => {
  const { answer } = useQuestionContext();
  return (
    <>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarStyle: {height:60},
          
            tabBarIconStyle: {textAlignVertical: "center", textAlign:"center"},
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "DifferentDrawerNavigator") {
                iconName = focused ? "dashboard" : "dashboard";
                
                
              } else if (route.name === "Courses") {
                iconName = focused ? "book" : "book";
              } else if (route.name === "Messages") {
                iconName = focused ? "comments" :"comment"
                  
              } else if (route.name === "Notifications") {
                iconName = focused ? "bell" : "bell";
              } else if (route.name === "More") {
                iconName = focused ? "align-center" : "align-justify";
              }

              // You can return any component that you like here!
              
              return <FontAwesome name={iconName} size={25} color={color}  />;
             
            },
            tabBarActiveTintColor: "#009688",
            tabBarInactiveTintColor: "black",
          })}
          
        >
        {answer &&   <Tab.Screen
            name="DifferentDrawerNavigator"
            component={DifferentDrawerNavigator}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Dashboard
              tabBarIconStyle: {textAlignVertical: "center", textAlign:"center"}
             
            }}
          /> }
         <Tab.Screen
            name="Courses"
            component={CourseBrowseNestDrawer}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Courses
              tabBarIconStyle: { textAlign:"center"}
            }}
          /> 
          <Tab.Screen
            name="Messages"
            component={MessagesNestDrawer}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Messages
              
            }}
          />

{answer &&       <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
              tabBarLabel: () => null,
              headerShown: false, // Hide header for Notifications
            }}
          />}
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
