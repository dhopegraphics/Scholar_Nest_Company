import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ActionSheet from "react-native-actionsheet";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClassCard from "./components/ClassCard";
import AnnouncementCard from "./components/AnnouncementCard";
import AssignmentCard from "./components/AssignmentCard";
import NewMaterialCard from "./components/NewMaterialCard";

export default function StreamRoom({ route }) {
  const { item } = route.params;
  const [comments, setComments] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);

  const actionSheetRef = useRef(null);

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment("");
      setShowCommentInput(false);
    }
  };

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const closeCommentInput = () => {
    setShowCommentInput(false);
  };

  const showActionSheet = (index) => {
    setSelectedCommentIndex(index);
    actionSheetRef.current.show();
  };

  const handleDeleteComment = () => {
    setComments(comments.filter((_, index) => index !== selectedCommentIndex));
    setSelectedCommentIndex(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 64}
    >
      <Header HeaderTitle={item.title} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ClassCard
          CourseTitle={item.title}
          Description={item.description}
          Lecturer={item.instructor}
        />
        <AnnouncementCard />
        <AssignmentCard
          title="Assignment 2"
          date="6 Nov"
          attachment="+ 1 attachment"
          onAddComment={toggleCommentInput}
        />
        <NewMaterialCard
          title="New material available"
          date="6 Nov"
          onAddComment={toggleCommentInput}
        />

        {showCommentInput && (
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment"
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity onPress={closeCommentInput}>
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Button title="Submit Comment" onPress={handleAddComment} />
          </View>
        )}

        {comments.map((comment, index) => (
          <TouchableOpacity
            key={index}
            onLongPress={() => showActionSheet(index)}
          >
            <View style={styles.commentContainer}>
              <Text>{comment}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer />

      <ActionSheet
        ref={actionSheetRef}
        title={"What would you like to do?"}
        options={["Delete Comment", "Cancel"]}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => {
          if (index === 0) {
            handleDeleteComment();
          }
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 90, // Adjust this value based on your tab bar height
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    margin: 10,
    borderRadius: 5,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    flex: 1,
    marginRight: 10,
  },
  commentContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
