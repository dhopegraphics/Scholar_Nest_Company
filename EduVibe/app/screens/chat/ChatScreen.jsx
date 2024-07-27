import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionSheet from "react-native-actionsheet";
import { useNavigation } from "@react-navigation/native";
import { sendMessage, getMessages, getCurrentUser } from "../../../lib/appwrite";
import { appwriteConfig } from "../../../lib/appwrite";
import { Client, Databases, Query } from 'appwrite';

// Initialize Appwrite Client
const client = new Client();
client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);
const databases = new Databases(client);

const ChatScreen = ({ contact }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const flatListRef = useRef(null);
  const actionSheetRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.$id) {
          setCurrentUserId(user.$id);
        } else {
          throw new Error("Invalid user ID");
        }

        console.log("Fetching messages for user:", user.$id, "and contact:", contact.id);

        const messages = await getMessages(user.$id, contact.id);
        setMessages(messages);

        // Subscribe to message creation and updates
        const unsubscribe = client.subscribe(
          `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messagesCollectionId}.documents`,
          (response) => {
            const event = response.events[0];
            if (event.includes("create") || event.includes("update")) {
              if (
                (response.payload.senderId === user.$id && response.payload.receiverId === contact.id) ||
                (response.payload.senderId === contact.id && response.payload.receiverId === user.$id)
              ) {
                setMessages((prevMessages) => {
                  const updatedMessages = [...prevMessages];
                  const existingMessageIndex = updatedMessages.findIndex(msg => msg.$id === response.payload.$id);
                  if (existingMessageIndex > -1) {
                    updatedMessages[existingMessageIndex] = response.payload;
                  } else {
                    updatedMessages.unshift(response.payload);
                  }
                  return updatedMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                });
              }
            }
          }
        );

        // Cleanup subscription on component unmount
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing chat:", error.message);
      }
    };

    initializeChat();
  }, [contact]);

  const saveMessage = async () => {
    if (inputText.trim().length > 0) {
      if (isEditing) {
        // Edit existing message
        const updatedMessages = messages.map((msg) =>
          msg.$id === editingMessage.$id ? { ...msg, content: inputText } : msg
        );
        setMessages(updatedMessages);
        setIsEditing(false);
        setEditingMessage(null);
      } else {
        // Add new message
        if (currentUserId) {
          try {
            const newMessage = await sendMessage(currentUserId, contact.id, inputText);
            setMessages((prevMessages) => [newMessage, ...prevMessages]);
          } catch (error) {
            console.error("Error sending message:", error.message);
          }
        } else {
          console.error("Error: currentUserId is not valid.");
        }
      }
      setInputText("");

      // Scroll to the end of the list after adding a new message
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const handleLongPress = (message) => {
    setSelectedMessage(message);
    actionSheetRef.current.show();
  };

  const handleActionSheet = (index) => {
    switch (index) {
      case 0: // Reply
        setInputText(`@${selectedMessage.$id}: `);
        break;
      case 1: // Forward
        Alert.alert("Forward", `Forward message: ${selectedMessage.content}`);
        break;
      case 2: // Edit
        handleEdit(selectedMessage);
        break;
      case 3: // Delete
        deleteMessage(selectedMessage.$id);
        break;
      default:
        break;
    }
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setInputText(message.content);
    setIsEditing(true);
  };

  const deleteMessage = async (messageId) => {
    const updatedMessages = messages.filter((msg) => msg.$id !== messageId);
    setMessages(updatedMessages);

    // Update the message storage here if needed
    try {
      await AsyncStorage.setItem(
        `messages_${contact.id}`,
        JSON.stringify(updatedMessages)
      );
    } catch (error) {
      console.error("Error deleting message:", error.message);
    }
  };

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={[
        styles.messageContainer,
        item.senderId === currentUserId ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text
        style={
          item.senderId === currentUserId ? styles.myMessageText : styles.theirMessageText
        }
      >
        {item.content}
      </Text>
      {item.createdAt && (
        <Text
          style={
            item.senderId === currentUserId ? styles.myTimeText : styles.theirTimeText
          }
        >
          {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
      )}
    </TouchableOpacity>
  );

  const getItemLayout = (data, index) => ({
    length: 80, // Height of each item
    offset: 80 * index,
    index,
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 50}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={40} color="#000" />
          </TouchableOpacity>
          <Image style={styles.avatar} source={{ uri: contact?.img }} />
          <View>
            <Text style={styles.userName}>{contact?.name}</Text>
            <Text style={styles.lastSeen}>Last seen 2m ago</Text>
          </View>
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.$id}
          renderItem={renderMessageItem}
          style={styles.messageList}
          contentContainerStyle={{ paddingVertical: 10 }}
          inverted
          getItemLayout={getItemLayout} // Specify custom getItemLayout for performance
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={saveMessage} style={styles.sendButton}>
            <Icon name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          title={"Choose an action"}
          options={["Reply", "Forward", "Edit", "Delete", "Cancel"]}
          cancelButtonIndex={4}
          destructiveButtonIndex={3}
          onPress={(index) => handleActionSheet(index)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastSeen: {
    fontSize: 12,
    color: "#777",
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  theirMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
  },
  myMessageText: {
    color: "#000",
  },
  theirMessageText: {
    color: "#000",
  },
  myTimeText: {
    alignSelf: "flex-end",
    fontSize: 10,
    color: "#999",
  },
  theirTimeText: {
    alignSelf: "flex-start",
    fontSize: 10,
    color: "#999",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatScreen;
