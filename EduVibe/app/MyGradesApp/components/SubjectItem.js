import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./AppText";

function SubjectItem({ title, grade, color, bgColor, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]} onPress={onPress} >
      <View style={styles.title__container}>
        <View style={[styles.label, { backgroundColor: color }]}></View>
        <AppText style={[defaultStyles.text, styles.text]}>{title}</AppText>
      </View>
      <AppText style={[defaultStyles.text, styles.text]}>{grade}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#002395",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  title__container: {
    flexDirection: "row",
    columnGap: 10,
  },
  text: {
    fontWeight: 700,
    color : "black",
  },
  GradeText: {
    fontWeight: 700,
    color : "black",
  },
  label: {
    height: "auto",
    width: 7,
  },
});

export default SubjectItem;
