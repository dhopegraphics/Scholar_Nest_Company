import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ActivityData from './ActivityData'; // Import Activity Data

const ActivityDetails = () => {
  const route = useRoute();
  const { ActivityDataId } = route.params;

  // Find the ActivityData object based on ActivityDataId
  const selectedActivityData = ActivityData.find(item => item.id === ActivityDataId);

  if (!selectedActivityData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>ActivityData not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedActivityData.title}</Text>
      <Text style={styles.meta}>By {selectedActivityData.author} | {selectedActivityData.date} {selectedActivityData.time}</Text>
      <Text style={styles.content}>{selectedActivityData.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meta: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ActivityDetails;
