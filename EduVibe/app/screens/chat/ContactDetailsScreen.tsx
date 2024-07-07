// ContactDetailsScreen.tsx
import React from "react";
import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/AppNavigator";
import ChatScreen from "./ChatScreen";

interface ContactDetailsScreenProps {
  navigation: NativeStackNavigationProp<StackParamList, "ContactDetailsScreen">;
  route: any;
}

const ContactDetailsScreen: React.FC<ContactDetailsScreenProps> = ({ route }) => {
  const { contact } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <ChatScreen contact={contact} />
    </View>
  );
};

export default ContactDetailsScreen;
