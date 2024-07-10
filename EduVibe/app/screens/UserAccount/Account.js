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
import { AccountStyling } from "../../../themes/AccountStyling";
import { useUsers } from "../../../contexts/UsersContext";

const AccountScreen = ({ navigation }) => {
  const { users } = useUsers(); // Fetch users from context
  const currentUser = users.find((user) => user.id === '1'); // Find the user with ID '1'

  // Default parameter values
  const defaultUsername = currentUser ? currentUser.username : " ";
  const defaultName = currentUser ? currentUser.name : " ";
  const defaultPhone = currentUser ? currentUser.phone : " ";
  const defaultBirthday = currentUser ? currentUser.birthday : " ";
  const defaultCountry = currentUser ? currentUser.country : " ";
  const defaultEmail = currentUser ? currentUser.email : "";

  // State variables
  const [username, setUsername] = useState(defaultUsername);
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState(defaultPhone);
  const [birthday, setBirthday] = useState(defaultBirthday);
  const [country, setCountry] = useState(defaultCountry);
  const [email, setEmail] = useState(defaultEmail);

  const [countryCode, setCountryCode] = useState("GH"); // Default country code

  // Update state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setName(currentUser.name);
      setPhone(currentUser.phone);
      setBirthday(currentUser.birthday);
      setCountry(currentUser.country);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

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
        <Image
          style={AccountStyling.avatar}
          source={{ uri: currentUser ? currentUser.img : "https://placekitten.com/200/200" }}
        />
        <TouchableOpacity style={AccountStyling.cameraIconContainer}>
          <Icon name="camera-alt" size={24} color="white" />
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
