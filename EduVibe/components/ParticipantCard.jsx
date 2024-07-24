import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const ParticipantCard = ({ name, img }) => {
  return (
    <View style={styles.card}>
      {img ? (
        <Image source={{ uri: img }} style={styles.image} />
      ) : (
        <View style={styles.image} /> 
      )}
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#eee', // Optional: background color for placeholder
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ParticipantCard;
