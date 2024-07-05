import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ParamListBase } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Appbar, Chip } from "react-native-paper";

const Tags = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current; // Initial value for slide: -100 (off-screen)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDropdownOpen(false));
    } else {
      setIsDropdownOpen(true);
      Animated.timing(dropdownHeight, {
        toValue: 150, // Adjust based on the number of dropdown items
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

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
      { id: "1", title: "Result 1" },
      { id: "2", title: "Result 2" },
      { id: "3", title: "Result 3" },
    ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
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
      <View style={styles.headerContainer}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            title="Tags"
            fontSize="20"
            fontWeight="bold"
            style={styles.headerText}
          />
        </Appbar.Header>
      </View>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.filterButton} onPress={toggleDropdown}>
          <Text style={{ color: "black" }}>Everywhere</Text>
          <MaterialIcons name="arrow-drop-down" style={styles.dropdownIcon} />
        </TouchableOpacity>
        {isDropdownOpen && (
          <Animated.View
            style={[styles.dropdownMenu, { height: dropdownHeight }]}
          >
            <TouchableOpacity style={styles.dropdownItem}>
              <Text>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text>Option 3</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      <View style={styles.chipContainer}>
        <Chip
          //icon="information"
          style={styles.chip}
          onPress={() => console.log("Pressed")}
        >
          Documentation
        </Chip>
        <Chip
          //icon="information"
          style={styles.chip}
          onPress={() => console.log("Pressed")}
        >
          Art
        </Chip>
        <Chip
          //icon="information"
          style={styles.chip}
          onPress={() => console.log("Pressed")}
        >
          Books
        </Chip>
        <Chip
          //icon="information"
          style={styles.chip}
          onPress={() => console.log("Pressed")}
        >
          Digital Marketing
        </Chip>
        {/* Add more chips as needed */}
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <Animated.View
          style={{
            ...styles.resultListContainer,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleResultPress(item)}
                style={styles.resultItem}
              >
                <Text style={styles.resultText}>{item.title}</Text>
              </TouchableOpacity>
            )}
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
  headerContainer: {
    marginTop: -60,
  },
  header: {
    height: 50,
    paddingHorizontal: 0,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
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
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "black", // border-border
    borderRadius: 8,
    backgroundColor: "white", // bg-secondary
    color: "#fff", // text-secondary-foreground
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  chip: {
    borderRadius: 30,
    backgroundColor: "#4b968f",
    marginBottom: 15,
  },
});

export default Tags;
