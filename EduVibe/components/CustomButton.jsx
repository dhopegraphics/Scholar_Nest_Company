import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
  disabled,
}) => {
  const navigation = useNavigation(); // Get navigation object from React Navigation

  const handlePress = () => {
    if (onPress) {
      onPress(); // Call the onPress function passed from parent component
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading ? styles.disabledButton : {},
        disabled ? styles.disabledButton : {},
      ]}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#fff"
          size="small"
          style={styles.activityIndicator}
        />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    minHeight: 62,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.5,
  },
  activityIndicator: {
    marginLeft: 10,
  },
});

export default CustomButton;
