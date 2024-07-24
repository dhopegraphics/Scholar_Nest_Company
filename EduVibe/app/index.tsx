import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator"; // Adjust the path
import "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Entypo } from "@expo/vector-icons"; // Import the icon set you need
import GlobalProvider from "../contexts/GlobalProvider"; // Adjust the path
import { CourseProvider } from "../contexts/CourseContext"; // Adjust the path
import { CourseHeaderProvider } from "../contexts/CourseHeaderContext"; // Adjust the path
import { AuthProvider } from "../contexts/AuthContext"; // Adjust the path
import LottieEduvibeLoader from "../constants/LottieEduvibeLoader"; // Adjust the path

Animated.addWhitelistedNativeProps({ text: true });
SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
          "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
          "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
          DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
          DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
          DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
          ...Entypo.font, // Load Entypo fonts
        });
        // Artificially delay for two seconds to simulate a slow loading experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen once the root view has performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <LottieEduvibeLoader />;
  }

  return (
    <GestureHandlerRootView
      onLayout={onLayoutRootView}
      style={styles.container}
    >
      <StatusBar barStyle="default" backgroundColor="black" />
      <AuthProvider>
        <GlobalProvider>
          <CourseProvider>
            <CourseHeaderProvider>
              <AppNavigator />
            </CourseHeaderProvider>
          </CourseProvider>
        </GlobalProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
