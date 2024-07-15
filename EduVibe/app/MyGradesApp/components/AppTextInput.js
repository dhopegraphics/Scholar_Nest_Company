import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import { Platform } from "react-native";

function AppTextInput({ icon, width = "100%", fontSize, backgroundColor = "#002395", ...otherProps }) {
  return (
    <View style={[styles.container, { width, backgroundColor }]}>
      {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon}
          size={20}
          color="#c3cdca"
        />
      )}
      <TextInput
        style={[styles.input, { fontSize: 18 }, { color: "white" }]}
        placeholderTextColor="#c3cdca"
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  icon: {
    marginRight: 5
  },
  input: {
    fontWeight: "500",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppTextInput;
