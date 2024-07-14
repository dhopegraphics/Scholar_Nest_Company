import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Adjust the path
import 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GlobalProvider from '../contexts/GlobalProvider';
import { useFonts } from 'expo-font';




const App: React.FC = () => {
  const [loaded] = useFonts({
    "Roboto-Black" : require('../assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold" : require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular" : require('../assets/fonts/Roboto-Regular.ttf'),
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
})

if(!loaded){
return null;
}
  return (
    <>
 
     <GestureHandlerRootView>
      <StatusBar barStyle="default" backgroundColor="black" />
      <GlobalProvider>
      <AppNavigator />
      </GlobalProvider>
      </GestureHandlerRootView>

    </>
  );
};

export default App;
