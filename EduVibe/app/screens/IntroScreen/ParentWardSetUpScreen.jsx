import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, Animated, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { debounce } from 'lodash';
import ContactsCard from "../../../components/ContactsCard";
import { useUsers } from "../../../contexts/UsersContext";
import { useNavigation } from '@react-navigation/native';

const ParentWardSetUpScreen = () => {
  const { users } = useUsers();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const [selectedUsers, setSelectedUsers] = useState([]); // State to hold selected users

  const handleSearchDebounced = useRef(
    debounce((text) => {
      setLoading(true);
      setTimeout(() => {
        const results = mockSearchFunction(text);
        setSearchResults(results);
        setLoading(false);

        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 1000);
    }, 300)
  ).current;

  const handleSearch = (text) => {
    setSearchText(text);
    handleSearchDebounced(text);
  };

  const handleResultPress = (item) => {
    // Check if item already exists in selectedUsers
    const isUserSelected = selectedUsers.some(user => user.id === item.id);
    
    if (!isUserSelected) {
      const updatedSelectedUsers = [...selectedUsers, item];
      setSelectedUsers(updatedSelectedUsers);
      navigation.navigate('WardsScreen', { selectedUsers: updatedSelectedUsers });
    }
  };

  const mockSearchFunction = (query) => {
    if (!query) return [];
    return users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [searchResults]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <Animated.View style={{ ...styles.resultListContainer, transform: [{ translateY: slideAnim }] }}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleResultPress(item)}>
                <ContactsCard 
                  name={item.name} 
                  img={item.img} 
                  onPress={() => handleResultPress(item)}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultListContainer: {
    flex: 1,
  },
  noResultsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
});

export default ParentWardSetUpScreen;
