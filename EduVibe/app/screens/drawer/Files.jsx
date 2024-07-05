import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Files = () => {
  return (
    <><View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Private Files</Text>
        <Icon name="arrow-drop-down" size={24} color="#000" />
      </TouchableOpacity>
    </View>
      </>
  );
};

export default Files;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0, // Adjust this value if you need more spacing from the top
    paddingBottom: 580,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this line to space out the text and icon
    padding: 10,
    backgroundColor: '#d7d7d7',
    borderRadius: 5,
    width: 340,
  },
  Space: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#d7d7d7',
    borderRadius: 5,
    width: 340,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});
