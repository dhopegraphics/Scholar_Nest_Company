import React, { useState } from "react";
import { router, usePathname } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";

import icons from "../assets/icons/icons";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    if (query === "") {
      Alert.alert(
        "Missing Query",
        "Please input something to search results across database"
      );
      return;
    }

    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={setQuery}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "#000", // Adjust background color as needed
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#333", // Adjust border color as needed
  },
  input: {
    flex: 1,
    color: "#FFF", // Adjust text color as needed
    fontSize: 16,
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#FFF", // Adjust icon color as needed
  },
});

export default SearchInput;
