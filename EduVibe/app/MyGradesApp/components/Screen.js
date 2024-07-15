import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Constants from "expo-constants";

function Screen({children, style}) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
          <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: "white",
    },
    view: {
        flex: 1,
        paddingHorizontal: 15
    }
});

export default Screen;