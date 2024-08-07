import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Auth/SignIn";
import SignUpScreen from "../screens/Auth/SignUp";
import { VisibilityProvider } from "../../contexts/VisibilityContext";
import SurveyScreen from "../screens/IntroScreen/Survey";
import Tab_Layout from "../tabs/Tab_Layout";
import MessagesScreen from "../tabs/Messages";
import ContactsMainScreen from "../screens/MessagesScreen/ContactArea/ContactsScreen";
import CourseUploadsScreen from "../screens/MoreScreen/CourseUploadsScreen";
import AvailableCourses from "../screens/Available/AvailableCourses";
import GlobalSearch from "../screens/MoreScreen/GlobalSearch";
import Tags from "../screens/MoreScreen/Tags";
import AppSettings from "../screens/MoreScreen/AppSettings";
import Badges from "../screens/drawer/Badges";
import Files from "../screens/drawer/Files";
import SwitchAccount from "../screens/drawer/SwitchAccount";
import GradesScreen from "../screens/drawer/GradesScreen";
import Reports from "../screens/drawer/Reports";
import EventScreen from "../screens/EventsScreen/EventScreen";
import { EventProvider } from "../../contexts/EventContext";
import UpcomingEventsScreen from "../screens/EventsScreen/UpcomingEventsScreen";
import EventSettingsScreen from "../screens/EventsScreen/EventSettingsScreen";
import { SettingsProvider } from "../../contexts/SettingsContext";
import AnouncementsDetails from "../screens/Annoucement/AnnouncementsDetails";
import AboutScreen from "../screens/AppSettingsScreen/AboutScreen";
import GeneralScreen from "../screens/AppSettingsScreen/GeneralScreen";
import SharedFiles from "../screens/AppSettingsScreen/SharedFiles";
import SpaceUsage from "../screens/AppSettingsScreen/SpaceUsage";
import CalendarDrawer from "./CalendarDrawer";
import NewEvent from "../screens/EventsScreen/NewEventScreen";
import { CourseProvider } from "../../contexts/CourseContext";
import { TagProvider } from "../../contexts/TagContext";
import TagDetails from "../screens/TagsDetails/TagDetails";
import { ParticipantProvider } from "../../contexts/ParticipantContext";
import CourseDetailsDrawerNav from "./CourseDetailsDrawerNav";
import ActivityDetails from "../screens/Annoucement/ActivityDetails";
import { CourseHeaderProvider } from "../../contexts/CourseHeaderContext";
import UserSettings from "../screens/UserAccount/UserSettings";
import WorkProfile from "../screens/UserAccount/WorkProfile";
import AccountScreen from "../screens/UserAccount/Account";
import ChangePasswordScreen from "../screens/Auth/ChangePasswordScreen";
import ParentWardSetUpScreen from "../screens/IntroScreen/ParentWardSetUpScreen";
import ContactDetailsScreen from "../screens/chat/ContactDetailsScreen";
import { MessageProvider } from "../../contexts/MessageContext";
import { UsersProvider } from "../../contexts/UsersContext";
import { ExperienceProvider } from "../../contexts/ExperienceContext";
import UserAccount from "../screens/UserAccount/UserAccountScreen";
import WardsScreen from "../screens/ParentWards/WardsScreen";
import LogOutAlertScreen from "../screens/Auth/LogOutAlertScreen";
import ForgotPasswordForm from "../screens/Auth/ForgotPasswordForm";
import { PlacesProvider } from "../../contexts/PlacesContext";
import UserInterest from "../screens/TagsDetails/UserInterest";
import { QuestionProvider } from "../../contexts/QuestionContext";
import OnBoardingScreen from "../screens/Onboarding/Onboarding";
import WelcomeIntroScreen from "../screens/Welcome/WelcomeIntro";
import MainUserAccountScreen from "../screens/UserAccount/MainUserAccountScreen";
import ExperienceDetailsScreen from "../screens/Experience/ExperienceDetailsScreen";
import { GroupProvider } from "../../contexts/GroupContexts";
import GroupDetailsScreen from "../screens/GroupChat/GroupDetailsScreen";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import { ActionSheetProvider } from "@expo/react-native-action-sheet"; // Add this import
import DocumentUploader from "../screens/MoreScreen/DocumentUploadScreen";
import { BookDetail } from "../bookstore/screens";
import BookShopHome from "../bookstore/screens/Home";
import GradingSystemScreen from "../MyGradesApp/screens/GradingSystemScreen";
import HomeScreen from "../MyGradesApp/screens/HomeScreen";
import ExamWeightScreen from "../MyGradesApp/screens/ExamWeightScreen";
import SetUpScreen from "../MyGradesApp/screens/SetUpScreen";
import JobSearch from "../react_native_jobs/app/search/[id]";
import JobDetails from "../react_native_jobs/app/job-details/[id]";
import Layout from "../react_native_jobs/app/_layout";
import ParentBadgesView from "../Badges/ParentBadgesView";
import Wardsreport from "../screens/ParentWards/Wardsreport";
import ThierReports from "../screens/ParentWards/ThierReports";
import ClassRoomHome from "../ClassRoom/classroom";
import SubjectRoom from "../ClassRoom/SubjectRoom";
import StreamRoom from "../ClassRoom/StreamRoom";
import CourseSchema from "../screens/Educator/CourseSchema";
import QuestionTaken from "../screens/CourseBrowseScreen/QuestionTaken";
import FinanceTab from "../Finance/FinanceTabs/Finance";
import TransactionsSection from "../Finance/FinanceTabs/Transactions";
import Header from "../Finance/components/Header";
import { EducationPlacesProvider } from "../../contexts/EducationPlaceContext";
import LottieEduvibeLoader from "../../constants/LottieEduvibeLoader";
import AddedWards from "../screens/ParentWards/AddedWards";
import ContactsScreen from "../screens/MessagesScreen/ContactArea/Contacts";
import TodoList from "../TodoList/TodoListSection";

