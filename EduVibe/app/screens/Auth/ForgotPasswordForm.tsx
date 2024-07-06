// src/components/ForgotPasswordForm.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    // Validate email format (you can use a library like 'validator')
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    // Send email to backend for password reset
    // Implement your API call here
    // Example: axios.post('/api/forgot-password', { email });

    // Show success message or navigate to a confirmation screen
    alert('Reset link sent! Check your email.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter the email address associated with your account. We will email you a link to reset your password.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email Address"
        onChangeText={setEmail}
        value={email}
      />
      <Button title="Send" onPress={handleSendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default ForgotPasswordForm;
