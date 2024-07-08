import React, { useState } from 'react';
import {
  UserSettingsStylesheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useUsers } from '../../../contexts/UsersContext';
import { UserSettingsStyles } from '../../../contexts/UserSettingsStyles';

const UserSettings = ({ navigation }) => {
  const { users } = useUsers();
  const currentUser = users.find((user) => user.id === '1');

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  if (!currentUser) {
    return null; // or a loading indicator
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={UserSettingsStyles.container}>
        <View style={UserSettingsStyles.header}>
          <View style={UserSettingsStyles.headerAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <FeatherIcon
                color="#000"
                name="arrow-left"
                size={24} />
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={UserSettingsStyles.headerTitle}>
            Settings
          </Text>

          <View style={[UserSettingsStyles.headerActionRight, {  }]}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <FeatherIcon
                color="#000"
                name="more-vertical"
                size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={UserSettingsStyles.content}>
          <View style={[UserSettingsStyles.section, { paddingTop: 4 }]}>
            <Text style={UserSettingsStyles.sectionTitle}>Account</Text>

            <View style={UserSettingsStyles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Account")
                }}
                style={UserSettingsStyles.profile}>
                <Image
                  alt=""
                  source={{ uri: currentUser.img }}
                  style={UserSettingsStyles.profileAvatar} />

                <View style={UserSettingsStyles.profileBody}>
                  <Text style={UserSettingsStyles.profileName}>{currentUser.name}</Text>
                  <Text style={UserSettingsStyles.profileHandle}>{currentUser.email}</Text>
                </View>

                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={UserSettingsStyles.section}>
            <Text style={UserSettingsStyles.sectionTitle}>Preferences</Text>

            <View style={UserSettingsStyles.sectionBody}>
              <View style={[UserSettingsStyles.rowWrapper, UserSettingsStyles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Language</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <Text style={UserSettingsStyles.rowValue}>English</Text>

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={UserSettingsStyles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Location</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <Text style={UserSettingsStyles.rowValue}>Los Angeles, CA</Text>

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={UserSettingsStyles.rowWrapper}>
                <View style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Email Notifications</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <Switch
                    onValueChange={emailNotifications =>
                      setForm({ ...form, emailNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.emailNotifications} />
                </View>
              </View>

              <View style={[UserSettingsStyles.rowWrapper, UserSettingsStyles.rowLast]}>
                <View style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Push Notifications</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <Switch
                    onValueChange={pushNotifications =>
                      setForm({ ...form, pushNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.pushNotifications} />
                </View>
              </View>
            </View>
          </View>

          <View style={UserSettingsStyles.section}>
            <Text style={UserSettingsStyles.sectionTitle}>Resources</Text>

            <View style={UserSettingsStyles.sectionBody}>
              <View style={[UserSettingsStyles.rowWrapper, UserSettingsStyles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Contact Us</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={UserSettingsStyles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Report Bug</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>

              <View style={[UserSettingsStyles.rowWrapper, UserSettingsStyles.rowLast]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={UserSettingsStyles.row}>
                  <Text style={UserSettingsStyles.rowLabel}>Terms of Service</Text>

                  <View style={UserSettingsStyles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};



export default UserSettings;
