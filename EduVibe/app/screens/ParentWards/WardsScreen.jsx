import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ContactsCard from '../../../components/ContactsCard';
import { useUsers } from '../../../contexts/UsersContext';

const WardsScreen = ({ route }) => {
  const { users } = useUsers();
  const { selectedUsers } = route.params;

  // Filter out selected users from the original list
  const availableUsers = users.filter(user => !selectedUsers.some(selectedUser => selectedUser.id === user.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactsCard
            name={item.name}
            img={item.img}
          />
        )}
      />
      <FlatList
        data={availableUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactsCard
            name={item.name}
            img={item.img}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default WardsScreen;
