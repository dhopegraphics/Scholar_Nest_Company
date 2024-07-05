// TagDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTagContext } from '../../../contexts/useTagContext';

const TagDetails = () => {
  const { tag } = useTagContext();

  if (!tag) {
    return <Text>No tag selected</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tag.title}</Text>
      {/* Add more tag details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TagDetails;
