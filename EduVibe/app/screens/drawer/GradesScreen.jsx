import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Appbar } from "react-native-paper";
import SetUpScreen from "../../MyGrades/screens/SetUpScreen";
import GradingSystemScreen from "../../MyGrades/screens/GradingSystemScreen";
import ExamWeightScreen from "../../MyGrades/screens/ExamWeightScreen";
import { useVisibility } from "../../../contexts/VisibilityContext";



const GradesScreen = ({ navigation }) => {
  const { isButtonVisible } = useVisibility();
  const { isCourseButtonVisible } = useVisibility();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Grades" />
        </Appbar.Header>
      </View>

    

     {isCourseButtonVisible ? (  <GradingSystemScreen/> 
     ) : (
     <ExamWeightScreen/> 

    )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: -45,
  },
  header: {
    height: 56,
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradesIcon: {
    height: "auto",
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default GradesScreen;