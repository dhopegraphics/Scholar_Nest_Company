import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Appbar, Chip } from "react-native-paper";
import { useTagContext } from "../../../contexts/useTagContext";
import { TagStyles } from "../../../themes/TagStyling";

const Tags = ({ navigation }) => {
  const { setTag } = useTagContext();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
    setTag({ title: item.title });
    navigation.navigate("TagDetails");
  };

  const mockSearchFunction = (query) => {
    const mockData = [
      { id: "1", title: "Documentation" },
      { id: "2", title: "Art" },
      { id: "3", title: "Books" },
      { id: "4", title: "Digital Marketing" },
    ];
    if (!query) return mockData;
    return mockData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    setSearchResults(mockSearchFunction("")); // Initialize with full list
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleChipPress = (tagTitle) => {
    setTag({ title: tagTitle });
    navigation.navigate("TagDetails");
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Fetch new data here if needed
    }, 1000);
  };

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleResultPress(item)}
      style={TagStyles.resultItem}
    >
      <Text style={TagStyles.resultText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={TagStyles.container}>
      <View style={TagStyles.headerContainer}>
        <Appbar.Header style={TagStyles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            title="Tags"
            fontSize="20"
            fontWeight="bold"
            style={TagStyles.headerText}
          />
        </Appbar.Header>
      </View>
      <View style={TagStyles.searchBarContainer}>
        <Icon name="search" size={20} color="#000" />
        <TextInput
          style={TagStyles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        <TouchableOpacity style={TagStyles.filterButton} onPress={toggleDropdown}>
          <Text style={{ color: "black" }}>Everywhere</Text>
          <MaterialIcons name="arrow-drop-down" style={TagStyles.dropdownIcon} />
        </TouchableOpacity>
        {isDropdownOpen && (
          <Animated.View
            style={[TagStyles.dropdownMenu, { height: dropdownHeight }]}
          >
            <TouchableOpacity style={TagStyles.dropdownItem}>
              <Text>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TagStyles.dropdownItem}>
              <Text>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TagStyles.dropdownItem}>
              <Text>Option 3</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      {loading ? (
        <View style={TagStyles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={renderSearchResultItem}
          ListEmptyComponent={<Text style={TagStyles.noResultsText}>No Results Found</Text>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={TagStyles.chipContainer}
        />
      )}
    </View>
  );
};

export default Tags;
