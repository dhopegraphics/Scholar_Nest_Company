import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { useState } from "react";
import SubjectItem from "../components/SubjectItem";
import ActiveButton from "../components/ActiveButton";
import AppFormPicker from "../components/forms/AppFormPicker";
import {
  calculateSubjectAverage,
  calculateTotalAverage,
} from "../hooks/calculateAverage";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  grade: Yup.string().required().max(1).label("Grade"),
  subject: Yup.object().required().label("Subject"),
  examType: Yup.object().required().label("Exam type"),
  note: Yup.string().label("Note"),
});

function HomeScreen() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Math",
      color: "blue",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 2,
      name: "German",
      color: "orange",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 3,
      name: "English",
      color: "green",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 4,
      name: "French",
      color: "blue",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 5,
      name: "Latin",
      color: "orange",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 6,
      name: "Spanish",
      color: "orange",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 7,
      name: "Physics",
      color: "orange",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 8,
      name: "Biology",
      color: "green",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 9,
      name: "Chemistry",
      color: "blue",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 10,
      name: "Geography",
      color: "brown",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 12,
      name: "History",
      color: "orange",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 13,
      name: "PE",
      color: "blue",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 14,
      name: "Music",
      color: "purple",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 15,
      name: "Art",
      color: "yellow",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 16,
      name: "Religion",
      color: "pink",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    {
      id: 17,
      name: "Ethics",
      color: "purple",
      checked: false,
      grades: [
        { id: 1, type: "Exam", value: 2 },
        { id: 2, type: "Quiz", value: 4 },
        { id: 3, type: "Oral Exam", value: 6 },
        { id: 4, type: "Exam", value: 2 },
      ],
    },
    // Add more items...
  ]);


  const [modalVisible, setModalVisible] = useState("false");

  const TotalAverage = calculateTotalAverage(subjects);

  return (
    <Screen>
      <Text style={styles.title}>Hello, </Text>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText style={styles.subTitle}>Your Grade Average</AppText>
          <Text style={styles.gradeText}>{TotalAverage}</Text>
        </View>
        
        <Modal visible={modalVisible} animationType="slide">
          <Screen>
            <View style={styles.buttonModal}>
              <ActiveButton
                icon="close"
                size={40}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
            <AppForm
              initialValues={{
                grade: "",
                subject: null,
                examType: null,
                note: "",
              }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}
            >
            </AppForm>
          </Screen>
        </Modal>
        <View style={styles.list_container}>
          <AppText style={[styles.subTitle, styles.listTitle]}>
           
          </AppText>
          <Text style = {styles.Title}>
          Your Subjects
          </Text>
          <FlatList
            style={styles.list}
            data={subjects}
            renderItem={({ item }) => {
              const averageGrade = calculateSubjectAverage(item.grades);
              return (
                <SubjectItem
                  title={item.name}
                  grade={averageGrade}
                  color={item.color}
                  bgColor="white"
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 70,
  },
  button_container: {
    maxWidth: 250,
    marginBottom: 20,
  },
  gradeText: {
    fontSize: 55,
    color: "black",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "700",
  },
  title: {
    fontSize: 45,
    color: "#002366",
    fontWeight: "700",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  subTitle: {
    fontWeight: "700",
    color : "black"
  },
  Title: {
    fontWeight: "800",
    color : "white",
    fontSize : 20,
   marginLeft : 10,
   paddingBottom : 20,
  },
  list_container: {
    backgroundColor: "#002366",
    borderRadius: 25,
    maxHeight: 450,
    padding: 10,
  },
  list: {
    padding: 10,
    color : "black",
  },
  listTitle: {
    paddingBottom: 10,
    color : "black",
  },
  buttonModal: {
    display: "flex",
    alignItems: "flex-end",
  },
  formfield_container: {
    marginTop: 20,
  },
  picker_container: {
    marginVertical: 20,
  },
  button: {
    marginVertical: 50,
  },
  header: {
    alignItems: "center",
  },
});

export default HomeScreen;
