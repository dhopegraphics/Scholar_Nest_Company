import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import CalendarComponent from '../screens/MoreScreen/Calender'; // Adjust the path as needed
import { CalendarDrawerStyles } from '../../themes/CalendarDrawerStyles';

const Drawer = createDrawerNavigator();

// Custom header component for the drawer screen
const CustomHeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

// Custom drawer content component
const CustomDrawerContent = (props) => {
  const [siteEventsEnabled, setSiteEventsEnabled] = useState(true);
  const [categoryEventsEnabled, setCategoryEventsEnabled] = useState(true);
  const [courseEventsEnabled, setCourseEventsEnabled] = useState(true);
  const [groupEventsEnabled, setGroupEventsEnabled] = useState(true);
  const [userEventsEnabled, setUserEventsEnabled] = useState(true);

  return (
    <DrawerContentScrollView {...props}>
      {/* Custom header or logo */}
      <View style={CalendarDrawerStyles.header}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> PREVIEW ONLY </Text>
      </View>
      
      {/* Drawer items from DrawerItemList */}
      <DrawerItemList {...props} /> 
      
      {/* Custom switch buttons */}
      <View style={CalendarDrawerStyles.switchContainer}>
        <View style={[CalendarDrawerStyles.switchItem, { marginBottom: 20 }]}>
          <Ionicons name="calendar" size={24} color="black" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16 }}>Site events</Text>
          <Switch
            value={siteEventsEnabled}
            onValueChange={(newValue) => setSiteEventsEnabled(newValue)}
            style={{ marginLeft: 'auto' }}
          />
        </View>

        <View style={CalendarDrawerStyles.switchItem}>
          <Ionicons name="pricetag" size={24} color="black" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16 }}>Category events</Text>
          <Switch
            value={categoryEventsEnabled}
            onValueChange={(newValue) => setCategoryEventsEnabled(newValue)}
            style={{ marginLeft: 'auto' }}
          />
        </View>

        <View style={CalendarDrawerStyles.switchItem}>
          <Ionicons name="book" size={24} color="black" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16 }}>Course events</Text>
          <Switch
            value={courseEventsEnabled}
            onValueChange={(newValue) => setCourseEventsEnabled(newValue)}
            style={{ marginLeft: 'auto' }}
          />
        </View>

        <View style={CalendarDrawerStyles.switchItem}>
          <Ionicons name="people" size={24} color="black" style={{ marginRight: 10 , }} />
          <Text style={{ fontSize: 16 }}>Group events</Text>
          <Switch
            value={groupEventsEnabled}
            onValueChange={(newValue) => setGroupEventsEnabled(newValue)}
            style={{ marginLeft: 'auto' }}
          />
        </View>

        <View style={CalendarDrawerStyles.switchItem}>
          <Ionicons name="person" size={24} color="black" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16 }}>User events</Text>
          <Switch
            value={userEventsEnabled}
            onValueChange={(newValue) => setUserEventsEnabled(newValue)}
            style={{ marginLeft: 'auto' }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

// Main drawer navigator component
const CalendarDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerPosition: 'right',
        headerLeft: () => <CustomHeaderLeft />,
        headerStyle: {
          height: 50,
        },
        headerRightContainerStyle: {
          paddingBottom: 1,
          marginTop: -55,
        },
        headerLeftContainerStyle: {
          paddingBottom: 1,
          marginTop: -55,
        },
        headerTitleContainerStyle: {
          paddingBottom: 1,
          marginTop: -55,
        },
      }}
    >
      <Drawer.Screen
        name="Calendar"
        component={CalendarComponent}
      />
    </Drawer.Navigator>
  );
};

export default CalendarDrawer;
