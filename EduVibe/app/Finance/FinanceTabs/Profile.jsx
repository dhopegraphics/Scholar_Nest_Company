import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import SchoolProfile from "../../screens/StudentsDashboard/SchoolProfile";


const ProfileSection = () => {
  return (
    <>
   <SchoolProfile/>
    </>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },
  text: {
    color: Colors.white,
  },
});
