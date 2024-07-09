import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import ContactsCard from '../../../components/ContactsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUsers } from '../../../contexts/UsersContext';

const WardsScreen = ({ route }) => {
  const { users } = useUsers();
  const { selectedUsers: initialSelectedUsers } = route.params;
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Load selected users from AsyncStorage when component mounts
    const loadSelectedUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('selectedUsers');
        if (storedUsers !== null) {
          setSelectedUsers(JSON.parse(storedUsers));
        } else {
          setSelectedUsers(initialSelectedUsers || []);
        }
      } catch (error) {
        console.error('Error loading selected users from AsyncStorage:', error);
      }
    };

    loadSelectedUsers();
  }, [initialSelectedUsers]);

  useEffect(() => {
    // Save selected users to AsyncStorage whenever selectedUsers changes
    const saveSelectedUsers = async () => {
      try {
        await AsyncStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
      } catch (error) {
        console.error('Error saving selected users to AsyncStorage:', error);
      }
    };

    saveSelectedUsers();
  }, [selectedUsers]);

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
      {/* Display selected users */}
      <FlatList
        data={selectedUsers}
        keyExtractor={(item) => item.id.toString()} // Ensure item.id is converted to string
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <ContactsCard
              name={item.name}
              img={item.img}
            />
          </TouchableOpacity>
        )}
        style={{ flex: 1 }} // Use flex: 1 to expand to fill available space
      />
      
      {/* Display available users */}
      <FlatList
        data={availableUsers}
        keyExtractor={(item) => item.id.toString()} // Ensure item.id is converted to string
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <ContactsCard
              name={item.name}
              img={item.img}
            />
          </TouchableOpacity>
        )}
        style={{ flex: 1  , alignContent : "center"}} // Use flex: 1 to expand to fill available space
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
