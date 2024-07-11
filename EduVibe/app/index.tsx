import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Adjust the path
import 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GlobalProvider from '../contexts/GlobalProvider';

const App: React.FC = () => {
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
