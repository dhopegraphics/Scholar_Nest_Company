import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import Dashboard from '../tabs/Dashboard';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Drawer Content</Text>
        {/* Add your custom drawer items here */}
        <DrawerItem label="Dashboard" onPress={() => props.navigation.navigate('Dashboard')} />
      </View>
    </DrawerContentScrollView>
  );
};

const DifferentDrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default DifferentDrawerNavigator;
