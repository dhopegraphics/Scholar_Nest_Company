import React, { useState, useRef } from "react";
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
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import imageExport from "../../../assets/images/imageExport";
import { CommonStyle } from "../../../themes/styles_index";

type StackParamList = {
  SignInScreen: undefined;
  Survey: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "SignInScreen"
>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

type SurveyScreenNavigationProp = StackNavigationProp<StackParamList, "Survey">;

interface SurveyScreenProps {
  navigation: SurveyScreenNavigationProp;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [isUsernameFocused, setUsernameFocused] = useState<boolean>(false);
  const [isPasswordFocused, setPasswordFocused] = useState<boolean>(false);
  const [isConfirmPasswordFocused, setConfirmPasswordFocused] =
    useState<boolean>(false);
  const [isEmailFocused, setEmailFocused] = useState<boolean>(false);

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

  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

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

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <SafeAreaView style={CommonStyle.safeArea}>
        <ScrollView
          contentContainerStyle={CommonStyle.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
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
              onFocus={handleUsernameFocus}
            />
            <TextInput
              ref={emailRef}
              style={[
                CommonStyle.input,
                isEmailFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Email"
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
              onFocus={handleConfirmPasswordFocus}
            />
            <TouchableOpacity
              style={CommonStyle.loginButton}
              onPress={() => navigation.navigate("Survey")}
            >
              <Text style={CommonStyle.loginButtonText}>Sign up</Text>
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
            {/* Divider Line */}
            <View style={CommonStyle.divider} />
            <Text style={CommonStyle.firstText}>Already have an account?</Text>
            <View style={CommonStyle.guestSection}>
              <TouchableOpacity
                style={CommonStyle.createAccountButton}
                onPress={() => navigation.navigate("SignInScreen")}
              >
                <Text style={CommonStyle.createAccountButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
