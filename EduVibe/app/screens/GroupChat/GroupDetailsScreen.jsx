import React from "react";
import { View } from "react-native";
import GroupChatScreen from "./GroupChatScreen";

const GroupDetailsScreen = ({ route }) => {
    const { group } = route.params;

  if (!group) {
    console.error("Group data not provided.");
    return null;
  }

  return (
    <View  style={{ flex: 1 }} >
      <GroupChatScreen group={group} />
    </View>
  );
};

export default GroupDetailsScreen;
