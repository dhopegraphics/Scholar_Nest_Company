import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";

function WeightItem({ title, weightNumber, percentage }) {

    return (
    <TouchableOpacity style={styles.container}>
        <AppText>{title}</AppText>
        <AppText><AppText style={{color: "#c3cdca", fontSize: 14}} >{percentage}</AppText> <AppText style={{color: "#FFD700", fontWeight: 700}} >{weightNumber}</AppText>x</AppText>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },
    weight: {
      color: "#FFD700",
    }
  });

export default WeightItem;