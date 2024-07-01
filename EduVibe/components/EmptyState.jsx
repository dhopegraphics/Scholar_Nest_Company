import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import imageExport from "../assets/images/imageExport";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const EmptyState = ({ title, subtitle, size }) => {
  const navigation = useNavigation(); // Get navigation object from React Navigation

  // Define dynamic styles based on size prop
  const containerStyles =
    size === "small" ? styles.smallContainer : styles.largeContainer;
  const titleStyles = size === "small" ? styles.smallTitle : styles.largeTitle;
  const subtitleStyles =
    size === "small" ? styles.smallSubtitle : styles.largeSubtitle;

  const handleButtonPress = () => {
    navigation.navigate("Dashboard"); // Navigate to DashScreen
  };

  return (
    <View style={[containerStyles, styles.centered]}>
      <Image
        source={imageExport.empty}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={[styles.title, titleStyles]}>{title}</Text>
      <Text style={[styles.subtitle, subtitleStyles]}>{subtitle}</Text>
      <CustomButton
        title="Back to Explore"
        onPress={handleButtonPress} // Pass the handleButtonPress function
        containerStyles={styles.buttonContainer}
        textStyles={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  smallContainer: {
    padding: 10,
  },
  largeContainer: {
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    color: "white",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center", // Centering the subtitle text
    marginTop: 10,
  },
  smallTitle: {
    fontSize: 14,
  },
  largeTitle: {
    fontSize: 18,
  },
  smallSubtitle: {
    fontSize: 18,
  },
  largeSubtitle: {
    fontSize: 24,
  },
  buttonContainer: {
    marginTop: 30,
    width: 150,
    height: 20,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 200,
    color: "white",
  },
});

export default EmptyState;
