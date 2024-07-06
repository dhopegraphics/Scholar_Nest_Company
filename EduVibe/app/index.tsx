import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Adjust the path
import 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="default" backgroundColor="black" />
      <AppNavigator />
    </>
  );
};

export default App;
