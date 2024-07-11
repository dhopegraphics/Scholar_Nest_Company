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
  ActivityIndicator,
  Alert
} from "react-native";
import {
  Entypo,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../../../lib/appwrite";
import imageExport from "../../../assets/images/imageExport";
import { CommonStyle } from "../../../themes/styles_index";

const SignInScreen = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    password: "",
  });

  const handlePasswordValidation = (value) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacter.test(password)) {
      setError({
        ...error,
        password: "Write at least one special character",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: "Write at least one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: "Write at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({
        ...error,
        password: "",
      });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
    setPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setUsernameFocused(false);
    setPasswordFocused(true);
  };

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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

  const handleLogin = async () => {
    try {
      setButtonSpinner(true);
      // Perform client-side validation if needed before calling signIn
      await signIn(userInfo.email, userInfo.password);
      setButtonSpinner(false);
      navigation.navigate("Back");
    } catch (error) {
      setButtonSpinner(false);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={CommonStyle.safeArea}>
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <ScrollView
          contentContainerStyle={CommonStyle.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={CommonStyle.container}>
            <Image source={imageExport.logo} style={CommonStyle.logo} />
            <Text style={CommonStyle.loginText}>Log in</Text>
            <View>
              <TextInput
                ref={usernameRef}
                style={[
                  CommonStyle.input1,
                  isUsernameFocused && CommonStyle.focusedInput,
                ]}
                placeholder="Username"
                onFocus={handleUsernameFocus}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, email: value })
                }
              />
              <Fontisto
                style={{ position: "absolute", left: 26, top: 17.8 }}
                name="email"
                size={20}
                color={"#A1A1A1"}
              />
              {error.password && (
                <View style={CommonStyle.errorContainer}>
                  <Entypo name="cross" size={18} color={"red"} />
                </View>
              )}
              <View>
                <TextInput
                  ref={passwordRef}
                  style={[
                    CommonStyle.input1,
                    isPasswordFocused && CommonStyle.focusedInput,
                  ]}
                  placeholder="Password"
                  onFocus={handlePasswordFocus}
                  secureTextEntry={!isPasswordVisible}
                  defaultValue=""
                  onChangeText={handlePasswordValidation}
                />
                <TouchableOpacity
                  style={CommonStyle.visibleIcon}
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <Ionicons
                      name="eye-off-outline"
                      size={23}
                      color={"#747474"}
                    />
                  ) : (
                    <Ionicons name="eye-outline" size={23} color={"#747474"} />
                  )}
                </TouchableOpacity>
                <SimpleLineIcons
                  style={CommonStyle.icon2}
                  name="lock"
                  size={20}
                  color={"#A1A1A1"}
                />
              </View>
              {error.password && (
                <View style={[CommonStyle.errorContainer, { top: 125 }]}>
                  <Entypo name="cross" size={18} color={"red"} />
                  <Text style={{ color: "red", fontSize: 11, marginTop: 0 }}>
                    {error.password}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPasswordForm")}
              >
                <Text style={CommonStyle.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={CommonStyle.loginButton}
                onPress={handleLogin}
              >
                {buttonSpinner ? (
                  <ActivityIndicator size="small" color={"white"} />
                ) : (
                  <Text style={CommonStyle.loginButtonText}>Login</Text>
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
              <Text style={CommonStyle.firstText}>
                Is this your first time here?
              </Text>
              <View style={CommonStyle.guestSection}>
                <Text style={CommonStyle.guestText}>
                  To browse the community discussions about Edu Vibe, you can
                  log in as a guest.
                </Text>
                <Text style={CommonStyle.guestText}>
                  To participate in the discussions, you will need to have an
                  account. You can either create an account by clicking the
                  button below and completing a form, or have an account created
                  automatically by logging in using your account on another
                  site.
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
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignInScreen;
