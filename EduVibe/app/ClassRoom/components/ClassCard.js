import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

export default function ClassCard({ CourseTitle, Description, Lecturer }) {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{CourseTitle}</Text>
          <Text style={styles.subtitle}>{Description}</Text>
          <Text style={styles.name}>{Lecturer}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  name: {
    fontSize: 14,
    color: "black",
    fontWeight: "700",
  },
  image: {
    width: 80,
    height: 80,
  },
});
