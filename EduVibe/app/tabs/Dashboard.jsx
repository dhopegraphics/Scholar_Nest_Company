import React from "react";
import { Text , StyleSheet } from "react-native";
import LearningSection from "../screens/StudentsDashboard/LearningSection";
import JobSearchSection from "../screens/StudentsDashboard/JobSearchSection";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const Dashboard = () => {
  return (
    <>
      <Text style={styles.container}>Dashboard</Text>
      <Tab.Navigator>
        <Tab.Screen name="Learning" component={LearningSection} />
        <Tab.Screen name="JobSearch" component={JobSearchSection} />
      </Tab.Navigator>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
 padding : 20,
 backgroundColor : "white",
 fontSize : 20,
 fontWeight : "600",
  },
});

export default Dashboard;
