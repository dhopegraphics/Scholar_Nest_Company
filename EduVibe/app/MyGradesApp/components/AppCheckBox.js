import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import AppText from './AppText';

function AppCheckBox({name, onPress, ...otherProps}) {


    
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <AppText style={styles.paragraph} >{name}</AppText>
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
  }
});

export default AppCheckBox;