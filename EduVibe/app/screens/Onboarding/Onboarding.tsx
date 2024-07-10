import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "../../../themes/OnboardingStyles";
import { useNavigation } from "@react-navigation/native";
import imageExport from "../../../assets/images/imageExport";

type StackParamList = {
  Onboarding: undefined;
  WelcomeIntroScreen: undefined;
};

type OnboardingNavigationProp = StackNavigationProp<
  StackParamList,
  "WelcomeIntroScreen"
>;

const OnBoardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.firstContainer}>
        <View>
          <Image source={imageExport.onBoardLogo} style={styles.logo} />
          <Image source={imageExport.shape9} />
        </View>
        <View style={styles.titleWrapper}>
          <Image style={styles.titleTextShape1} source={imageExport.shape3} />
          <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
            Start Learning With
          </Text>
          <Image style={styles.titleTextShape2} source={imageExport.shape3} />
        </View>
        <View>
          <Image style={styles.titleShape3} source={imageExport.shape6} />
          <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
            EduVibe
          </Text>
        </View>
        <View style={styles.dscpWrapper}>
          <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
            Explore a variety of interactive lesson,
          </Text>
          <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
            video, quizze & assignment.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => navigation.navigate("WelcomeIntroScreen")}
        >
          <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
            Getting Started
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default OnBoardingScreen;
