import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LottieEduvibeLoader({ navigation }) {
  const animation = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 5000); // Ensure this matches the animation duration or slightly exceeds it

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleAnimationFinish = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop={false} // Ensure the animation does not loop
        ref={animation}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#eee",
        }}
        source={require("../assets/EduVibeOrgGif.json")}
        onAnimationFinish={handleAnimationFinish}
      />
      <View style={styles.buttonContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
