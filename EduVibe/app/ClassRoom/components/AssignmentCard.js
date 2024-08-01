import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Card, Avatar } from "react-native-elements";
import FileDownloadComponent from "./FileDownloadComponent";

export default function AssignmentCard({
  title,
  date,
  attachment,
  onAddComment,
}) {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Avatar
          rounded
          source={{ uri: "https://via.placeholder.com/80" }}
          size="medium"
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>Dr. Naeem Ullah</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.attachment}>{attachment}</Text>

      <FileDownloadComponent
        fileUrl="https://morth.nic.in/sites/default/files/dd12-13_0.pdf"
        fileName="file.pdf"
      />
      <Button title="Add class comment" onPress={onAddComment} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#6B7280",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  attachment: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});
