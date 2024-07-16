import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

function SettingsItem({
  title,
  onPress,
  collapsibleActive,
  weight = false,
  weightNumber,
  fontSize = 18,
  fontWeight = 500,
}) {
  const noCollapsible =
    collapsibleActive === undefined ? true : collapsibleActive;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.item}>
        <Text
          style={[
            defaultStyles.text,
            { fontSize: fontSize, fontWeight: fontWeight },
          ]}
        >
          {weight ? (
            <Text style={{ color: "#FFD700", fontWeight: 700 }}>
              {weightNumber}
            </Text>
          ) : null}
          {weight ? "x " + title : title}
        </Text>
      </View>
      {noCollapsible ? (
        <MaterialCommunityIcons
          size={20}
          name="chevron-right"
          color="#c3cdca"
        />
      ) : (
        <MaterialCommunityIcons size={20} name="chevron-down" color="#c3cdca" />
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  weight: {
    color: "#FFD700",
  },
});

export default SettingsItem;
