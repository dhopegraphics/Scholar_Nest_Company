import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useUsers } from "../../../contexts/UsersContext";
import { UserSettingsStyles } from "../../../themes/UserSettingsStyles";

const UserSettings = ({ navigation }) => {
  const { users, currentUserId } = useUsers();
  const currentUser = users.find((user) => user.id === currentUserId);

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
    language: "English",
    location: "Los Angeles, CA",
  });

  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  const languages = [
    { key: "en", label: "English" },
    { key: "es", label: "Spanish" },
    { key: "fr", label: "French" },
    { key: "de", label: "German" },
    { key: "zh", label: "Chinese" },
    // Add more languages here
  ];

  const cities = [
    "Los Angeles, CA",
    "New York, NY",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    // Add more cities here
  ];

  if (!currentUser) {
    return null; // or a loading indicator
  }

  const handleLanguageSelect = (language) => {
    setForm({ ...form, language });
    setLanguageModalVisible(false);
  };

  const handleLocationSelect = (location) => {
    setForm({ ...form, location });
    setLocationModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={UserSettingsStyles.container}>
        <View style={UserSettingsStyles.header}>
          <View style={UserSettingsStyles.headerAction}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon color="#000" name="arrow-left" size={24} />
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={UserSettingsStyles.headerTitle}>
            Settings
          </Text>

          <View style={UserSettingsStyles.headerActionRight} />
        </View>

        <ScrollView contentContainerStyle={UserSettingsStyles.content}>
          <View style={[UserSettingsStyles.section, { paddingTop: 4 }]}>
            <Text style={UserSettingsStyles.sectionTitle}>Account</Text>

            <View style={UserSettingsStyles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Account");
                }}
                style={UserSettingsStyles.profile}
              >
                <Image
                  alt=""
                  source={{ uri: currentUser.img }}
                  style={UserSettingsStyles.profileAvatar}
                />

                <View style={UserSettingsStyles.profileBody}>
                  <Text style={UserSettingsStyles.profileName}>
                    {currentUser.name}
                  </Text>
                  <Text style={UserSettingsStyles.profileHandle}>
                    {currentUser.email}
                  </Text>
                </View>

                <FeatherIcon color="#bcbcbc" name="chevron-right" size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={UserSettingsStyles.section}>
            <Text style={UserSettingsStyles.sectionTitle}>Preferences</Text>

            <View style={UserSettingsStyles.sectionBody}>
              <View
                style={[
                  UserSettingsStyles.rowWrapper,
                  UserSettingsStyles.rowFirst,
                ]}
              >
                <TouchableOpacity
                  style={UserSettingsStyles.row}
                  onPress={() => setLanguageModalVisible(true)}
                >
                  <Text style={UserSettingsStyles.rowLabel}>Language</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <Text style={UserSettingsStyles.rowValue}>
                    {form.language}
                  </Text>

                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>

              <View style={UserSettingsStyles.rowWrapper}>
                <TouchableOpacity
                  style={UserSettingsStyles.row}
                  onPress={() => setLocationModalVisible(true)}
                >
                  <Text style={UserSettingsStyles.rowLabel}>Location</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <Text style={UserSettingsStyles.rowValue}>
                    {form.location}
                  </Text>

                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>

              <View style={UserSettingsStyles.rowWrapper}>
                <View style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>
                    Email Notifications
                  </Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <Switch
                    onValueChange={(emailNotifications) =>
                      setForm({ ...form, emailNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.emailNotifications}
                  />
                </View>
              </View>

              <View
                style={[
                  UserSettingsStyles.rowWrapper,
                  UserSettingsStyles.rowLast,
                ]}
              >
                <View style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>
                    Push Notifications
                  </Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <Switch
                    onValueChange={(pushNotifications) =>
                      setForm({ ...form, pushNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.pushNotifications}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={UserSettingsStyles.section}>
            <Text style={UserSettingsStyles.sectionTitle}>Resources</Text>

            <View style={UserSettingsStyles.sectionBody}>
              <View
                style={[
                  UserSettingsStyles.rowWrapper,
                  UserSettingsStyles.rowFirst,
                ]}
              >
                <TouchableOpacity style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Contact Us</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>

              <View style={UserSettingsStyles.rowWrapper}>
                <TouchableOpacity style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Report Bug</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>

              <View
                style={[
                  UserSettingsStyles.rowWrapper,
                  UserSettingsStyles.rowLast,
                ]}
              >
                <TouchableOpacity style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>
                    Terms of Service
                  </Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={() => {
          setLanguageModalVisible(!isLanguageModalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={languages}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleLanguageSelect(item.label)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.key}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isLocationModalVisible}
        onRequestClose={() => {
          setLocationModalVisible(!isLocationModalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <FlatList
              data={cities}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleLocationSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setLocationModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#1C9C9D",
    width: 70,
    height: 30,
    padding: 5,
    borderRadius: 20,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",
  },
});

export default UserSettings;