export type StackParamList = {
  ContactsScreen: undefined;
  FinanceHeader: undefined;
  TransactionsSection: undefined;
  FinanceTab: undefined;
  CourseSchema: undefined;
  TeacherCourseCard: undefined;
  Layout: undefined;
  JobDetails: undefined;
  JobSearch: undefined;
  GradeSubject: undefined;
  GradeSetUp: undefined;
  ExamWeight: undefined;
  GradeHome: undefined;
  GradingSystem: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  Survey: undefined;
  Back: undefined;
  MessagesScreen: undefined;
  ContactsMainScreen: undefined;
  Uploads: undefined;
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
  General: undefined;
  SharedFiles: undefined;
  SpaceUsage: undefined;
  NewEvent: undefined;
  TagDetails: undefined;
  Course_Information: undefined;
  ActivityDetails: undefined;
  UserSettings: undefined;
  WorkProfile: undefined;
  Account: undefined;
  ChatScreen: undefined;
  ChangePasswordScreen: undefined;
  ForgotPasswordForm: undefined;
  ContactDetailsScreen: { contact: { name: string; img: string } };
  UserAccount: undefined;
  ParentWardSetUpScreen: undefined;
  WardsScreen: undefined;
  LogOutScreen: undefined;
  UserInterest: undefined;
  Onboarding: undefined;
  WelcomeIntroScreen: undefined;
  MainUserAccountScreen: undefined;
  ExperienceDetails: undefined;
  GroupDetailsScreen: { group: { name: string; img: string } };
  DocumentUploader: undefined;
  VideoPlayerScreen: undefined;
  BookShopHome: undefined;
  BookDetail: undefined;
  ParentBadgesView: undefined;
  Wardsreport: undefined;
  ThierReports: undefined;
  ClassRoomHome: undefined;
  SubjectRoom: undefined;
  StreamRoom: undefined;
  CourseCustomHeader: undefined;
  QuestionTaken: { course: any };
  LottieEduvibeLoader: undefined;
  AddedWards: undefined;
  TodoList : undefined ;
};

