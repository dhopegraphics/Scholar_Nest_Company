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
  ChangePasswordScreen: undefined;
};

type ChangePasswordScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "ChangePasswordScreen"
>;

interface ChangePasswordScreenProp {
  navigation: ChangePasswordScreenNavigationProp;
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProp> = ({
  navigation,
}) => {
  const [isCurrentPasswordFocused, setCurrentPasswordFocused] =
    useState<boolean>(false);
  const [isNewPasswordFocused, setNewPasswordFocused] =
    useState<boolean>(false);
  const [isConfirmNewPasswordFocused, setConfirmNewPasswordFocused] =
    useState<boolean>(false);

  const handleCurrentPasswordFocus = () => {
    setCurrentPasswordFocused(true);
    setNewPasswordFocused(false);
    setConfirmNewPasswordFocused(false);
  };

  const handleNewPasswordFocus = () => {
    setCurrentPasswordFocused(true);
    setNewPasswordFocused(false);
    setConfirmNewPasswordFocused(false);
  };
  const handleConfirmNewPasswordFocus = () => {
    setCurrentPasswordFocused(true);
    setNewPasswordFocused(false);
    setConfirmNewPasswordFocused(false);
  };

  const currentPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmNewPasswordRef = useRef<TextInput>(null);

  const handleScreenTap = () => {
    if (currentPasswordRef.current) {
      currentPasswordRef.current.blur();
    }
    if (newPasswordRef.current) {
      newPasswordRef.current.blur();
    }
    if (confirmNewPasswordRef.current) {
      confirmNewPasswordRef.current.blur();
    }
    setCurrentPasswordFocused(false);
    setNewPasswordFocused(false);
    setConfirmNewPasswordFocused(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <SafeAreaView style={CommonStyle.safeArea}>
        <ScrollView
          contentContainerStyle={CommonStyle.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={CommonStyle.passwordContainer}>
            <Image source={imageExport.logo} style={CommonStyle.logo} />
            <Text style={CommonStyle.loginText}>Change Password</Text>

            <TextInput
              ref={currentPasswordRef}
              style={[
                CommonStyle.input,
                isCurrentPasswordFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Current Password"
              onFocus={handleCurrentPasswordFocus}
            />
            <TextInput
              ref={newPasswordRef}
              style={[
                CommonStyle.input,
                isNewPasswordFocused && CommonStyle.focusedInput,
              ]}
              placeholder="New Password"
              secureTextEntry={true}
              onFocus={handleNewPasswordFocus}
            />
            <TextInput
              ref={confirmNewPasswordRef}
              style={[
                CommonStyle.input,
                isConfirmNewPasswordFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              onFocus={handleConfirmNewPasswordFocus}
            />
            <TouchableOpacity style={CommonStyle.loginButton}>
              <Text style={CommonStyle.loginButtonText}>Update Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;
