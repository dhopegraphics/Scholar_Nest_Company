// MessagesScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation/AppNavigator";
import imageExport from "../../assets/images/imageExport";
import messagesScreenstyles from "../../themes/messagesScreenStyles";
import ContactsCard from "../../components/ContactsCard";

interface MessagesScreenProps {
  navigation: NativeStackNavigationProp<StackParamList, "MessagesScreen">;
}

interface Contact {
  name: string;
  img: any; // Adjust the type based on how you handle images
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ navigation }) => {
  const contacts: Contact[] = [
    { name: 'John Doe', img: imageExport.logo }, // Example with imported image
    // Add more contacts with appropriate images
  ];

  const [searchText, setSearchText] = React.useState("");
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [dropdown1Open, setDropdown1Open] = React.useState(false);
  const [dropdown2Open, setDropdown2Open] = React.useState(false);
  const [dropdown3Open, setDropdown3Open] = React.useState(false);

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

  const toggleDropdown3 = () => {
    setDropdown3Open(!dropdown3Open);
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
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={imageExport.logo} style={messagesScreenstyles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>
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
            {contacts.map((contact, index) => (
              <ContactsCard
                key={index}
                name={contact.name}
                img={contact.img}
                onPress={() => {
                  navigation.navigate("ContactDetailsScreen", { contact });
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
            <Text>Dropdown 2 content here</Text>
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
            <Text>Dropdown 3 content here</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MessagesScreen;
