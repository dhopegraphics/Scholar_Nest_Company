import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionSheet from "react-native-actionsheet";
import { useNavigation } from "@react-navigation/native";

const GroupChatScreen = ({ group }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const actionSheetRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(
          `messages_${group.id}`
        );
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, [group]);

  const saveMessage = async () => {
    if (inputText.trim().length > 0) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: inputText,
        sender: "me",
        time: new Date().toLocaleTimeString(),
      };

      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      setInputText("");

      try {
        await AsyncStorage.setItem(
          `messages_${group.id}`,
          JSON.stringify(updatedMessages)
        );
      } catch (error) {
        console.error("Error saving message:", error.message);
      }

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
        setInputText(`@${selectedMessage.id}: `);
        break;
      case 1: // Forward
        Alert.alert("Forward", `Forward message: ${selectedMessage.text}`);
        break;
      case 2: // Edit
        handleEdit(selectedMessage);
        break;
      case 3: // Delete
        deleteMessage(selectedMessage.id);
        break;
      default:
        break;
    }
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setInputText(message.text);
    setIsEditing(true);
  };

  const deleteMessage = async (messageId) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    setMessages(updatedMessages);

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
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text
        style={
          item.sender === "me" ? styles.myMessageText : styles.theirMessageText
        }
      >
        {item.text}
      </Text>
      {item.time && (
        <Text
          style={
            item.sender === "me" ? styles.myTimeText : styles.theirTimeText
          }
        >
          {item.time}
        </Text>
      )}
    </TouchableOpacity>
  );

  // Custom getItemLayout function to improve scroll performance
  const getItemLayout = (data, index) => ({
    length: 80, // Height of each item
    offset: 80 * index,
    index,
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Back")}>
            <Icon name="chevron-left" size={40} color="#000" />
          </TouchableOpacity>
          <Image style={styles.avatar} source={{ uri: group?.img }} />
          <View>
            <Text style={styles.userName}>{group?.name}</Text>
          </View>
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          style={styles.messageList}
          contentContainerStyle={{ paddingVertical: 10 }}
          inverted
          getItemLayout={getItemLayout}
        />
        <View style={styles.inputContainer}>
          <TextInput
            selectionColor={"#1C9C9D"}
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
    fontSize: 18,
  },
  lastSeen: {
    fontSize: 12,
    color: "#888",
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: "70%",
  },
  myMessage: {
    backgroundColor: "#1C9C9D",
    alignSelf: "flex-end",
  },
  theirMessage: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
  },
  myMessageText: {
    color: "#fff",
  },
  theirMessageText: {
    color: "#000",
  },
  myTimeText: {
    color: "#fff",
    fontSize: 10,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  theirTimeText: {
    color: "#000",
    fontSize: 10,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#1C9C9D",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GroupChatScreen;
