import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StatusBar } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { drawerStyles } from '../../themes/drawerStyles';
import MessagesScreen from '../tabs/Messages';
import UserAccountScreen from '../screens/UserAccount/UserAccountScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
    const { navigation } = props;
  
    const handleLogout = () => {
      navigation.navigate('SignInScreen'); 
    };
  
    const DrawerItem = ({ label, destination, iconLeft, iconRight }: { label: string; destination: string; iconLeft: string; iconRight: string }) => (
      <TouchableOpacity style={drawerStyles.drawerItemContainer} onPress={() => navigation.navigate(destination)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name={iconLeft} size={24} color="black" />
          <Text style={drawerStyles.drawerItemText}>{label}</Text>
        </View>
        <Ionicons name={iconRight} size={24} color="black" style={drawerStyles.rightIcon} />
      </TouchableOpacity>
    );
  
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Grades" destination="GradesScreen" iconLeft="school-outline" iconRight="chevron-forward-outline" />
        <DrawerItem label="Files" destination="Files" iconLeft="document-outline" iconRight="chevron-forward-outline" />
        <DrawerItem label="Reports" destination="Reports" iconLeft="analytics-outline" iconRight="chevron-forward-outline" />
        <DrawerItem label="Badges" destination="Badges" iconLeft="medal-outline" iconRight="chevron-forward-outline" />
        <DrawerItem label="SwitchAccount" destination="SwitchAccount" iconLeft="arrow-redo" iconRight="chevron-forward-outline" />
  
        <TouchableOpacity onPress={handleLogout} style={drawerStyles.logoutButton}>
          <Ionicons name="log-out-outline" size={30} color="black" style={drawerStyles.logoutIcon} />
          <Text style={drawerStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    );
  };



const MessagesNestDrawer = () => {
  return (
     <Drawer.Navigator initialRouteName="MessagesScreen" drawerContent={(props) => <CustomDrawerContent {...props} />} >
          <Drawer.Screen name="MessagesScreen" component={MessagesScreen} options={{ headerShown: false , drawerPosition: 'right',}} />
          <Drawer.Screen name="Profile" component={UserAccountScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
  )
}

export default MessagesNestDrawer;