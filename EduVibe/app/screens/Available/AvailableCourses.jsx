import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import TeacherCourseCard from "../../../components/TeacherCourseCard";
import { getCourses } from "../../../lib/appwrite"; // Import getCourses function

const AvailableCourses = () => {
  const navigation = useNavigation(); // Initialize navigation object
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu open/close
  const searchIconTranslateX = useRef(new Animated.Value(15)).current; // Initial position for search icon
  const menuButtonRef = useRef(null); // Ref for menu button
  const menuAnim = useRef(new Animated.Value(0)).current; // Animation for menu
  const [refreshing, setRefreshing] = useState(false);
  const [courses, setCourses] = useState([]); // State to hold courses
  const [filteredCourses, setFilteredCourses] = useState([]); // State to hold filtered courses

  useEffect(() => {
    fetchCourses(); // Fetch courses when component mounts
  }, []);

  useEffect(() => {
    // Filter courses based on search text
    const filterCourses = () => {
      if (searchText === "") {
        setFilteredCourses(courses);
      } else {
        const filtered = courses.filter((course) =>
          course.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredCourses(filtered);
      }
    };

    filterCourses();
  }, [searchText, courses]);

  const fetchCourses = async () => {
    try {
      const coursesData = await getCourses(); // Fetch courses from API
      setCourses(coursesData); // Set courses in state
      setFilteredCourses(coursesData); // Initialize filteredCourses
    } catch (error) {
      console.error("Failed to fetch courses:", error.message);
    }
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
      fetchCourses(); // Refresh courses on pull-to-refresh
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={styles.container}>
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

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={styles.input}
              ref={searchRef}
              selectionColor={"#1C9C9D"}
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
                  <Text style={styles.menuText}>Show Downloaded Only</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Show Joined Courses Only</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Show New Courses Only</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          )}

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.scrollViewContent}
            style={styles.scrollView}
          >
            <View style={styles.courseContainer}>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TeacherCourseCard
                    key={course.$id}
                    course={course}
                    navigation={navigation}
                  />
                ))
              ) : (
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
    zIndex: 2, // Ensure the header is above other elements
    elevation: 2, // Add shadow for Android
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  iconButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    position: "relative",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    color: "#333",
  },
  searchIcon: {
    position: "absolute",
    right: 40,
  },
  clearIcon: {
    position: "absolute",
    right: 16,
  },
  dropdownMenu: {
    position: "absolute",
    top: 60, // Adjust based on header height
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    zIndex: 10,
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  courseContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    alignContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  noResultsText: {
    marginTop: 8,
    color: "#888",
  },
});

export default AvailableCourses;
