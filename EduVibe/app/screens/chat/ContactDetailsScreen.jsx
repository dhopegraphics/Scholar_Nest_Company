import React from "react";
import { View } from "react-native";
import ChatScreen from "./ChatScreen";

const ContactDetailsScreen = ({ route }) => {
  const { contact } = route.params || {};

  if (!contact) {
    console.error("Contact data not provided.");
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ChatScreen contact={contact} />
    </View>
  );
};

export default ContactDetailsScreen;
