import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FinanceCard = ({ title,   onPress, imageSource }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.innerContainer}>
        <Image source={imageSource} style={styles.cardImg} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 16,
    width: 340,
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
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#232425',
  },
 
});

export default FinanceCard;
