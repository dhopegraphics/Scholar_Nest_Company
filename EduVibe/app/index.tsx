import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator'; // Adjust the path

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="default" backgroundColor="black" />
      <AppNavigator />
    </>
  );
};

export default App;
