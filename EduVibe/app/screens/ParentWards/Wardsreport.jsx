import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Appbar } from "react-native-paper";
import ContactsCard from "../../../components/ContactsCard";
import { useUsers } from "../../../contexts/UsersContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wardsreport = ({ navigation }) => {
  const { users } = useUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    const loadSelectedUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('selectedUsers');
        if (storedUsers !== null) {
          const parsedUsers = JSON.parse(storedUsers);
          setSelectedUsers(parsedUsers);
          setAvailableUsers(users.filter(user => !parsedUsers.some(selectedUser => selectedUser.id === user.id)));
        } else {
          setSelectedUsers([]);
          setAvailableUsers(users);
        }
      } catch (error) {
        console.error('Error loading selected users from AsyncStorage:', error);
      }
    };

    loadSelectedUsers();
  }, [users]);

  const handlePress = (userId) => {
    // Handle user press
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Reports" />
        </Appbar.Header>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <View style={styles.iconContainer}>
          <Icon name="bar-chart" size={100} style={styles.gradesIcon} />
        </View> */}
        {availableUsers.map((item) => (
          <TouchableOpacity key={item.id.toString()} onPress={() => handlePress(item.id)}>
            <ContactsCard
              name={item.name}
              img={item.img}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: -45,
  },
  header: {
    height: 56,
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradesIcon: {
    height: "auto",
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default Wardsreport;
