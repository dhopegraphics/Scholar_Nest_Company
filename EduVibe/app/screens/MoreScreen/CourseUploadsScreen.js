import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { createCourse, getCurrentUser } from "../../../lib/appwrite";
import { ParticipantContext } from "../../../contexts/ParticipantContext";
import { Appbar } from "react-native-paper";
import imageExport from "../../../assets/images/imageExport";

const CourseUploadsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([{ title: "", url: "" }]); // Start with one empty video object
  const [resources, setResources] = useState("");
  const [courseAvatar, setCourseAvatar] = useState("");
  const [userId, setUserId] = useState(null);
  const { addCourse } = useContext(ParticipantContext);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user.$id); // Store the user ID in state
      } catch (error) {
        console.error("Failed to fetch user ID:", error.message);
      }
    };

    fetchUserId();
  }, []);

  const handleAddVideo = () => {
    setVideos([...videos, { title: "", url: "" }]);
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  const handleVideoChange = (text, index, field) => {
    const updatedVideos = videos.map((video, i) =>
      i === index ? { ...video, [field]: text } : video
    );
    setVideos(updatedVideos);
  };

  const handleCreateCourse = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is not available");
      }

      const courseData = {
        title,
        description,
        videos: videos.map((video) => video.url), // Ensure videos is an array of URLs
        resources,
        courseAvatar,
        videoHeader: videos.map((video) => video.title), // Extract video headers from videos array
        userId, // Add the user ID to the course data
      };

      const newCourse = await createCourse(courseData);
      console.log("Course created successfully:", newCourse);

      // Add the new course to the context
      await addCourse(newCourse);
    } catch (error) {
      console.error("Failed to create course:", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 50}
    >
      <View style={styles.fullview}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Appbar.Header style={styles.header}>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content title="Course Upload" />
            </Appbar.Header>
          </View>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter course title"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter course description"
          />

          <Text style={styles.label}>Videos</Text>
          {videos.map((video, index) => (
            <View key={index} style={styles.videoInputContainer}>
              <TextInput
                style={styles.input}
                value={video.title}
                onChangeText={(text) => handleVideoChange(text, index, "title")}
                placeholder={`Enter video title ${index + 1}`}
              />
              <TextInput
                style={styles.input}
                value={video.url}
                onChangeText={(text) => handleVideoChange(text, index, "url")}
                placeholder={`Enter video URL ${index + 1}`}
              />
              <TouchableOpacity
                onPress={() => handleRemoveVideo(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button
            style={styles.addButton}
            title="Add Another Video"
            onPress={handleAddVideo}
          />

          <Text style={styles.label}>Resources</Text>
          <TextInput
            style={styles.input}
            value={resources}
            onChangeText={setResources}
            placeholder="Enter course resources"
          />

          <Text style={styles.label}>Course Avatar URL</Text>
          <TextInput
            style={styles.input}
            value={courseAvatar}
            onChangeText={setCourseAvatar}
            placeholder="Enter course avatar URL"
          />

          <Button title="Create Course" onPress={handleCreateCourse} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    color: "white",
    flexGrow: 1,
  },
  backGroundImage: { flex: 1 },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    height: 56,
    paddingHorizontal: 0,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  headerContainer: {
    marginTop: -65,
    backgroundColor: "white",
  },
  label: {
    fontSize: 18,
    marginVertical: 15,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  videoInputContainer: {
    marginBottom: 20,
  },
  removeButton: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
  },
  removeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "blue",
    alignSelf: "center",
  },
  fullview: {
    backgroundColor: "white",
  },
});

export default CourseUploadsScreen;
