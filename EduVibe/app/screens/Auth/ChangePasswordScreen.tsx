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
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import imageExport from "../../../assets/images/imageExport";
import { CommonStyle } from "../../../themes/styles_index";
import RBSheet from "react-native-raw-bottom-sheet"; // Import RBSheet from the package
import FeatherIcon from "react-native-vector-icons/Feather";
import { Icon } from "react-native-paper";

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
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false); // State to manage sheet visibility

  const handleCurrentPasswordFocus = () => {
    setCurrentPasswordFocused(true);
    setNewPasswordFocused(false);
    setConfirmNewPasswordFocused(false);
  };

  const handleNewPasswordFocus = () => {
    setCurrentPasswordFocused(false);
    setNewPasswordFocused(true);
    setConfirmNewPasswordFocused(false);
  };

  const handleConfirmNewPasswordFocus = () => {
    setCurrentPasswordFocused(false);
    setNewPasswordFocused(false);
    setConfirmNewPasswordFocused(true);
  };

  const currentPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmNewPasswordRef = useRef<TextInput>(null);
  const sheetRef = useRef<any>(null); // Use any type for sheetRef

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

  const handleUpdateNow = () => {
    if (sheetRef.current) {
      sheetRef.current.open(); // Open the sheet
    }
  };

  const handleSheetClose = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    } // Close the sheet
  };

  const savePassword = () => {
    // Implement your save password logic here
    console.log("Saving password...");
    // Close the sheet after saving
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  return (
    <SafeAreaView style={CommonStyle.safeArea}>
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <ScrollView
          contentContainerStyle={CommonStyle.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={CommonStyle.passwordContainer}>
            <Image source={imageExport.logo} style={CommonStyle.logo} />
            <Text style={CommonStyle.loginText}>Change Password</Text>

            <TextInput
              selectionColor={"#1C9C9D"}
              ref={currentPasswordRef}
              style={[
                CommonStyle.input,
                isCurrentPasswordFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Current Password"
              onFocus={handleCurrentPasswordFocus}
            />
            <TextInput
              selectionColor={"#1C9C9D"}
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
              selectionColor={"#1C9C9D"}
              ref={confirmNewPasswordRef}
              style={[
                CommonStyle.input,
                isConfirmNewPasswordFocused && CommonStyle.focusedInput,
              ]}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              onFocus={handleConfirmNewPasswordFocus}
            />
            <TouchableOpacity
              style={CommonStyle.loginButton}
              onPress={handleUpdateNow} // Call handleUpdateNow to open the sheet
            >
              <Text style={CommonStyle.loginButtonText}>Update Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <RBSheet
        ref={(ref) => (sheetRef.current = ref)} // Assign ref properly
        customStyles={{ container: styles.sheet }}
        height={360}
        openDuration={250}
        onClose={handleSheetClose}
      >
        <View style={styles.sheetContainer}>
          <FeatherIcon
            name="shield"
            color="#2b64e3"
            size={48}
            style={{ alignSelf: "center" }}
          />
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.message}>
            Changing your password regularly enhances security and helps protect
            your account.Remember to keep your password secure and avoid sharing
            it with anyone.
          </Text>
          <TouchableOpacity onPress={savePassword}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Confirm</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSheetClose}>
            <View
              style={[
                styles.btn,
                {
                  marginTop: 12,
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                },
              ]}
            >
              <Text style={[styles.btnText, { color: "#2b64e3" }]}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  sheetContainer: {
    padding: 24,
    alignItems: "stretch",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#181818",
    marginTop: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#2b64e3",
    borderColor: "#2b64e3",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default ChangePasswordScreen;
