import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface ContactsCardProps {
  name: string;
  img: string | number; // Updated to accept both string (remote URI) and number (local image require)
  onPress: () => void;
}

const ContactsCard: React.FC<ContactsCardProps> = ({ name, img, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Use require for local images, and uri for remote images */}
      {typeof img === 'number' ? (
        <Image source={img} style={styles.image} />
      ) : (
        <Image source={{ uri: img }} style={styles.image} />
      )}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
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
    borderColor : "black",
    borderWidth : 1,
  },
  name: {
    fontSize: 16,
    fontWeight : "bold"
  },
});

export default ContactsCard;
