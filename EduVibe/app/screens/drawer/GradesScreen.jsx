import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Appbar } from "react-native-paper";
import GradingSystemScreen from "../../MyGradesApp/screens/GradingSystemScreen";
import ExamWeightScreen from "../../MyGradesApp/screens/ExamWeightScreen";
import { useVisibility } from "../../../contexts/VisibilityContext";

const GradesScreen = ({ navigation }) => {
  const { isButtonVisible, isCourseButtonVisible } = useVisibility();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Error handling for context or other potential issues
    try {
      // Assume fetchData or some initial setup might go here
    } catch (err) {
      setError("An error occurred while loading the grades screen.");
      console.error(err);
    }
  }, []);

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    try {
      return isCourseButtonVisible ? <GradingSystemScreen /> : <ExamWeightScreen />;
    } catch (err) {
      setError("An error occurred while rendering the content.");
      console.error(err);
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Grades" />
        </Appbar.Header>
      </View>
      {renderContent()}
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default GradesScreen;
