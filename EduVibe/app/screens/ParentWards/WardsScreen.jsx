import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import ContactsCard from '../../../components/ContactsCard';
import { useUsers } from '../../../contexts/UsersContext';

const WardsScreen = ({ route }) => {
  const { users } = useUsers();
  const { selectedUsers: initialSelectedUsers } = route.params;
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Initialize selected users from route.params
    setSelectedUsers(initialSelectedUsers || []);
  }, [initialSelectedUsers]);


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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <ContactsCard
              name={item.name}
              img={item.img}
            />
          </TouchableOpacity>
        )}
        style={{ flex: 1 }}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default WardsScreen;
