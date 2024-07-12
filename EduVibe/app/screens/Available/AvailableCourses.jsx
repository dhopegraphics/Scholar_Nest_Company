import React, { useState, useRef, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useCourseContext } from "../../../contexts/useCourseContext";
import { ParticipantContext } from "../../../contexts/ParticipantContext";
import { CourseCard } from "../../../components";

const AvailableCourses = () => {
  const navigation = useNavigation(); // Initialize navigation object
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu open/close
  const searchIconTranslateX = useRef(new Animated.Value(15)).current; // Initial position for search icon
  const menuButtonRef = useRef(null); // Ref for menu button
  const menuAnim = useRef(new Animated.Value(0)).current; // Animation for menu
  const { setCourse } = useCourseContext();
  const participantContext = useContext(ParticipantContext);
  const [refreshing, setRefreshing] = useState(false);

  const handlePress = (course) => {
    setCourse(course);
    if (participantContext) {
      participantContext.setParticipants(course.participants);
    }
    navigation.navigate('Course_Information');
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(searchIconTranslateX, {
      toValue: 70, // Move to the left when focused
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(searchIconTranslateX, {
      toValue: 20, // Move back to the right when blurred
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(menuAnim, {
      toValue: isMenuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const navigateBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const searchRef = useRef(null);
  const handleScreenTap = () => {
    if (searchRef.current) {
      searchRef.current.blur();
    }
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.header}>
              <TouchableOpacity style={styles.iconButton} onPress={navigateBack}>
                <Icon name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Available Courses</Text>
              <TouchableOpacity
                style={styles.iconButton}
                ref={menuButtonRef}
                onPress={toggleMenu}
              >
                <Icon name="menu" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              {isMenuOpen && (
                <TouchableWithoutFeedback>
                  <Animated.View
                    style={[
                      styles.dropdownMenu,
                      {
                        opacity: menuAnim,
                        transform: [
                          {
                            translateY: menuAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-16, 0],
                            }),
                          },
                          {
                            scale: menuAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.8, 1],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <TouchableOpacity style={styles.menuItem}>
                      <Text style={styles.menuText}>Option 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                      <Text style={styles.menuText}>Option 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                      <Text style={styles.menuText}>Option 3</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </TouchableWithoutFeedback>
              )}

              <View
                style={[
                  styles.searchContainer,
                  isFocused
                    ? styles.searchContainerFocused
                    : styles.searchContainerDefault,
                ]}
              >
                <TextInput
                  placeholder="Search"
                  value={searchText}
                  onChangeText={setSearchText}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={styles.input}
                />
                <Animated.View
                  style={[styles.searchIcon, { right: searchIconTranslateX }]}
                >
                  <Icon name="search" size={22} color="#333" />
                </Animated.View>
                {isFocused && (
                  <TouchableOpacity
                    style={styles.clearIcon}
                    onPress={() => setSearchText("")}
                  >
                    <Icon name="close" size={26} color="#333" />
                  </TouchableOpacity>
                )}

              </View>

              <View style = {styles.courseContainer} >
                {participantContext?.courses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  creator={course.creator}
                  participantsCount={course.participants.length}
                  onPress={() => handlePress(course)}
                  imageSource={{ uri: course.image }} // Pass the image source dynamically
                />
              ))}
             </View>

              {searchText === "" && (
                <View style={styles.centeredContainer}>
                  <Icon name="search" size={64} color="#888" />
                  <Text style={styles.noResultsText}>No results</Text>
                </View>
              )}


            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
    maxWidth: 600,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    position: "relative",
  },
  searchContainerDefault: {
    borderColor: "#ddd",
  },
  searchContainerFocused: {
    borderColor: "#333",
    borderWidth: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    color: "#333",
  },
  searchIcon: {
    position: "absolute",
    right: 45,
    zIndex: 1, // Ensure the icon is above other elements
  },
  clearIcon: {
    position: "absolute",
    right: 16,
    zIndex: 1, // Ensure the icon is above other elements
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200, // Ensure a minimum height so it's scrollable
  },
  noResultsText: {
    marginTop: 8,
    color: "#888",
  },
  iconButton: {
    padding: 8,
  },
  dropdownMenu: {
    position: "absolute",
    top: -30,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    zIndex: 10, // Ensure the dropdown is above other content
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  courseContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    alignSelf : "center",
  },

});

export default AvailableCourses;
