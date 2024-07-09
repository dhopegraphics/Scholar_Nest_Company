import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useUsers } from '../../../contexts/UsersContext';
import { useTagContext } from '../../../contexts/TagContext';

const UserInterest = ({ route }) => {
  const { tagTitle } = route.params;
  const { users } = useUsers();
  const { TagData } = useTagContext();

  // Find tag based on tagTitle
  const tag = TagData.find(tag => tag.title === tagTitle);
  
  // Filter users interested in the tag
  const interestedUsers = users.filter(user => user.tags?.some(t => t.title === tagTitle));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users interested in: {tagTitle}</Text>
      <FlatList
        data={interestedUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.user}>{item.name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  user: {
    fontSize: 18,
    padding: 8,
  },
});

export default UserInterest;
