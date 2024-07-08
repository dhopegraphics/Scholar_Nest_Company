import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import ContactsCard from '../../../components/ContactsCard';
import { useUsers } from '../../../contexts/UsersContext';

const WardsScreen = ({ route }) => {
  const { users } = useUsers();
  const { selectedUsers: initialSelectedUsers } = route.params;
  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers);

  const availableUsers = users.filter(user => !selectedUsers.some(selectedUser => selectedUser.id === user.id));

  const handlePress = (userId) => {
    Alert.alert(
      "Remove User",
      "Are you sure you want to remove this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            const updatedSelectedUsers = selectedUsers.filter(user => user.id !== userId);
            setSelectedUsers(updatedSelectedUsers);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <ContactsCard
              name={item.name}
              img={item.img}
            />
          </TouchableOpacity>
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
