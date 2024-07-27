import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import RequestsScreen from "./Requests";
import ContactsScreen from "./Contacts";

const Tab = createMaterialTopTabNavigator();

type ContactsMainScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

//@ts-ignore
const ContactsTabs = ({ searchText }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#1C9C9D",
        },
      }}
    >
      <Tab.Screen name="Contacts">
        {() => <ContactsScreen searchText={searchText} />}
      </Tab.Screen>
      <Tab.Screen name="Requests" component={RequestsScreen} />
    </Tab.Navigator>
  );
};

const ContactsMainScreen: React.FC<ContactsMainScreenProps> = ({
  navigation,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleSearchBar = () => {
    if (isSearchVisible) {
      closeSearchBar();
    } else {
      setIsSearchVisible(true);
      Animated.timing(animatedHeight, {
        toValue: 50,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeSearchBar = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsSearchVisible(false);
      Keyboard.dismiss();
      setSearchText("");
    });
  };

  return (
    <TouchableWithoutFeedback onPress={closeSearchBar}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contacts</Text>
          <TouchableOpacity onPress={toggleSearchBar}>
            <Icon name="search" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        {isSearchVisible && (
          <Animated.View style={[styles.searchBar, { height: animatedHeight }]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              onBlur={closeSearchBar}
              onSubmitEditing={closeSearchBar}
              returnKeyType="search"
              autoFocus
            />
          </Animated.View>
        )}
        <ContactsTabs searchText={searchText} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 5,
    alignContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBar: {
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    overflow: "hidden",
  },
  searchInput: {
    height: 40,
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: "blue",
    borderWidth: 2,
    marginTop: 5,
  },
});

export default ContactsMainScreen;