const Stack = createNativeStackNavigator<StackParamList>();

const MainStackScreen = () => {
  const { isLogged, loading } = useGlobalContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    // Optionally, add any initialization logic here
  }, []);

  if (loading) {
    // Optionally, show a loading indicator or splash screen
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isLogged ? "Back" : "Onboarding"} // Navigate to "Back" if logged in, else "Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      <Stack.Screen name="WelcomeIntroScreen" component={WelcomeIntroScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="Survey"
        component={SurveyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Back" component={Tab_Layout} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="ContactsMainScreen" component={ContactsMainScreen} />
      <Stack.Screen name="Uploads" component={CourseUploadsScreen} />
      <Stack.Screen name="AvailableCourses" component={AvailableCourses} />
      <Stack.Screen
        name="GlobalSearch"
        component={GlobalSearch}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="calendar"
        component={CalendarDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tags" component={Tags} />
      <Stack.Screen
        name="AppSettings"
        component={AppSettings}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Badges" component={Badges} />
      <Stack.Screen name="ParentBadgesView" component={ParentBadgesView} />
      <Stack.Screen
        name="Files"
        component={Files}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="GradesScreen" component={GradesScreen} />
      <Stack.Screen name="SwitchAccount" component={SwitchAccount} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="Wardsreport" component={Wardsreport} />
      <Stack.Screen name="ThierReports" component={ThierReports} />
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
        name="General"
        component={GeneralScreen}
        options={{ headerShown: false }}
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
        name="ContactDetailsScreen"
        component={ContactDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkProfile"
        component={WorkProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordForm"
        component={ForgotPasswordForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserAccount"
        component={UserAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ParentWardSetUpScreen"
        component={ParentWardSetUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WardsScreen"
        component={WardsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="LogOutScreen"
        component={LogOutAlertScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserInterest"
        component={UserInterest}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MainUserAccountScreen"
        component={MainUserAccountScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ExperienceDetails"
        component={ExperienceDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupDetailsScreen"
        component={GroupDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DocumentUploader"
        component={DocumentUploader}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BookShopHome"
        component={BookShopHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GradingSystem"
        component={GradingSystemScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GradeHome"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExamWeight"
        component={ExamWeightScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GradeSetUp"
        component={SetUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="JobSearch"
        component={JobSearch}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Layout"
        component={Layout}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ClassRoomHome"
        component={ClassRoomHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubjectRoom"
        component={SubjectRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StreamRoom"
        component={StreamRoom}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CourseSchema"
        component={CourseSchema}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="QuestionTaken"
        component={QuestionTaken}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinanceTab"
        component={FinanceTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionsSection"
        component={TransactionsSection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinanceHeader"
        component={Header}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LottieEduvibeLoader"
        component={LottieEduvibeLoader}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddedWards"
        component={AddedWards}
        options={{ headerShown: false }}
      />
          <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => (
  <>
    <StatusBar barStyle="default" backgroundColor="black" />
    <ActionSheetProvider>
      <QuestionProvider>
        <GroupProvider>
          <VisibilityProvider>
            <SettingsProvider>
              <UsersProvider>
                <EducationPlacesProvider>
                  <PlacesProvider>
                    <ExperienceProvider>
                      <MessageProvider>
                        <TagProvider>
                          <CourseProvider>
                            <CourseHeaderProvider>
                              <ParticipantProvider>
                                <EventProvider>
                                  <MainStackScreen />
                                </EventProvider>
                              </ParticipantProvider>
                            </CourseHeaderProvider>
                          </CourseProvider>
                        </TagProvider>
                      </MessageProvider>
                    </ExperienceProvider>
                  </PlacesProvider>
                </EducationPlacesProvider>
              </UsersProvider>
            </SettingsProvider>
          </VisibilityProvider>
        </GroupProvider>
      </QuestionProvider>
    </ActionSheetProvider>
  </>
);

export default AppNavigator;
