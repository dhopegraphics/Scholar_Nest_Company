import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';

interface ContactsCardProps {
  name: string;
  img: string | number; // Updated to accept both string (remote URI) and number (local image require)
  onPress: () => void;
}

const ContactsCard: React.FC<ContactsCardProps> = ({ name, img, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {typeof img === 'number' ? (
        <Image source={img} style={styles.image} />
      ) : (
        <Image source={{ uri: img }} style={styles.image} />
      )}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

interface Style {
    card: ViewStyle;
    image: ImageStyle;
    name: TextStyle;
  }

const styles = StyleSheet.create<Style>({
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
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactsCard;
