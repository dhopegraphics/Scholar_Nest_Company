import { View, Text, Image } from "react-native";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import React from "react";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import { onboardingSwiperData } from "../../../constants/Constants";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
//import { commonStyles } from "@/styles/common/common.styles";
import { welcomeStyles } from "../../../themes/WelcomeStyles";
import { styles } from "../../../themes/OnboardingStyles";

type StackParamList = {
  WelcomeIntro: undefined;
  SignInScreen: undefined;
};

type WelcomeIntroScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "SignInScreen"
>;

const WelcomeIntroScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeIntroScreenNavigationProp>();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderItem = ({ item }: { item: onboardingSwiperDataType }) => (
    <LinearGradient
      colors={["#E5ECF9", "F6F7F9", "#E8EEF9"]}
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
      <View style={{ marginTop: 80 }}>
        <Image
          source={item.image}
          style={{ alignSelf: "center", marginBottom: 30 }}
        />
        <Text style={[welcomeStyles.title, { fontFamily: "Raleway_700Bold" }]}>
          {item.title}
        </Text>
        <View style={{ marginTop: 15 }}>
          <Text
            style={[
              welcomeStyles.description,
              { fontFamily: "Nunito_400Regular" },
            ]}
          >
            {item.description}
          </Text>
          <Text
            style={[
              welcomeStyles.description,
              { fontFamily: "Nunito_400Regular" },
            ]}
          >
            {item.sortDescrition}
          </Text>
          <Text
            style={[
              welcomeStyles.description,
              { fontFamily: "Nunito_400Regular" },
            ]}
          >
            {item.sortDescrition2}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        navigation.navigate("SignInScreen");
      }}
      onSkip={() => {
        navigation.navigate("SignInScreen");
      }}
      renderNextButton={() => (
        <View style={styles.welcomeButtonStyle}>
          <Text
            style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
          >
            Next
          </Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.welcomeButtonStyle}>
          <Text
            style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
          >
            Done
          </Text>
        </View>
      )}
      showSkipButton={false}
      dotStyle={welcomeStyles.dotStyle}
      bottomButton={true}
      activeDotStyle={welcomeStyles.activeDotStyle}
    />
  );
};

export default WelcomeIntroScreen;
