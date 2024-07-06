import React, { useState } from "react";
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

const AccountScreen = ({navigation}) => {
  const [username, setUsername] = useState("@johndoe");
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("(123) 456-7890");
  const [birthday, setBirthday] = useState("May 5th, 1996");
  const [country, setCountry] = useState("United States");
  const [email, setEmail] = useState("john@example.com");
  const [countryCode, setCountryCode] = useState("US"); // Default country code

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={24}
          onPress={() => navigation.navigate("Back")}
        />
        <Text style={styles.headerText}>Account</Text>
        <Icon
          name="more-vert"
          size={24}
          onPress={() => console.log("Menu Pressed")}
        />
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://placekitten.com/200/200" }}
        />
        <TouchableOpacity style={styles.cameraIconContainer}>
          <Icon name="camera-alt" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
        {/* Username input */}
        <View style={styles.row}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.value}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <Divider />
        {/* Name input */}
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.value}
            value={name}
            onChangeText={setName}
          />
        </View>
        <Divider />
        {/* Phone input with Country Picker */}
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <View style={styles.phoneInputContainer}>
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
              style={styles.value}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <Divider />
        {/* Birthday input */}
        <View style={styles.row}>
          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={styles.value}
            value={birthday}
            onChangeText={setBirthday}
          />
        </View>
        <Divider />
        {/* Country input */}
        <View style={styles.row}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.value}
            value={country}
            onChangeText={setCountry}
          />
        </View>
      </View>

      {/* Login Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LOGIN INFORMATION</Text>
        {/* Email input */}
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.value}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <Divider />
        {/* Update password button */}
        <TouchableOpacity  onPress={() => navigation.navigate("ChangePasswordScreen")} >
          <View style={styles.row}>
            <Text style={styles.label}>Update password</Text>
            <Icon name="chevron-right" size={24} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Social Accounts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SOCIAL ACCOUNTS</Text>
        {/* Social accounts details */}
        <View style={styles.row}>
          <Text style={styles.label}>Apple</Text>
          <Text style={styles.connected}>Connected</Text>
        </View>
        <Divider />
        <View style={styles.row}>
          <Text style={styles.label}>Discord</Text>
          <Text style={styles.connected}>Connected</Text>
        </View>
        <Divider />
        <View style={styles.row}>
          <Text style={styles.label}>Facebook</Text>
          <Text style={styles.needsVerification}>Needs Verification</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#007AFF",
    borderRadius: 15,
    padding: 5,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    textAlign: "right",
  },
  connected: {
    fontSize: 16,
    color: "green",
  },
  needsVerification: {
    fontSize: 16,
    color: "red",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight : 50,
  },
});

export default AccountScreen;