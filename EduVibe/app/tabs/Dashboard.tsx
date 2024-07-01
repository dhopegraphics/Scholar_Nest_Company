import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import CourseCard from "../../components/CourseCard";

const Dashboard = () => {
  const handlePress = (title: string) => {
    console.log(`Pressed ${title}`);
    // Navigate to the course details or perform other actions
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.scrollContainerWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <CourseCard
            title="Course Title 1"
            creator="Creator 1"
            onPress={() => handlePress("Course Title 1")}
          />
          <CourseCard
            title="Course Title 2"
            creator="Creator 2"
            onPress={() => handlePress("Course Title 2")}
          />
          <CourseCard
            title="Course Title 3"
            creator="Creator 3"
            onPress={() => handlePress("Course Title 3")}
          />
          <CourseCard
            title="Course Title 4"
            creator="Creator 4"
            onPress={() => handlePress("Course Title 4")}
          />
          <CourseCard
            title="Course Title 5"
            creator="Creator 5"
            onPress={() => handlePress("Course Title 5")}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollContainerWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db", // Adjust the border color as needed
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f9fafb", // Background color inside the container
    height: 250, // Set the height of the container
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
