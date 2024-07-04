import { View, Text } from 'react-native'
import React from 'react'
import CalendarComponent from '../screens/MoreScreen/Calender';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const CalendarDrawer = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="CalendarComponent" component={CalendarComponent} options={{ headerShown: true, drawerPosition: "right" }} />
      </Drawer.Navigator>
    );
  };
  export default CalendarDrawer;