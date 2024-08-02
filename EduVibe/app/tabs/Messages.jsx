import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import messagesScreenstyles from "../../themes/messagesScreenStyles";
import ContactsCard from "../../components/ContactsCard"; // Import the ContactsCard component
import GroupCard from "../../components/GroupCard"; // Import the GroupCard component
import { useUsers } from "../../contexts/UsersContext";
import { useGroup } from "../../contexts/GroupContexts";
import { getCurrentUser } from "../../lib/appwrite";
import ReactNativeBiometrics from 'react-native-biometrics';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


const rnBiometrics = new ReactNativeBiometrics();
const Tab = createMaterialTopTabNavigator();


const MessagesScreen = ({ navigation }) => {
  const { users } = useUsers(); // Access users data from UsersContext
  const { group } = useGroup(); // Access group data from GroupContext
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Check if user data is stored in AsyncStorage
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        } else {
          // Fetch the current user if not found in AsyncStorage
          const user = await getCurrentUser();
          setCurrentUser(user);
          // Save user data to AsyncStorage
          await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const [dropdown3Open, setDropdown3Open] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar) {
      setSearchText("");
    }
  };

  const toggleDropdown1 = () => {
    setDropdown1Open(!dropdown1Open);
  };

  const toggleDropdown2 = () => {
    setDropdown2Open(!dropdown2Open);
  };

  const authenticateUser = async () => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert('Biometric sensor not available');
        return false;
      }

      const { success, error } = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm your identity' });

      if (success) {
        return true;
      } else {
        Alert.alert('Authentication failed', error);
        return false;
      }
    } catch (error) {
      Alert.alert('Biometrics failed', error.message);
      console.log(error);
      return false;
    }
  };

  const toggleDropdown3 = async () => {
    const authenticated = await authenticateUser();
    if (authenticated) {
      setDropdown3Open(!dropdown3Open);
    }
  };

  return (
    <View style={messagesScreenstyles.container}>
      <View style={messagesScreenstyles.header}>
        <Text style={messagesScreenstyles.headerText}>Messages</Text>
        <View style={messagesScreenstyles.headerIcons}>
          <TouchableOpacity onPress={toggleSearchBar}>
            <Icon style={messagesScreenstyles.icon} name="search" size={30} color="black" />
          </TouchableOpacity>
          {showSearchBar && (
            <TextInput
              style={messagesScreenstyles.searchInput}
              placeholder="Search"
              placeholderTextColor="#ffffff"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              autoFocus={true}
              onBlur={() => setShowSearchBar(false)}
            />
          )}
          {currentUser && (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              {!imageLoaded && (
                <Image
                  source={require('../../assets/images/Eduvibe.png')}
                  style={messagesScreenstyles.profileIcon}
                />
              )}
              <Image
                source={{ uri: currentUser.avatar }}
                style={messagesScreenstyles.profileIcon}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <ScrollView>
        <View>
          <TouchableOpacity
            style={messagesScreenstyles.contactItem}
            onPress={() => navigation.navigate("ContactsMainScreen")}
          >
            <Icon name="contacts" style={messagesScreenstyles.ContactIcon} size={30} color="black" />
            <Text style={messagesScreenstyles.contactText}>Contacts</Text>
            <Icon style={messagesScreenstyles.rightIcon} name="chevron-right" size={30} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleDropdown1} style={messagesScreenstyles.dropdownButton}>
            <Text style={messagesScreenstyles.dropdownButtonText}>Starred</Text>
            <Icon
              name={dropdown1Open ? "keyboard-arrow-down" : "keyboard-arrow-right"}
              style={messagesScreenstyles.dropdownIcon}
              size={30}
              color="#ffffff"
            />
          </TouchableOpacity>
          {dropdown1Open && (
            <View style={messagesScreenstyles.dropdownContent}>
              {users.map((user, index) => (
                <ContactsCard
                  key={index}
                  name={user.name}
                  img={user.img}
                  onPress={() => {
                    navigation.navigate("ContactDetailsScreen", { contact: user }); // Pass user object to ContactDetailsScreen
                  }}
                />
              ))}
            </View>
          )}

          <TouchableOpacity onPress={toggleDropdown2} style={messagesScreenstyles.dropdownButton}>
            <Text style={messagesScreenstyles.dropdownButtonText}>Group</Text>
            <Icon
              name={dropdown2Open ? "keyboard-arrow-down" : "keyboard-arrow-right"}
              style={messagesScreenstyles.dropdownIcon}
              size={30}
              color="#ffffff"
            />
          </TouchableOpacity>
          {dropdown2Open && (
            <View style={messagesScreenstyles.dropdownContent}>
              {group.map((grp, index) => (
                <GroupCard
                  key={index}
                  name={grp.name}
                  img={grp.img}
                  onPress={() => {
                    navigation.navigate("GroupDetailsScreen", { group: grp }); // Pass group object to GroupDetailsScreen
                  }}
                />
              ))}
            </View>
          )}

          <TouchableOpacity onPress={toggleDropdown3} style={messagesScreenstyles.dropdownButton}>
            <Text style={messagesScreenstyles.dropdownButtonText}>Private</Text>
            <Icon
              name={dropdown3Open ? "keyboard-arrow-down" : "keyboard-arrow-right"}
              style={messagesScreenstyles.dropdownIcon}
              size={30}
              color="#ffffff"
            />
          </TouchableOpacity>
          {dropdown3Open && (
            <View style={messagesScreenstyles.dropdownContent}>
              <GroupCard
                name="Gangsters Group"
                img="https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                onPress={() => {
                  navigation.navigate("GroupDetailsScreen", { group: { name: "Gangsters Group", img: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" } });
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};



export default MessagesScreen;
