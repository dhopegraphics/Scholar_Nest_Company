// TagDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTagContext } from '../../../contexts/TagContext';

const TagDetails = () => {
  const { tag } = useTagContext();

  if (!tag) {
    return <Text>No tag selected</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tag: {tag.title}</Text>
      {/* Add more tag details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TagDetails;
