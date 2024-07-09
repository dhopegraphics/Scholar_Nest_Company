// TagDetails.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTagContext } from '../../../contexts/TagContext';

const TagDetails = ({ navigation }) => {
  const { tag } = useTagContext();

  if (!tag) {
    return <Text>No tag selected</Text>;
  }

  const navigateToUserInterest = () => {
    navigation.navigate('UserInterest', { tagTitle: tag.title });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tag: {tag.title}</Text>
      {/* Add more tag details here */}
      <Button title="User Interest" onPress={navigateToUserInterest} />
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
