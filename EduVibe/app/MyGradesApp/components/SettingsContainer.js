import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SettingsItem from './SettingsItem';
import { Platform } from "react-native";

function SettingsContainer({heading, children}) {
  return (
    <View style={styles.container}>
        {heading &&
            <View style={styles.heading}>
                <Text style={styles.title}>{heading}</Text>
            </View>}
        <View style={styles.list}>
            {children}
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: "#3182CE",
    width: "100%",
    padding: 20,
    display: "flex",
    marginVertical: 15
  },
  heading: {
    paddingBottom: 10,
    paddingLeft: 10
  },
  title: {
    color: "#FFD700",
    fontSize: 21,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "700"
  },
  list: {
    rowGap: 10, 
  }
});

export default SettingsContainer;