import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const RequestsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Icon name="contacts" size={100} style={styles.contactsIcon} />
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contactsIcon: {
    flex: 2,
    width: 100,
    height: 30,
    marginTop: 250,
    verticalAlign: "middle",
    marginHorizontal: 100,
  },
});

export default RequestsScreen;
