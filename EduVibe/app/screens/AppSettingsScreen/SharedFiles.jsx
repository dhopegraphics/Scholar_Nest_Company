import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SharedFiles = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({
    Current: true,
    Previous: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderItem = (title, date) => (
    <View style={styles.itemContainer}>
      <MaterialIcons name="insert-drive-file" size={36} color="#00796B" />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDate}>{date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection("Current")}
          >
            <Text style={styles.sectionTitle}>Current</Text>
            <Ionicons
              name={expandedSections.Ecosystems ? "chevron-up" : "chevron-down"}
              size={24}
              color="#00796B"
            />
          </TouchableOpacity>
          {expandedSections.Current && (
            <>
              {renderItem("Biome Project", "Posted Apr 13, 3:54 PM")}
              {renderItem(
                "Symbiosis Short Answer (Homework)",
                "Posted Apr 24, 2:22 PM"
              )}
              {renderItem("Food Chain Worksheet", "Posted Apr 17, 4:37 PM")}
            </>
          )}
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection("Previous")}
          >
            <Text style={styles.sectionTitle}>Previous</Text>
            <Ionicons
              name={expandedSections.Water ? "chevron-up" : "chevron-down"}
              size={24}
              color="#00796B"
            />
          </TouchableOpacity>
          {expandedSections.Previous && (
            <>
              {renderItem("Water Cycle Chart", "Posted Apr 17, 1:25 PM")}
              {renderItem(
                "Research Freshwater Invertebrates",
                "Posted Apr 17, 10:21 AM"
              )}
              {renderItem("Water Pollution Quiz", "Posted Apr 20, 3:12 PM")}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 56,
    backgroundColor: "#00796B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796B",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  itemTextContainer: {
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    color: "#000000",
  },
  itemDate: {
    fontSize: 14,
    color: "#808080",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#00796B",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Add shadow effect for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    fontSize: 24,
  },
});

export default SharedFiles;
