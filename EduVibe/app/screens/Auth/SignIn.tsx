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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import imageExport from "../../../assets/images/imageExport";
import { CommonStyle } from "../../../themes/styles_index";
// Define the navigation prop types
type StackParamList = {
  SignUpScreen: undefined;
  Back: undefined;
  ForgotPasswordForm :undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "SignUpScreen"
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const SignInScreen: React.FC<LoginScreenProps> = (props) => {
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
    setPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setUsernameFocused(false);
    setPasswordFocused(true);
  };

  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleScreenTap = () => {
    if (usernameRef.current) {
      usernameRef.current.blur();
    }
    if (passwordRef.current) {
      passwordRef.current.blur();
    }
    setUsernameFocused(false);
    setPasswordFocused(false);
    Keyboard.dismiss();
  };

  return (

      <SafeAreaView style={CommonStyle.safeArea}>
            <TouchableWithoutFeedback onPress={handleScreenTap}>
        <ScrollView
          contentContainerStyle={CommonStyle.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={CommonStyle.container}>
            <Image source={imageExport.SecondLogo} style={CommonStyle.logo} />
            <Text style={CommonStyle.loginText}>Log in</Text>
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
              ref={passwordRef}
              style={[
                CommonStyle.input,
                isPasswordFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Password"
              secureTextEntry={true}
              onFocus={handlePasswordFocus}
            />
            <TouchableOpacity
              style={CommonStyle.loginButton}
              onPress={() => navigation.navigate("Back")}
            >
              <Text style={CommonStyle.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("ForgotPasswordForm")} >
              <Text style={CommonStyle.forgotPassword}>Forgot Password?</Text>
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
            <Text style={CommonStyle.firstText}>
              Is this your first time here?
            </Text>
            <View style={CommonStyle.guestSection}>
              <Text style={CommonStyle.guestText}>
                To browse the community discussions about Edu Vibe, you can log
                in as a guest.
              </Text>
              <Text style={CommonStyle.guestText}>
                To participate in the discussions, you will need to have an
                account. You can either create an account by clicking the button
                below and completing a form, or have an account created
                automatically by logging in using your account on another site.
              </Text>
              <TouchableOpacity
                style={CommonStyle.createAccountButton}
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                <Text style={CommonStyle.createAccountButtonText}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
  
  );
};

export default SignInScreen;
