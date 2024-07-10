import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback , Image, Text } from 'react-native';

const PlaceCard = ({ id, img, name, description,  }) => {
  return (
    <TouchableWithoutFeedback >
      <View style={styles.card}>
        <Image source={{ uri: img }} style={styles.cardImg} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 16,
    width: 200, // Make the card smaller
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardImg: {
    width: '100%',
    height: 100, // Adjust the height to make the card smaller
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#232425',
  },
  cardDescription: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
  },
});

export default PlaceCard;
