import React, { useState } from "react";
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
    // Define subjects as before...
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null); // State for managing errors

  const TotalAverage = calculateTotalAverage(subjects);

  const handleFormSubmit = (values) => {
    try {
      console.log(values);
      // Handle form submission logic here
    } catch (err) {
      setError("An error occurred while submitting the form.");
      console.error(err);
    }
  };

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
                onPress={() => setModalVisible(false)}
              />
            </View>
            <AppForm
              initialValues={{
                grade: "",
                subject: null,
                examType: null,
                note: "",
              }}
              onSubmit={handleFormSubmit}
              validationSchema={validationSchema}
            >
              <AppFormPicker
                items={subjects} // Ensure this has the correct structure for the picker
                name="subject"
                placeholder="Select a subject"
              />
              <AppFormPicker
                items={[]} // Replace with your exam types
                name="examType"
                placeholder="Select an exam type"
              />
              <AppFormField
                name="grade"
                placeholder="Enter grade"
                keyboardType="numeric"
              />
              <AppFormField
                name="note"
                placeholder="Enter any notes"
              />
              <SubmitButton title="Submit" />
            </AppForm>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </Screen>
        </Modal>
        
        <View style={styles.list_container}>
          <AppText style={[styles.subTitle, styles.listTitle]}>
            Your Subjects
          </AppText>
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
            scrollEnabled
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
  buttonModal: {
    display: "flex",
    alignItems: "flex-end",
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
    color: "black",
  },
  Title: {
    fontWeight: "800",
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    paddingBottom: 20,
  },
  list_container: {
    backgroundColor: "#002366",
    borderRadius: 25,
    maxHeight: 450,
    padding: 10,
  },
  list: {
    padding: 10,
    color: "black",
  },
  listTitle: {
    paddingBottom: 10,
    color: "black",
  },
  errorContainer: {
    backgroundColor: "#FDD",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "#D8000C",
    fontSize: 16,
  },
});

export default HomeScreen;
