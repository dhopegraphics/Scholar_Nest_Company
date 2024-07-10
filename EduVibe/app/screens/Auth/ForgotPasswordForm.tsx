// src/components/ForgotPasswordForm.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_400Regular,
} from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
type StackParamList = {
  SignInScreen: undefined;
  Back: undefined;
};
type ForgotPasswordFormNavigationProp = StackNavigationProp<
  StackParamList,
  "SignInScreen"
>;
interface ForgotPasswordFormProps {
  navigation: ForgotPasswordFormNavigationProp;
}
const ForgotPasswordForm: React.FC = (props) => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation<ForgotPasswordFormNavigationProp>();
  const handleSendEmail = () => {
    // Validate email format (you can use a library like 'validator')
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    // Send email to backend for password reset
    // Implement your API call here
    // Example: axios.post('/api/forgot-password', { email });

    // Show success message or navigate to a confirmation screen
    alert("Reset link sent! Check your email.");
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
      <Text style={[styles.headerText, { fontFamily: "Nunito_600SemiBold" }]}>
        Reset Email Password
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Nunito_400Regular" }]}
        placeholder="Username@gmail.com"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}>
          Send
        </Text>
      </TouchableOpacity>
      <View style={styles.loginLink}>
        <Text style={[styles.backText, { fontFamily: "Nunito_700Bold" }]}>
          Back To?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
          <Text style={[styles.loginText, { fontFamily: "Nunito_700Bold" }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3876EE",
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  loginLink: {
    flexDirection: "row",
    marginTop: 30,
  },
  loginText: {
    color: "#3876EE",
    marginLeft: 5,
    fontSize: 16,
  },

  backText: { fontSize: 16 },
});

export default ForgotPasswordForm;
