import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";


const ProfileSection = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
      </View>
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
