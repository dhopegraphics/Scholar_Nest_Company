import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Divider } from "react-native-paper";
import CountryPicker from "react-native-country-picker-modal";
import * as ImagePicker from "expo-image-picker";
import { AccountStyling } from "../../../themes/AccountStyling";
import { useUsers, updateAvatar } from "../../../contexts/UsersContext"; // Import updateAvatar

const AccountScreen = ({ navigation }) => {
  const { users, currentUserId } = useUsers();
  const currentUser = users.find((user) => user.id === currentUserId);

  // Initialize state variables with default values
  const defaultUsername = currentUser ? currentUser.username : "";
  const defaultName = currentUser ? currentUser.name : "";
  const defaultPhone = currentUser ? currentUser.phone : "";
  const defaultBirthday = currentUser ? currentUser.birthday : "";
  const defaultCountry = currentUser ? currentUser.country : "";
  const defaultEmail = currentUser ? currentUser.email : "";
  const defaultAvatar = currentUser ? currentUser.img : "https://placekitten.com/200/200";

  // State variables for user information
  const [username, setUsername] = useState(defaultUsername);
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState(defaultPhone);
  const [birthday, setBirthday] = useState(defaultBirthday);
  const [country, setCountry] = useState(defaultCountry);
  const [email, setEmail] = useState(defaultEmail);
  const [avatar, setAvatar] = useState(defaultAvatar); // Avatar URL state

  const [countryCode, setCountryCode] = useState("GH");

  // Effect to update fields when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setName(currentUser.name);
      setPhone(currentUser.phone);
      setBirthday(currentUser.birthday);
      setCountry(currentUser.country);
      setEmail(currentUser.email);
      setAvatar(currentUser.img);
    }
  }, [currentUser]);

  // Function to pick avatar from gallery
  const pickAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        // Set local state for immediate UI update
        setAvatar(result.uri);

        // Call updateAvatar to update avatar in Appwrite database
        updateAvatar(currentUserId, result.uri)
          .then(() => console.log('Avatar updated successfully'))
          .catch(error =>
            console.error('Failed to update avatar:', error.message)
          );
      }
    } catch (error) {
      console.error('Failed to update avatar:', error.message);
    }
  };

  return (
    <ScrollView style={AccountStyling.container}>
      <View style={AccountStyling.header}>
        <Icon
          name="arrow-back"
          size={24}
          onPress={() => navigation.navigate("Back")}
        />
        <Text style={AccountStyling.headerText}>Account</Text>
        <Icon
          name="more-vert"
          size={24}
          onPress={() => console.log("Menu Pressed")}
        />
      </View>

      <View style={AccountStyling.profileContainer}>
        <TouchableOpacity onPress={pickAvatar}>
          <Image style={AccountStyling.avatar} source={{ uri: avatar }} />
          <View style={AccountStyling.cameraIconContainer}>
            <Icon name="camera-alt" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={AccountStyling.section}>
        <Text style={AccountStyling.sectionTitle}>PERSONAL INFORMATION</Text>
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Username</Text>
          <TextInput
            style={AccountStyling.value}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <Divider />
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Name</Text>
          <TextInput
            style={AccountStyling.value}
            value={name}
            onChangeText={setName}
          />
        </View>
        <Divider />
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Phone</Text>
          <View style={AccountStyling.phoneInputContainer}>
            <CountryPicker
              withFlag
              withFilter
              withAlphaFilter
              withCallingCodeButton
              withCallingCode
              withEmoji
              countryCode={countryCode}
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCountry(country.name);
              }}
            />
            <TextInput
              style={AccountStyling.value}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <Divider />
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Birthday</Text>
          <TextInput
            style={AccountStyling.value}
            value={birthday}
            onChangeText={setBirthday}
          />
        </View>
        <Divider />
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Country</Text>
          <TextInput
            style={AccountStyling.value}
            value={country}
            onChangeText={setCountry}
          />
        </View>
      </View>

      <View style={AccountStyling.section}>
        <Text style={AccountStyling.sectionTitle}>LOGIN INFORMATION</Text>
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Email</Text>
          <TextInput
            style={AccountStyling.value}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <Divider />
        <TouchableOpacity onPress={() => navigation.navigate("ChangePasswordScreen")}>
          <View style={AccountStyling.row}>
            <Text style={AccountStyling.label}>Update password</Text>
            <Icon name="chevron-right" size={24} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={AccountStyling.section}>
        <Text style={AccountStyling.sectionTitle}>SOCIAL ACCOUNTS</Text>
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Apple</Text>
          <Text style={AccountStyling.connected}>Connected</Text>
        </View>
        <Divider />
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Discord</Text>
          <Text style={AccountStyling.connected}>Connected</Text>
        </View>
        <Divider />
        <View style={AccountStyling.row}>
          <Text style={AccountStyling.label}>Facebook</Text>
          <Text style={AccountStyling.needsVerification}>Needs Verification</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;
