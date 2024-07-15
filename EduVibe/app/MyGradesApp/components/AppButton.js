import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

function Button({buttonText, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FF",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 25,
    marginVertical: 10,
  },
  text: {
    color: "#000000",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 21,
    fontWeight: 700
  }
});

export default Button;