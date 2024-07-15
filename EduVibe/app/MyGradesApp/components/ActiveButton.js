import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import { Platform } from "react-native";


function ActiveButton({ text, style, onPress, size, icon, fontSize = 21 }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {icon && <MaterialCommunityIcons name={icon} size={size} style={{color: "white"}}/>}
      {text && (
        <Text style={[styles.text, { fontSize: fontSize }]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: "100%",
    padding: 5
  },
  text: {
    color: "#002366",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "700",
  },
});

export default ActiveButton;
