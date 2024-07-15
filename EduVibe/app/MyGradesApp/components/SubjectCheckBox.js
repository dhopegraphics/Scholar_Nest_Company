import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import AppText from './AppText';

function SubjectCheckBox({onPress, name, color, ...otherProps}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <View style={styles.subject}>
                <View style={[styles.label, {backgroundColor: color}]} ></View>
                <AppText style={styles.paragraph} >{name}</AppText>
            </View>
            <Checkbox style={styles.checkbox}
            {...otherProps}/>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: "#002366",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 25,
        marginVertical: 10
      },
      checkbox: {
        margin: 8,
        borderRadius: 25,
        height: 18,
        width: 18
      },
      paragraph: {
        fontWeight: "700",
      },
      label: {
        height: "auto",
        width: 7,
      },
      subject: {
        flexDirection: "row",
        columnGap: 10
      }
});

export default SubjectCheckBox;