import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity, Animated, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const GlobalSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;  // Initial value for slide: -100 (off-screen)

  const handleSearch = (text) => {
    setSearchText(text);
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
    }, 1000); // Simulate network delay
  };

  const handleResultPress = (item) => {
    console.log("Item clicked:", item);
  };

  const mockSearchFunction = (query) => {
    if (!query) return [];
    return [
      { id: '1', title: 'Result 1' },
      { id: '2', title: 'Result 2' },
      { id: '3', title: 'Result 3' }
    ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
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
              <TouchableOpacity onPress={() => handleResultPress(item)} style={styles.resultItem}>
                <Text style={styles.resultText}>{item.title}</Text>
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
  resultItem: {
    padding: 16,
    backgroundColor: "black",
    borderRadius: 25,
    margin: 5,
  },
  resultText: {
    fontSize: 16,
    color: "white",
  },
  noResultsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
});

export default GlobalSearch;
