import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
  );
};

export default Layout;
