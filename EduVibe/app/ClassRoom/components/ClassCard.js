import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

export default function ClassCard() {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Linear Algebra</Text>
          <Text style={styles.subtitle}>MT-203-UG21(3rd), BS CSE (Sec-A)</Text>
          <Text style={styles.subtitle}>Dr. Naeem Ullah</Text>
        </View>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.image} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  image: {
    width: 80,
    height: 80,
  },
});
