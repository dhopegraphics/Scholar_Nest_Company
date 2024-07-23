import React, { useState  , useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ButtonsTextStyle } from "../../themes/ButtonsWithTextContainerStyle";
import { useUsers } from "../../contexts/UsersContext";
import { useVisibility } from "../../contexts/VisibilityContext"; // import useVisibility
import AsyncStorage from "@react-native-async-storage/async-storage";


const retrieveUserState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userState');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load user state from AsyncStorage", e);
  }
};

const MoreScreen = ({ navigation }) => {

  const { isButtonVisible  , isCourseButtonVisible , isAppSettingsVisible  } = useVisibility(); // use the visibility state
  const { setButtonVisible  , setCourseButtonVisible , setAppSettingsVisible  } = useVisibility(); // use the visibility state
  const { users } = useUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);


  useEffect(() => {
    const fetchUserState = async () => {
      const savedState = await retrieveUserState();
      if (savedState) {
        setButtonVisible(savedState.isButtonVisible);
        setCourseButtonVisible(savedState.isCourseButtonVisible);
        setAppSettingsVisible(savedState.isAppSettingsVisible);
      }
    };
    fetchUserState();
  }, []);

  const handleResultPress = (item) => {
    const isUserSelected = selectedUsers.some((user) => user.id === item.id);

    if (!isUserSelected) {
      const updatedSelectedUsers = [...selectedUsers, item];
      setSelectedUsers(updatedSelectedUsers);
      navigation.navigate("WardsScreen", {
        selectedUsers: updatedSelectedUsers,
      });
    }
  };

  return (
    <>
    <View style= {{ padding : 20, backgroundColor : "white",}}>
    <Text style={ButtonsTextStyle.moreText}>More</Text>
    </View>
    <SafeAreaView style={{ flex: 1,
    backgroundColor: "white",
    marginTop: -35,
   }}>

      <ScrollView contentContainerStyle={ButtonsTextStyle.scrollViewContent}>
        <View style={[ButtonsTextStyle.container, { marginBottom: 30 }]}>
          <View style={ButtonsTextStyle.more}>

          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("GlobalSearch")}
            >
              <Icon
                style={ButtonsTextStyle.icon}
                name="search"
                size={30}
                color="#ffffff" />
              <Text style={ButtonsTextStyle.text}>Global Search</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray" />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("calendar")}
            >
              <Icon
                style={ButtonsTextStyle.icon}
                name="event"
                size={30}
                color="#ffffff" />
              <Text style={ButtonsTextStyle.text}>Calendar</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray" />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("Tags")}
            >
              <Icon
                style={ButtonsTextStyle.icon}
                name="label"
                size={30}
                color="#ffffff" />
              <Text style={ButtonsTextStyle.text}>Tags</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray" />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            {isCourseButtonVisible && (
              <TouchableOpacity
                style={ButtonsTextStyle.button}
                onPress={() => navigation.navigate("Uploads")}
              >
                <Icon
                  style={ButtonsTextStyle.icon}
                  name="cloud-upload"
                  size={30}
                  color="#ffffff" />
                <Text style={ButtonsTextStyle.text}>Upload Courses Here</Text>
                <Icon
                  style={ButtonsTextStyle.rightIcon}
                  name="chevron-right"
                  size={30}
                  color="gray" />
              </TouchableOpacity>
            )}

            {isCourseButtonVisible && (
              <TouchableOpacity
                style={ButtonsTextStyle.button}
                onPress={() => navigation.navigate("DocumentUploader")}
              >
                <Icon
                  style={ButtonsTextStyle.icon}
                  name="assignment-add"
                  size={30}
                  color="#ffffff" />
                <Text style={ButtonsTextStyle.text}>Upload Documents Here</Text>
                <Icon
                  style={ButtonsTextStyle.rightIcon}
                  name="chevron-right"
                  size={30}
                  color="gray" />
              </TouchableOpacity>
            )}
            {isButtonVisible ? (
              <TouchableOpacity
                style={ButtonsTextStyle.button}
                onPress={() => navigation.navigate("WardsScreen", { selectedUsers })}
              >
                <Icon
                  style={ButtonsTextStyle.icon}
                  name="supervised-user-circle"
                  size={30}
                  color="#ffffff" />
                <Text style={ButtonsTextStyle.text}>Your Wards</Text>
                <Icon
                  style={ButtonsTextStyle.rightIcon}
                  name="chevron-right"
                  size={30}
                  color="gray" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={ButtonsTextStyle.button}
                onPress={() => navigation.navigate("BookShopHome")}
              >
                <Icon
                  style={ButtonsTextStyle.icon}
                  name="add-shopping-cart"
                  size={30}
                  color="#ffffff" />
                <Text style={ButtonsTextStyle.text}>Book Shop</Text>
                <Icon
                  style={ButtonsTextStyle.rightIcon}
                  name="chevron-right"
                  size={30}
                  color="gray" />
              </TouchableOpacity>

            )}
          </View>
        </View>
      </ScrollView>
      <View style={ButtonsTextStyle.SettingsContainer}>
        {isAppSettingsVisible && (
          <TouchableOpacity
            style={ButtonsTextStyle.MoreSettingsButton}
            onPress={() => navigation.navigate("AppSettings")}
          >
            <Icon
              style={ButtonsTextStyle.icon}
              name="settings"
              size={30}
              color="#ffffff" />
            <Text style={ButtonsTextStyle.text}>App Settings</Text>
            <Icon
              style={ButtonsTextStyle.rightIcon}
              name="chevron-right"
              size={30}
              color="gray" />
          </TouchableOpacity>
        )}

        
      </View>
    </SafeAreaView></>
  );
};

export default MoreScreen;
