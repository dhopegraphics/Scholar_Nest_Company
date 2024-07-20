import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Adjust the path
import 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import GlobalProvider from '../contexts/GlobalProvider';
import * as Font from 'expo-font';
import { Entypo } from '@expo/vector-icons'; // Import the icon set you need
import { CourseProvider } from '../contexts/CourseContext';
import { CourseHeaderProvider } from '../contexts/CourseHeaderContext';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Roboto-Black": require('../assets/fonts/Roboto-Black.ttf'),
          "Roboto-Bold": require('../assets/fonts/Roboto-Bold.ttf'),
          "Roboto-Regular": require('../assets/fonts/Roboto-Regular.ttf'),
          DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
          DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
          DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
          ...Entypo.font, // Load Entypo fonts
        });
        // Artificially delay for two seconds to simulate a slow loading experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
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
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <StatusBar barStyle="default" backgroundColor="black" />
     
      <GlobalProvider>
        <CourseProvider>
      <CourseHeaderProvider>
        <AppNavigator />
      </CourseHeaderProvider>
      </CourseProvider>
      </GlobalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
