import React, { useState } from "react";
import { TouchableOpacity, Text, View, StatusBar } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SignInScreen from "../screens/Auth/SignIn";
import SignUpScreen from "../screens/Auth/SignUp";
import Survey from "../screens/IntroScreen/Survey";
import Tab_Layout from "../tabs/Tab_Layout";
import MessagesScreen from "../tabs/Messages";
import ContactsMainScreen from "../screens/MessagesScreen/ContactArea/ContactsScreen";
import QrCodeScanner from "../screens/MoreScreen/QRCodeScannerScreen";
import AvailableCourses from "../screens/Available/AvailableCourses";
import GlobalSearch from "../screens/MoreScreen/GlobalSearch";
import Tags from "../screens/MoreScreen/Tags";
import AppSettings from "../screens/MoreScreen/AppSettings";
import CoursesBrowse from "../tabs/CoursesBrowse";
import UserAccountScreen from "../screens/UserAccount/UserAccountScreen";
import Badges from "../screens/drawer/Badges";
import Files from "../screens/drawer/Files";
import SwitchAccount from "../screens/drawer/SwitchAccount";
import GradesScreen from "../screens/drawer/GradesScreen";
import Reports from "../screens/drawer/Reports";
import { drawerStyles } from "../../themes/drawerStyles";
import EventScreen from "../screens/EventsScreen/EventScreen";
import { EventProvider } from "../../contexts/EventContext";
import UpcomingEventsScreen from "../screens/EventsScreen/UpcomingEventsScreen";
import EventSettingsScreen from "../screens/EventsScreen/EventSettingsScreen";
import { SettingsProvider } from "../../contexts/SettingsContext"; // Import the SettingsProvider
import AnouncementsDetails from "../screens/Annoucement/AnnouncementsDetails";
import AboutScreen from "../screens/AppSettingsScreen/AboutScreen";
import GeneralScreen from "../screens/AppSettingsScreen/GeneralScreen";
import SharedFiles from "../screens/AppSettingsScreen/SharedFiles";
import SpaceUsage from "../screens/AppSettingsScreen/SpaceUsage";
import Synchronization from "../screens/AppSettingsScreen/Synchronization";
import CalendarDrawer from "./CalendarDrawer";
import NewEvent from "../screens/EventsScreen/NewEventScreen";
import { CourseProvider } from "../../contexts/CourseContext";
import { TagProvider } from "../../contexts/TagContext";
import TagDetails from "../screens/TagsDetails/TagDetails";
import { ParticipantProvider } from "../../contexts/ParticipantContext";
import CourseDetailsDrawerNav from "./CourseDetailsDrawerNav";
import ActivityDetails from "../screens/Annoucement/ActivityDetails";
import { CourseHeaderProvider } from "../../contexts/CourseHeaderContext";
import ChatScreen from "../screens/chat/ChatScreen";

const Drawer = createDrawerNavigator();

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
  AnnouncementDetails: undefined;
  AboutScreen: undefined;
  GeneralScreen: undefined;
  SharedFiles: undefined;
  SpaceUsage: undefined;
  Synchronization: undefined;
  NewEvent: undefined;
  TagDetails: undefined;
  Course_Information: undefined;
  ActivityDetails: undefined;
  ChatScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const MainStackScreen = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="Survey"
        component={Survey}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Back" component={Tab_Layout} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="ContactsMainScreen" component={ContactsMainScreen} />
      <Stack.Screen name="QrCodeScanner" component={QrCodeScanner} />
      <Stack.Screen name="AvailableCourses" component={AvailableCourses} />
      <Stack.Screen
        name="GlobalSearch"
        component={GlobalSearch}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="calendar"
        component={CalendarDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Tags" component={Tags} />
      <Stack.Screen
        name="AppSettings"
        component={AppSettings}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CoursesBrowse"
        component={CoursesBrowse}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Badges" component={Badges} />
      <Stack.Screen
        name="Files"
        component={Files}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="GradesScreen" component={GradesScreen} />
      <Stack.Screen name="SwitchAccount" component={SwitchAccount} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="UpcomingEvents"
        component={UpcomingEventsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="EventSettings"
        component={EventSettingsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AnnouncementDetails"
        component={AnouncementsDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen
        name="GeneralScreen"
        component={GeneralScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SharedFiles"
        component={SharedFiles}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SpaceUsage"
        component={SpaceUsage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Synchronization"
        component={Synchronization}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="NewEvent"
        component={NewEvent}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Course_Information"
        component={CourseDetailsDrawerNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TagDetails"
        component={TagDetails}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ActivityDetails"
        component={ActivityDetails}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props: any) => {
  const { navigation } = props;

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing authentication state or tokens
    navigation.navigate("SignInScreen"); // Navigate to sign-in screen after logout
  };

  const DrawerItem = ({
    label,
    destination,
    iconLeft,
    iconRight,
  }: {
    label: string;
    destination: string;
    iconLeft: string;
    iconRight: string;
  }) => (
    <TouchableOpacity
      style={drawerStyles.drawerItemContainer}
      onPress={() => navigation.navigate(destination)}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={iconLeft} size={24} color="black" />
        <Text style={drawerStyles.drawerItemText}>{label}</Text>
      </View>
      <Ionicons
        name={iconRight}
        size={24}
        color="black"
        style={drawerStyles.rightIcon}
      />
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Grades"
        destination="GradesScreen"
        iconLeft="school-outline"
        iconRight="chevron-forward-outline"
      />
      <DrawerItem
        label="Files"
        destination="Files"
        iconLeft="document-outline"
        iconRight="chevron-forward-outline"
      />
      <DrawerItem
        label="Reports"
        destination="Reports"
        iconLeft="analytics-outline"
        iconRight="chevron-forward-outline"
      />
      <DrawerItem
        label="Badges"
        destination="Badges"
        iconLeft="medal-outline"
        iconRight="chevron-forward-outline"
      />
      <DrawerItem
        label="SwitchAccount"
        destination="SwitchAccount"
        iconLeft="arrow-redo"
        iconRight="chevron-forward-outline"
      />

      <TouchableOpacity
        onPress={handleLogout}
        style={drawerStyles.logoutButton}
      >
        <Ionicons
          name="log-out-outline"
          size={30}
          color="black"
          style={drawerStyles.logoutIcon}
        />
        <Text style={drawerStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
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
                <Drawer.Navigator
                  initialRouteName="Home"
                  drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                  <Drawer.Screen
                    name="Home"
                    component={MainStackScreen}
                    options={{ headerShown: false, drawerPosition: "right" }}
                  />
                  <Drawer.Screen
                    name="PROFILE"
                    component={UserAccountScreen}
                    options={{ headerShown: false }}
                  />
                </Drawer.Navigator>
              </EventProvider>
            </CourseProvider>
          </ParticipantProvider>
        </CourseHeaderProvider>
      </TagProvider>
    </SettingsProvider>
  </>
);

export default AppNavigator;

const styles = {
  headerButton: {
    padding: 10,
  },
};
