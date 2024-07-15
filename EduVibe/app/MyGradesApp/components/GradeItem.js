import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppText from "./AppText";
import defaultStyles from "../config/styles";

function GradeItem({gradeValue, examType}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{examType}</Text>
      <Text style={[defaultStyles.text, styles.grade]}>{gradeValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#002366",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: "#FFD700",
    fontWeight: "600",
  },
  grade: {
    fontWeight: "700",
    fontSize: 18,
  },
});

export default GradeItem;
