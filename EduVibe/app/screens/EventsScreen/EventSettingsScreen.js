import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Animated, Easing, TouchableOpacity } from 'react-native';
import { useSettings } from './SettingsContext';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for gradient backgrounds
import Ionicons from 'react-native-vector-icons/Ionicons';

const EventSettingsScreen = () => {
  const { settings, updateSettings } = useSettings();
  const [themeColor, setThemeColor] = useState(settings.themeColor);
  const [textColor, setTextColor] = useState(settings.textColor);
  const [avatarBackgroundColor, setAvatarBackgroundColor] = useState(settings.avatarBackgroundColor);
  const [saving, setSaving] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation value for fade-in effect

  const handleSaveSettings = () => {
    setSaving(true); // Start saving animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      updateSettings({ themeColor, textColor, avatarBackgroundColor });
      setSaving(false); // End saving animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(); // Reset animation value
    });
  };

  return (
    <LinearGradient // Use LinearGradient for a gradient background
      colors={['#00c6ff', '#0072ff']} // Gradient colors
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Event Settings</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Theme Color"
            value={themeColor}
            onChangeText={setThemeColor}
            placeholderTextColor="#fff" // Placeholder text color
          />
          <TextInput
            style={styles.input}
            placeholder="Text Color"
            value={textColor}
            onChangeText={setTextColor}
            placeholderTextColor="#fff" // Placeholder text color
          />
          <TextInput
            style={styles.input}
            placeholder="Avatar Background Color"
            value={avatarBackgroundColor}
            onChangeText={setAvatarBackgroundColor}
            placeholderTextColor="#fff" // Placeholder text color
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveSettings}
          disabled={saving} // Disable button during saving animation
        >
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>
        {/* Saving Animation */}
        {saving && (
          <Animated.View style={[styles.savingIndicator, { opacity: fadeAnim }]}>
            <Ionicons name="refresh" size={32} color="#fff" />
            <Text style={styles.savingText}>Saving...</Text>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Title text color
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#fff', // Input border color
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff', // Input text color
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  savingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  savingText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
});

export default EventSettingsScreen;
