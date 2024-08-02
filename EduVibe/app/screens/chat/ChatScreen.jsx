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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionSheet from "react-native-actionsheet";
import { useNavigation } from "@react-navigation/native";
import {
  sendMessage,
  getMessages,
  getCurrentUser,
} from "../../../lib/appwrite";
import { appwriteConfig } from "../../../lib/appwrite";
import { Client, Databases } from "appwrite";

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);
const databases = new Databases(client);

const ChatScreen = ({ contact }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isSending, setIsSending] = useState(false);
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

        // Load messages from AsyncStorage
        const storedMessages = await AsyncStorage.getItem(
          `messages_${contact.id}`
        );
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }

        // Fetch messages from the server
        const fetchedMessages = await getMessages(user.$id, contact.id);
        setMessages(
          fetchedMessages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );

        // Cache the messages in AsyncStorage
        await AsyncStorage.setItem(
          `messages_${contact.id}`,
          JSON.stringify(fetchedMessages)
        );

        // Subscribe to message creation and updates
        const unsubscribe = client.subscribe(
          databases.collections[appwriteConfig.messagesCollectionId].documents,
          (response) => {
            const event = response.events[0];
            if (event.includes("create") || event.includes("update")) {
              if (
                (response.payload.senderId === user.$id &&
                  response.payload.receiverId === contact.id) ||
                (response.payload.senderId === contact.id &&
                  response.payload.receiverId === user.$id)
              ) {
                setMessages((prevMessages) => {
                  const updatedMessages = [...prevMessages];
                  const existingMessageIndex = updatedMessages.findIndex(
                    (msg) => msg.$id === response.payload.$id
                  );
                  if (existingMessageIndex > -1) {
                    updatedMessages[existingMessageIndex] = response.payload;
                  } else {
                    updatedMessages.push(response.payload);
                  }
                  return updatedMessages.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                  );
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
    if (inputText.trim().length > 0 && !isSending) {
      setIsSending(true); // Disable the send button
      let newMessage;

      // Add new message
      if (currentUserId) {
        try {
          // Include the ID of the message being replied to (if any)
          newMessage = await sendMessage(
            currentUserId,
            contact.id,
            inputText,
            selectedMessage ? selectedMessage.$id : null
          );
          const updatedMessages = [...messages, newMessage].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setMessages(updatedMessages);

          // Clear the selected message after sending
          setSelectedMessage(null);
          setInputText(""); // Clear input text
        } catch (error) {
          console.error("Error sending message:", error.message);
        }
      } else {
        console.error("Error: currentUserId is not valid.");
      }

      // Scroll to the end of the list after adding a new message
      flatListRef.current.scrollToEnd({ animated: true });
      setIsSending(false); // Re-enable the send button
    }
  };

  const handleLongPress = (message) => {
    setSelectedMessage(message);
    actionSheetRef.current.show();
  };

  const handleActionSheet = (index) => {
    const options =
      selectedMessage.senderId === currentUserId
        ? ["Reply", "Forward", "Edit", "Delete", "Cancel"]
        : ["Reply", "Forward", "Cancel"];

    switch (options[index]) {
      case "Reply":
        // Only set selectedMessage, no need to set inputText here
        break;
      case "Forward":
        Alert.alert("Forward", `Forward message: ${selectedMessage.content}`);
        break;
      case "Edit":
        handleEdit(selectedMessage);
        break;
      case "Delete":
        deleteMessage(selectedMessage.$id);
        break;
      default:
        break;
    }
  };

  const handleEdit = (message) => {
    setInputText(message.content);
    setSelectedMessage(null); // Clear selected message when editing
  };

  const deleteMessage = async (messageId) => {
    const updatedMessages = messages.filter((msg) => msg.$id !== messageId);
    setMessages(updatedMessages);

    // Update the message storage here
    await AsyncStorage.setItem(
      `messages_${contact.id}`,
      JSON.stringify(updatedMessages)
    );
  };

  const renderMessageItem = ({ item }) => (
    <View>
      {/* Render reply details if the message is a reply */}
      {item.replyTo && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyText}>Replying to:</Text>
          <Text style={styles.replyMessageText}>
            {messages.find((msg) => msg.$id === item.replyTo)?.content ||
              "Deleted message"}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onLongPress={() => handleLongPress(item)}
        style={[
          styles.messageContainer,
          item.senderId === currentUserId
            ? styles.myMessage
            : styles.theirMessage,
        ]}
      >
        <Text
          style={
            item.senderId === currentUserId
              ? styles.myMessageText
              : styles.theirMessageText
          }
        >
          {item.content}
        </Text>
        {item.createdAt && (
          <Text
            style={
              item.senderId === currentUserId
                ? styles.myTimeText
                : styles.theirTimeText
            }
          >
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const getItemLayout = (data, index) => ({
    length: 80, // Height of each item
    offset: 80 * index,
    index,
  });

  // Cancel reply function
  const cancelReply = () => {
    setSelectedMessage(null); // Clear the selected message
    setInputText(""); // Clear the input text
  };

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
          getItemLayout={getItemLayout}
        />

        {/* Display the replied message on top of the input field */}
        {selectedMessage && (
          <View style={styles.replyContainer}>
            <TouchableOpacity onPress={cancelReply} style={styles.cancelButton}>
              <Icon name="cancel" size={24} color="#E57373" />
            </TouchableOpacity>
            <Text style={styles.replyText}>Replying to:</Text>
            <Text style={styles.replyMessageText}>
              {selectedMessage.content}
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            selectionColor={"#1C9C9D"}
          />
          <TouchableOpacity
            onPress={saveMessage}
            style={styles.sendButton}
            disabled={isSending}
          >
            <Icon name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ActionSheet
          ref={actionSheetRef}
          title={"Choose an action"}
          options={
            selectedMessage?.senderId === currentUserId
              ? ["Reply", "Forward", "Edit", "Delete", "Cancel"]
              : ["Reply", "Forward", "Cancel"]
          }
          cancelButtonIndex={
            selectedMessage?.senderId === currentUserId ? 4 : 2
          }
          destructiveButtonIndex={
            selectedMessage?.senderId === currentUserId ? 3 : null
          }
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
  replyContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    position: "relative",
  },
  replyText: {
    fontWeight: "bold",
  },
  replyMessageText: {
    color: "#333",
  },
  cancelButton: {
    position: "absolute",
    right: 10,
    top: 10,
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
    backgroundColor: "#1C9C9D",
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatScreen;
