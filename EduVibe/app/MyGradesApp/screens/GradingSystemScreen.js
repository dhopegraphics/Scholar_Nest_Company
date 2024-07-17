import React, { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckBoxModal from "../components/CheckBoxModal";
import Screen from "../components/Screen";
import ActiveButton from "../components/ActiveButton";
import SettingsContainer from "../components/SettingsContainer";
import SettingsItem from "../components/SettingsItem";
import Collapsible from "react-native-collapsible";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";

export default function GradingSystemScreen() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const [gradeSystems, setGradeSystems] = useState([
    { id: 1, text: "Grades 1 to 6", checked: false },
    { id: 2, text: "Points 0 to 15", checked: false },
    // Add more items...
  ]);

  const [grade, setGrades] = useState({ text: "Grades 1 to 6" });

  return (
    <Screen>
      <Text style={styles.title}>Grading System</Text>
      <View style={styles.selector}>
        <View>
          <Text style={styles.currentGradingSystemText}>
            Current Grading System
          </Text>
          <AppText style={styles.grade}>{grade.text}</AppText>
        </View>
        <View>
          <ActiveButton
            icon="pencil"
            style={styles.button}
            size={20}
            onPress={() => setIsModalVisible(true)}
          />
        </View>
      </View>
      <CheckBoxModal
        visible={isModalVisible}
        onPress={() => setIsModalVisible(false)}
        title="Grading System"
        data={gradeSystems}
        setData={setGradeSystems}
        onSelectItem={(grade) => setGrades(grade)}
        closeModal={() => setIsModalVisible(false)}
      />
      <View style={styles.container}>
        <SettingsContainer>
          <SettingsItem title="Exam Weighting" />
          <SettingsItem title="Subject Weighting" />
        </SettingsContainer>
        <SettingsContainer>
          <SettingsItem
            title="Average Calculation"
            onPress={() => setIsCollapsed(!isCollapsed)}
            collapsibleActive={isCollapsed}
          />
          <Collapsible collapsed={isCollapsed}>
            <View>
              <View>
                <Text style={[defaultStyles.text, styles.subTitle]}>
                  Average per Subject:
                </Text>
                <Text style={defaultStyles.text}>
                  This is the description of how the average per subject is
                  calculated.
                </Text>
              </View>
              <View>
                <Text style={[defaultStyles.text, styles.subTitle]}>
                  Overall Average:
                </Text>
                <Text style={defaultStyles.text}>
                  This is the description of how the overall average is
                  calculated.
                </Text>
              </View>
            </View>
          </Collapsible>
        </SettingsContainer>
        <View>
          <ActiveButton
            icon="shape-outline"
            style={styles.nextButton}
            size={20}
            onPress={() => navigation.navigate("GradeSetUp")}
          />
        </View>
        <Text style={styles.setup}>SetUp Your Subject</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  selector: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  currentGradingSystemText: {
    color: "gray", // Set the color to gray
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
    fontWeight: "700",
    fontSize: 18,
    color: "#000", // Ensure the text color is visible
  },
  subTitle: {
    marginVertical: 10,
    fontWeight: "700",
  },
  nextButton: {
    width: 50,
    height: 50,
  },
  setup: {
    marginVertical: -35,
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 70,
  },
  settinsContainer: {
    backgroundColor: "#1C9C9D",
  },
});
