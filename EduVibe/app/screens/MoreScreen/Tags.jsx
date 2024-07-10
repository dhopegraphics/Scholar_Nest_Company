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
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Appbar } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTagContext } from "../../../contexts/TagContext";
import { TagStyles } from "../../../themes/TagStyling";

const Tags = ({ navigation }) => {
  const { setTag, TagData } = useTagContext();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('item1'); // Default to 'Everywhere'
  const [items, setItems] = useState([
    { label: 'Everywhere', value: 'item1' },
    { label: 'Default Collection', value: 'item2' },
    { label: 'Forum Tags', value: 'item3' },
  ]);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const windowWidth = Dimensions.get("window").width;

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
    if (!query) return filterByCategory(value); // Initialize with filtered data based on default dropdown value

    const filteredByQuery = TagData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredByCategory = filterByCategory(value);

    // Intersection of results from query and category filter
    const results = filteredByQuery.filter(item =>
      filteredByCategory.some(filteredItem => filteredItem.id === item.id)
    );

    return results;
  };

  const filterByCategory = (selectedValue) => {
    if (selectedValue === 'item1') {
      return TagData.filter(item => item.categories.includes('Everywhere'));
    } else if (selectedValue === 'item2') {
      return TagData.filter(item => item.categories.includes('Default Collection'));
    } else if (selectedValue === 'item3') {
      return TagData.filter(item => item.categories.includes('Forum Tags'));
    } else {
      return [];
    }
  };

  useEffect(() => {
    setSearchResults(mockSearchFunction("")); // Initialize with full list based on default dropdown value
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [value]); // Update search results when dropdown value changes

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

  const handleDropDownChange = (val) => {
    setValue(val);
  };

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleResultPress(item)}
      style={TagStyles.resultItem}
    >
      <Text style={TagStyles.resultText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const numColumns = Math.floor(windowWidth / 140); // Adjust based on your item width and spacing

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <View style={styles.dropDownContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items.map(item => ({
              ...item,
              icon: () => (
                <Ionicons
                  name={value === item.value ? "ellipse" : "ellipse-outline"}
                  size={20}
                  color="#000"
                />
              )
            }))}
            setOpen={setOpen}
            setValue={handleDropDownChange}
            setItems={setItems}
            style={styles.dropDown}
            dropDownContainerStyle={styles.dropDownContainerStyle}
          />
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
            contentContainerStyle={searchResults.length === 0 && TagStyles.emptyListContainer}
            horizontal={false} // Ensure vertical scrolling
            numColumns={numColumns} // Dynamically set number of columns
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Tags;

const styles = StyleSheet.create({
  dropDownContainer: {
    marginVertical: 10,
    zIndex: 1000, // Ensure dropdown is above other elements
  },
  dropDown: {
    backgroundColor: '#fafafa',
  },
  dropDownContainerStyle: {
    backgroundColor: '#dfdfdf',
  },
});
