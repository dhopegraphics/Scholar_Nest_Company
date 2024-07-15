import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { drawerStyles } from "../../themes/drawerStyles";
import ContactsCard from "../../components/ContactsCard";
import MessagesScreen from "../tabs/Messages";
import { signOut, getCurrentUser } from "../../lib/appwrite";
import { useQuestionContext } from "../../contexts/QuestionContext";


const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { answer } = useQuestionContext();
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user

  useEffect(() => {
    // Fetch the current user when the component mounts
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(); // Sign out the user
      navigation.navigate("LogOutScreen"); // Navigate to LogOutScreen
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const DrawerItem = ({
    label,
    destination,
    iconLeft,
    iconRight,
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

      {currentUser && (
        <ContactsCard
          name={currentUser.username} // Adjust the field as per your user document structure
          img={currentUser.avatar} // Adjust the field as per your user document structure
          onPress={() => navigation.navigate("MainUserAccountScreen")}
        />
      )}
{answer && (
      <DrawerItem
        label="Grades"
        destination="GradesScreen"
        iconLeft="school-outline"
        iconRight="chevron-forward-outline"
      />
)}
      { answer && (
      <DrawerItem
        label="Files"
        destination="Files"
        iconLeft="document-outline"
        iconRight="chevron-forward-outline"
      />
      )}
      <DrawerItem
        label="Reports"
        destination="Reports"
        iconLeft="analytics-outline"
        iconRight="chevron-forward-outline"
      />
      {answer ? (
      <DrawerItem
        label="Badges"
        destination="Badges"
        iconLeft="medal-outline"
        iconRight="chevron-forward-outline"
      />
      ) : (
         <DrawerItem
        label="Your Ward Badges"
        destination="ParentBadgesView"
        iconLeft="medal-outline"
        iconRight="chevron-forward-outline"
      />
      )}
      <DrawerItem
        label="SwitchAccount"
        destination="SwitchAccount"
        iconLeft="arrow-redo"
        iconRight="chevron-forward-outline"
      />

      <TouchableOpacity onPress={handleLogout} style={drawerStyles.logoutButton}>
        <Ionicons
          name="log-out-outline"
          size={30}
          color="black"
          style={drawerStyles.logoutIcon}
        />
        <Text style={drawerStyles.logoutText}>
          Logout   
          </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};


const MessagesNestDrawer = () => {
  return (

     <Drawer.Navigator initialRouteName="MessagesScreen" drawerContent={(props) => <CustomDrawerContent {...props} />} >
          <Drawer.Screen name=" " component={MessagesScreen} options={{ headerShown: false , drawerPosition: 'right',}} />
        </Drawer.Navigator>
      
  )
}

export default MessagesNestDrawer;