import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, Platform } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import SettingsContainer from "../components/SettingsContainer";
import SettingsItem from "../components/SettingsItem";
import ActiveButton from "../components/ActiveButton";
import Collapsible from "react-native-collapsible";
import defaultStyles from "../config/styles";
import WeightItem from "../components/WeightItem";
import { useNavigation } from "@react-navigation/native";

export default function ExamWeightScreen() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleNavigation = () => {
    try {
      navigation.navigate("GradeHome");
    } catch (err) {
      setError("An error occurred while navigating to GradeHome.");
      console.error(err);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Grading System</Text>
      <View style={styles.selector}>
        <AppText style={styles.subTitle}>Exam Types</AppText>
        <ActiveButton
          icon="share-all"
          size={40}
          onPress={handleNavigation}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <SettingsContainer>
            <WeightItem
              title="Midsem Exam"
              weightNumber="1"
              percentage="30.00%"
            />
            <SettingsItem
              title="Attendance"
              fontSize={16}
              weight={true}
              weightNumber="1"
              fontWeight={400}
            />
            <SettingsItem
              title="Assignment"
              fontSize={16}
              weight={true}
              weightNumber="1"
              fontWeight={400}
            />
            <SettingsItem
              title="Quiz"
              fontSize={16}
              weight={true}
              weightNumber="1"
              fontWeight={400}
            />
            <SettingsItem
              title="Test"
              fontSize={16}
              weight={true}
              weightNumber="1"
              fontWeight={400}
            />
            <SettingsItem
              title="Presentation"
              fontSize={16}
              weight={true}
              weightNumber="1"
              fontWeight={400}
            />
          </SettingsContainer>
          <SettingsContainer>
            <WeightItem
              title="Minor Exam"
              weightNumber="1"
              percentage="50.00%"
            />
          </SettingsContainer>
        </View>
        <SettingsContainer>
          <SettingsItem
            title="Average Calculation"
            onPress={() => setIsCollapsed(!isCollapsed)}
            collapsibleActive={isCollapsed}
          />
          <Collapsible collapsed={isCollapsed}>
            <View>
              <View>
                <Text style={[defaultStyles.text, styles.HeadTitle]}>
                  Average per Subject:
                </Text>
                <Text style={[defaultStyles.text, styles.description]}>
                  This is the description of how the average per subject is
                  calculated.
                </Text>
              </View>
              <View>
                <Text style={[defaultStyles.text, styles.HeadTitle]}>
                  Overall Average:
                </Text>
                <Text style={[defaultStyles.text]}>
                  This is the description of how the overall average is
                  calculated.
                </Text>
              </View>
            </View>
          </Collapsible>
        </SettingsContainer>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  selector: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  container: {
    marginVertical: 30,
  },
  title: {
    fontSize: 36,
    color: "#F5B227",
    fontWeight: "700",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  grade: {
    fontWeight: 700,
  },
  subTitle: {
    marginVertical: 10,
    fontWeight: 700,
    color: "black",
  },
  HeadTitle: {
    marginVertical: 10,
    fontWeight: 700,
    color: "#FFD700",
  },
  description: {
    marginBottom: 10,
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
