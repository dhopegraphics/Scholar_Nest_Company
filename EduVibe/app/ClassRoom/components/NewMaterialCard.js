import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NewMaterialCard({ title, date }) {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Icon name="insert-drive-file" size={24} color="#DB2777" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>Posted {date}</Text>
        </View>
      </View>
      <Button type="clear" title="Add class comment" />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
});
