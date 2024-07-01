import React from 'react';
import { TouchableOpacity, Text, View, StatusBar } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo icons
import SignInScreen from '../screens/Auth/SignIn';
import SignUpScreen from '../screens/Auth/SignUp';
import Survey from '../screens/IntroScreen/Survey';
import Tab_Layout from '../tabs/Tab_Layout';
import MessagesScreen from '../tabs/Messages';
import ContactsMainScreen from '../screens/MessagesScreen/ContactArea/ContactsScreen';
import QrCodeScanner from '../screens/MoreScreen/QRCodeScannerScreen';
import AvailableCourses from '../screens/Available/AvailableCourses';
import GlobalSearch from '../screens/MoreScreen/GlobalSearch';
import CalendarComponent from '../screens/MoreScreen/Calender';
import Tags from '../screens/MoreScreen/Tags';
import AppSettings from '../screens/MoreScreen/AppSettings';
import CoursesBrowse from '../tabs/CoursesBrowse';
import UserAccountScreen from '../screens/UserAccount/UserAccountScreen';
import Badges from '../screens/drawer/Badges';
import Files from '../screens/drawer/Files';
import SwitchAccount from '../screens/drawer/SwitchAccount';
import GradesScreen from '../screens/drawer/GradesScreen';
import Reports from '../screens/drawer/Reports';
import { drawerStyles } from '../../themes/drawerStyles';
import EventScreen from '../screens/EventsScreen/EventScreen';
import { EventProvider } from '../screens/EventsScreen/EventContext';
import UpcomingEventsScreen from '../screens/EventsScreen/UpcomingEventsScreen';
import EventSettingsScreen from '../screens/EventsScreen/EventSettingsScreen';
const Drawer = createDrawerNavigator();

export type StackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  Back: undefined;
  Survey: undefined;
  MessagesScreen: undefined;
  ContactsMainScreen: undefined;
  QrCodeScanner: undefined;
  AvailableCourses: undefined;
  GlobalSearch: undefined;
  Calender: undefined;
  Tags: undefined;
  AppSettings: undefined;
  UserAccountScreen: undefined;
  CoursesBrowse: undefined;
  Badges: undefined;
  Files: undefined;
  GradesScreen: undefined;
  SwitchAccount: undefined;
  Reports: undefined;
  EventScreen: undefined;
  CalendarComponent: undefined;
  UpcomingEvents : undefined;
  EventSettings : undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const MainStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Survey" component={Survey} options={{ headerShown: false }} />
      <Stack.Screen name="Back" component={Tab_Layout} />
      <Stack.Screen name="Back" component={Tab_Layout} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="ContactsMainScreen" component={ContactsMainScreen} />
      <Stack.Screen name="QrCodeScanner" component={QrCodeScanner} />
      <Stack.Screen name="AvailableCourses" component={AvailableCourses} />
      <Stack.Screen name="GlobalSearch" component={GlobalSearch} options={{ headerShown: true }} />
      <Stack.Screen name="Calender" component={CalendarComponent} options={{ headerShown: true }} />
      <Stack.Screen name="Tags" component={Tags} />
      <Stack.Screen name="AppSettings" component={AppSettings} />
      <Stack.Screen name="CoursesBrowse" component={CoursesBrowse} options={{ headerShown: false }} />
      <Stack.Screen name="Badges" component={Badges} />
      <Stack.Screen name="Files" component={Files} />
      <Stack.Screen name="GradesScreen" component={GradesScreen} />
      <Stack.Screen name="SwitchAccount" component={SwitchAccount} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="EventScreen" component={EventScreen} options={{ headerShown: true }} />
      <Stack.Screen name="UpcomingEvents" component={UpcomingEventsScreen} options={{ headerShown: true }} />
      <Stack.Screen name="EventSettings" component={EventSettingsScreen} options={{ headerShown: true }} />

   </Stack.Navigator>
  );
};

const CustomDrawerContent = (props: any) => {
  const { navigation } = props;

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing authentication state or tokens
    navigation.navigate('SignInScreen'); // Navigate to sign-in screen after logout
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

const AppNavigator = () => (
  <>
    <StatusBar barStyle="default" backgroundColor="black" />
    <EventProvider>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />} >
        <Drawer.Screen name="Home" component={MainStackScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="PROFILE" component={UserAccountScreen} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </EventProvider>
  </>
);

export default AppNavigator;
