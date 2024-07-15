import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import GradeItem from "./GradeItem";
import defaultStyles from "../config/styles";

function SubjectDetails({ subject, grade, gradeValue, grades }) {
  return (
    <>
      <View style={styles.header}>
        <Text style={[defaultStyles.text, styles.text]}>{subject}</Text>
        <Text style={[defaultStyles.text, styles.text]}>{grade}</Text>
      </View>
      <View style={styles.container}>
        <Text style={[defaultStyles.text, styles.subHeading]}>Exams</Text>
        <FlatList 
          data={grades}
          renderItem={({item}) => {
            return(
          <GradeItem gradeValue={item.value} examType={item.type} />)}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#002395",
    minHeight: 500,
    borderRadius: 25,
    padding: 25,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  text: {
    fontWeight: "900",
    fontSize: 21,
  },
  subHeading: {
    marginBottom: 10,
    fontWeight: 700,
    textDecorationLine: "underline",
  },
});

export default SubjectDetails;
