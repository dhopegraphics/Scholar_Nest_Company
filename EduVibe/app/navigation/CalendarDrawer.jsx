import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // or any other icon library you prefer
import CalendarComponent from '../screens/MoreScreen/Calender';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomHeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

const CalendarDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="CalendarComponent"
        component={CalendarComponent}
        options={{
          headerShown: true,
          drawerPosition: "right",
          headerLeft: () => <CustomHeaderLeft />,
          headerStyle: {
            height: 50, // Adjust the height to provide space for margin or padding
          },
          headerRightContainerStyle : {
            paddingBottom : 1,
            marginTop : -55,
          },
          headerLeftContainerStyle : {
            paddingBottom : 1,
            marginTop : -55,
          },
          headerTitleContainerStyle : {
            paddingBottom : 1,
            marginTop : -55,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default CalendarDrawer;
