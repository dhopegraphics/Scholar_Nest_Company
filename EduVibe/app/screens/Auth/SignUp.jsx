import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import imageExport from '../../../assets/images/imageExport';
import { CommonStyle } from '../../../themes/styles_index';
import { createUser } from '../../../lib/appwrite'; // Adjusted import statement

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
    setPasswordFocused(false);
    setConfirmPasswordFocused(false);
    setEmailFocused(false);
  };

  const handleEmailFocus = () => {
    setUsernameFocused(false);
    setPasswordFocused(false);
    setConfirmPasswordFocused(false);
    setEmailFocused(true);
  };

  const handlePasswordFocus = () => {
    setUsernameFocused(false);
    setPasswordFocused(true);
    setConfirmPasswordFocused(false);
    setEmailFocused(false);
  };

  const handleConfirmPasswordFocus = () => {
    setUsernameFocused(false);
    setPasswordFocused(false);
    setConfirmPasswordFocused(true);
    setEmailFocused(false);
  };

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleScreenTap = () => {
    if (usernameRef.current) {
      usernameRef.current.blur();
    }
    if (emailRef.current) {
      emailRef.current.blur();
    }
    if (passwordRef.current) {
      passwordRef.current.blur();
    }
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.blur();
    }
    setUsernameFocused(false);
    setEmailFocused(false);
    setPasswordFocused(false);
    setConfirmPasswordFocused(false);
    Keyboard.dismiss();
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setButtonSpinner(true);
      await createUser( email, password, username, );
      setButtonSpinner(false);
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('Survey'); // Navigate to SignInScreen after successful registration
    } catch (error) {
      setButtonSpinner(false);
      Alert.alert('Error', error.message);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={CommonStyle.safeArea}>
      <ScrollView
        contentContainerStyle={CommonStyle.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={handleScreenTap}>
          <View style={CommonStyle.container}>
            <Image source={imageExport.logo} style={CommonStyle.logo} />
            <Text style={CommonStyle.loginText}>Sign up</Text>
            <TextInput
              ref={usernameRef}
              style={[
                CommonStyle.input,
                isUsernameFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              onFocus={handleUsernameFocus}
            />
            <TextInput
              ref={emailRef}
              style={[
                CommonStyle.input,
                isEmailFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onFocus={handleEmailFocus}
            />
            <TextInput
              ref={passwordRef}
              style={[
                CommonStyle.input,
                isPasswordFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              onFocus={handlePasswordFocus}
            />
            <TextInput
              ref={confirmPasswordRef}
              style={[
                CommonStyle.input,
                isConfirmPasswordFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={handleConfirmPasswordFocus}
            />
            <TouchableOpacity
              style={CommonStyle.loginButton}
              onPress={handleSignUp}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color={'white'} />
              ) : (
                <Text style={CommonStyle.loginButtonText}>Sign up</Text>
              )}
            </TouchableOpacity>
            <View style={CommonStyle.buttonContainer}>
              <TouchableOpacity style={CommonStyle.googleButton}>
                <Image
                  source={imageExport.googleIcon}
                  style={CommonStyle.buttonIcon}
                />
                <Text style={CommonStyle.buttonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={CommonStyle.microsoftButton}>
                <Image
                  source={imageExport.microsoftIcon}
                  style={CommonStyle.buttonIcon}
                />
                <Text style={CommonStyle.buttonText}>Microsoft</Text>
              </TouchableOpacity>
            </View>
            <View style={CommonStyle.divider} />
            <Text style={CommonStyle.firstText}>Already have an account?</Text>
            <View style={CommonStyle.guestSection}>
              <TouchableOpacity
                style={CommonStyle.createAccountButton}
                onPress={() => navigation.navigate('SignInScreen')}
              >
                <Text style={CommonStyle.createAccountButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
