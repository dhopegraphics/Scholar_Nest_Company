import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  LayoutChangeEvent,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { coursesBrowseStyles as styles } from "../../themes/CoursesBrowseStyles";
import { getCurrentUser } from "../../lib/appwrite";
import { useUsers } from "../../contexts/UsersContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TimeTableSection from "./TimeTable";



const Tab = createMaterialTopTabNavigator();

const CoursesBrowseSection = ({ navigation }) => {
  const { users } = useUsers(); // Access users data from UsersContext
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Starred");
  const [buttonWidth, setButtonWidth] = useState(0);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDropdownOpen(false));
    } else {
      setIsDropdownOpen(true);
      Animated.timing(dropdownHeight, {
        toValue: 150,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    toggleDropdown();
  };

  const onTextLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    setButtonWidth(Math.min(width + 40, 300)); // Limit button width to 300, add padding
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduVibe</Text>
        {currentUser && (
          <TouchableOpacity onPress={openDrawer}>
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.coursesTitle}>My courses</Text>
        <View style={styles.filterRow}>
          <TextInput
            selectionColor={"#1C9C9D"}
            placeholder="Filter my courses"
            style={styles.input}
          />
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="download" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="th-large" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.filterButton, { width: buttonWidth }]}
          onPress={toggleDropdown}
        >
          <Text onLayout={onTextLayout} style={{ color: "black" }}>
            {selectedItem}
          </Text>
          <MaterialIcons name="arrow-drop-down" style={styles.dropdownIcon} />
        </TouchableOpacity>
        {isDropdownOpen && (
          <Animated.View
            style={[styles.dropdownMenu, { height: dropdownHeight }]}
          >
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() =>
                handleItemSelect("All (including removed from view)")
              }
            >
              <Text>All (including removed from view)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleItemSelect("Starred")}
            >
              <Text>Starred</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleItemSelect("Removed From View")}
            >
              <Text>Removed From View</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        <View style={styles.noResultsContainer}>
          <FontAwesome
            name="times-circle"
            size={100}
            color="#ccc"
            style={styles.noResultsImage}
          />
          <Text style={styles.noResultsText}>
            Your search didn't match any courses.
          </Text>
          <Text style={styles.noResultsSubText}>
            Try adjusting your filters or browse all courses below.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate("AvailableCourses")}
          >
            <FontAwesome
              name="search"
              size={24}
              color="#000"
              style={styles.browseIcon}
            />
            <Text>Browse all courses</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};



const CoursesBrowse = () => {
  return (
    <>
      <Tab.Navigator
      initialRouteName="Courses Browse"

        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#1C9C9D",
          },
        }}
      >
        <Tab.Screen name="Courses Browse" component={CoursesBrowseSection} />
        <Tab.Screen name="TimeTableSection" component={TimeTableSection} />
      </Tab.Navigator>
    </>
  );
};
 

export default CoursesBrowse;
