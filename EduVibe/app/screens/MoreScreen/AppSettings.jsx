import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const AppSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
    // You can implement logic to handle notification settings here
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled((prev) => !prev);
    // You can implement logic to handle dark mode settings here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>App Settings</Text>

      <View style={styles.settingRow}>
        <Text>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      <View style={styles.settingRow}>
        <Text>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>

      {/* Add more settings here as needed */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default AppSettings;
