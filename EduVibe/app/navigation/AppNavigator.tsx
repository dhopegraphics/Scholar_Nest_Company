import React, { useState } from 'react';
import {  StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/Auth/SignIn';
import SignUpScreen from '../screens/Auth/SignUp';
import Survey from '../screens/IntroScreen/Survey';
import Tab_Layout from '../tabs/Tab_Layout';
import MessagesScreen from '../tabs/Messages';
import ContactsMainScreen from '../screens/MessagesScreen/ContactArea/ContactsScreen';
import QrCodeScanner from '../screens/MoreScreen/QRCodeScannerScreen';
import AvailableCourses from '../screens/Available/AvailableCourses';
import GlobalSearch from '../screens/MoreScreen/GlobalSearch';
import Tags from '../screens/MoreScreen/Tags';
import AppSettings from '../screens/MoreScreen/AppSettings';
import Badges from '../screens/drawer/Badges';
import Files from '../screens/drawer/Files';
import SwitchAccount from '../screens/drawer/SwitchAccount';
import GradesScreen from '../screens/drawer/GradesScreen';
import Reports from '../screens/drawer/Reports';
import EventScreen from '../screens/EventsScreen/EventScreen';
import { EventProvider } from '../../contexts/EventContext';
import UpcomingEventsScreen from '../screens/EventsScreen/UpcomingEventsScreen';
import EventSettingsScreen from '../screens/EventsScreen/EventSettingsScreen';
import { SettingsProvider } from '../../contexts/SettingsContext'; // Import the SettingsProvider
import AnouncementsDetails from '../screens/Annoucement/AnnouncementsDetails';
import AboutScreen from '../screens/AppSettingsScreen/AboutScreen';
import GeneralScreen from '../screens/AppSettingsScreen/GeneralScreen';
import SharedFiles from '../screens/AppSettingsScreen/SharedFiles';
import SpaceUsage from '../screens/AppSettingsScreen/SpaceUsage';
import Synchronization from '../screens/AppSettingsScreen/Synchronization';
import CalendarDrawer from './CalendarDrawer';
import NewEvent from '../screens/EventsScreen/NewEventScreen';
import { CourseProvider } from '../../contexts/CourseContext';
import { TagProvider } from '../../contexts/TagContext';
import TagDetails from '../screens/TagsDetails/TagDetails';
import { ParticipantProvider } from '../../contexts/ParticipantContext';
import CourseDetailsDrawerNav from './CourseDetailsDrawerNav';
import ActivityDetails from '../screens/Annoucement/ActivityDetails';
import { CourseHeaderProvider } from '../../contexts/CourseHeaderContext';
import UserSettings from '../screens/UserAccount/UserSettings';
import WorkProfile from '../screens/UserAccount/WorkProfile';
import AccountScreen from '../screens/UserAccount/Account';
import ChatScreen from '../screens/chat/ChatScreen';
import ChangePasswordScreen from '../screens/Auth/ChangePasswordScreen';


export type StackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  Survey: undefined;
  Back: undefined;
  MessagesScreen: undefined;
  ContactsMainScreen: undefined;
  QrCodeScanner: undefined;
  AvailableCourses: undefined;
  GlobalSearch: undefined;
  calendar: undefined;
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
  UpcomingEvents: undefined;
  EventSettings: undefined;
  AnnouncementDetails :undefined;
  AboutScreen: undefined;
  General :undefined;
  SharedFiles: undefined;
  SpaceUsage:undefined;
  Synchronization: undefined;
  NewEvent : undefined;
  TagDetails :undefined;
  Course_Information : undefined;
  ActivityDetails : undefined;
  UserSettings : undefined ;
  WorkProfile :undefined ;
  Account : undefined;
  ChatScreen : undefined;
  ChangePasswordScreen : undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const MainStackScreen = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Survey" component={Survey} options={{ headerShown: false }} />
      <Stack.Screen name="Back" component={Tab_Layout} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="ContactsMainScreen" component={ContactsMainScreen} />
      <Stack.Screen name="QrCodeScanner" component={QrCodeScanner} />
      <Stack.Screen name="AvailableCourses" component={AvailableCourses} />
      <Stack.Screen name="GlobalSearch" component={GlobalSearch} options={{ headerShown: true }} />
      <Stack.Screen name="calendar" component={CalendarDrawer} options={{ 
        headerShown: false,
      }} />
      <Stack.Screen name="Tags" component={Tags} />
      <Stack.Screen name="AppSettings" component={AppSettings} options={{ headerShown: true }}/>
      <Stack.Screen name="Badges" component={Badges} />
      <Stack.Screen name="Files" component={Files} options={{ headerShown: false }} />
      <Stack.Screen name="GradesScreen" component={GradesScreen} />
      <Stack.Screen name="SwitchAccount" component={SwitchAccount} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="EventScreen" component={EventScreen} options={{ headerShown: true }} />
      <Stack.Screen name="UpcomingEvents" component={UpcomingEventsScreen} options={{ headerShown: true }} />
      <Stack.Screen name="EventSettings" component={EventSettingsScreen} options={{ headerShown: true }} />
      <Stack.Screen name="AnnouncementDetails" component={AnouncementsDetails} options={{ headerShown: false }} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="General" component={GeneralScreen} options={{ headerShown: true }} />
      <Stack.Screen name="SharedFiles" component={SharedFiles} options={{ headerShown: true }} />
      <Stack.Screen name="SpaceUsage" component={SpaceUsage} options={{ headerShown: true }} />
      <Stack.Screen name="Synchronization" component={Synchronization} options={{ headerShown: true }} />
      <Stack.Screen name="NewEvent" component={NewEvent} options={{ headerShown: true }} />
      <Stack.Screen name="Course_Information" component={CourseDetailsDrawerNav} options={{ headerShown: false , }} />
      <Stack.Screen name="TagDetails" component={TagDetails} options={{ headerShown: true }} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetails} options={{ headerShown: true }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: true }} />
      <Stack.Screen name="UserSettings" component={UserSettings} options={{ headerShown: false }} />
      <Stack.Screen name="WorkProfile" component={WorkProfile} options={{ headerShown: false }} />
      <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />
   </Stack.Navigator>
  );
};


const AppNavigator = () => (
  <>
    <StatusBar barStyle="default" backgroundColor="black" />

    <SettingsProvider>
    <TagProvider>
    <CourseHeaderProvider>
    <ParticipantProvider>
    <CourseProvider>
      <EventProvider>
       <MainStackScreen/>
      </EventProvider>
      </CourseProvider>
      </ParticipantProvider>
      </CourseHeaderProvider>
      </TagProvider>
    </SettingsProvider>
  </>
);

export default AppNavigator;