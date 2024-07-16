import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StreamRoom from './StreamRoom';
import PeopleParticipating from './PeopleParticipating';
import ClassWork from './ClassWork';
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function SubjectRoom({ route }) {
  const { item } = route.params; // Properly destructure item from route.params

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "StreamRoom") {
          iconName = focused ? "stack-overflow" : "stack-overflow";
        } else if (route.name === "ClassWork") {
          iconName = focused ? "street-view" : "street-view";
        } else if (route.name === "People") {
          iconName = focused ? "address-book" : "address-book-o";
        } 
        // You can return any component that you like here!
        return <FontAwesome name={iconName} size={24} color={color} />;
      },
      tabBarActiveTintColor: "#6200EE",
      tabBarInactiveTintColor: "black",
    })}
    >
      <Tab.Screen 
        name="StreamRoom" 
        component={StreamRoom} 
        initialParams={{ item }} // Pass item to StreamRoom
        options={{
          headerShown: false, // Hide header 
        }}

       
      />
      <Tab.Screen 
        name="ClassWork" 
        component={ClassWork} 
        initialParams={{ item }} // Pass item to ClassWork if needed
        options={{
         
          headerShown: false, // Hide header 
        }}
      />
      <Tab.Screen 
        name="People" 
        component={PeopleParticipating} 
        initialParams={{ item }} // Pass item to PeopleParticipating if needed
        options={{
         
          headerShown: false, // Hide header 
        }}
      />
    </Tab.Navigator>
  );
}
