import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Adjust the path
import 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <>
     <GestureHandlerRootView>
      <StatusBar barStyle="default" backgroundColor="black" />
      <AppNavigator />
      </GestureHandlerRootView>
    </>
  );
};

export default App;
