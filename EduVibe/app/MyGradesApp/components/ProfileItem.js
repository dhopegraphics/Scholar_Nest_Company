import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';

function ProfileItem({title, text}) {
  return (
    <View style={styles.container}>
        <View style={styles.item}><AppText>{title}</AppText></View>
        <View style={styles.item}><AppText>{text}</AppText></View>
    </View>
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
  }
});

export default ProfileItem;