import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import imageExport from '../../../assets/images/imageExport';

const SwitchAccount  = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Moodle - Open-source learning platform</Text>
        <Text style={styles.subtitle}>moodle.org</Text>
      </View>
      <TouchableOpacity style={styles.touchableContainer} onPress={() => alert('Card pressed!')}>
        <Image source={imageExport.logo} style={styles.logo} />
        <Text style={styles.name}>isaac mensah</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    width  : "85%",
    height : "19.5%",
    alignSelf : "center",
    marginTop : 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
  },
});

export default SwitchAccount;