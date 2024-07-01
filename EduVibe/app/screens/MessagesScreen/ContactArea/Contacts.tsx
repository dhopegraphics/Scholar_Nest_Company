import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ContactsScreen = () => {
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
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default ContactsScreen;
