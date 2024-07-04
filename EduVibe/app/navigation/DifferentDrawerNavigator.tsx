import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../tabs/Dashboard';

const Drawer = createDrawerNavigator();

const DifferentDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard}  options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default DifferentDrawerNavigator;
