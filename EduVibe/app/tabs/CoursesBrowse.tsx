import React, { useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Example: Import FontAwesome icon
import { coursesBrowseStyles as styles } from '../../themes/CoursesBrowseStyles';

type CoursesBrowseProps = {
  navigation: DrawerNavigationProp<ParamListBase, 'CoursesBrowse'>;
};

const CoursesBrowse: React.FC<CoursesBrowseProps> = ({ navigation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        toValue: 150, // Adjust based on the number of dropdown items
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EduVibe</Text>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          {/* Replace with MaterialIcons */}
          <MaterialIcons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.coursesTitle}>My courses</Text>
        <View style={styles.filterRow}>
          <TextInput placeholder="Filter my courses" style={styles.input} />
          <TouchableOpacity style={styles.iconButton}>
            {/* Replace with FontAwesome */}
            <FontAwesome name="download" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            {/* Replace with FontAwesome */}
            <FontAwesome name="th-large" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={toggleDropdown}>
          <Text style={{ color: 'black' }}>Starred</Text>
          <MaterialIcons name="arrow-drop-down" style={styles.dropdownIcon} />
        </TouchableOpacity>
        {isDropdownOpen && (
          <Animated.View style={[styles.dropdownMenu, { height: dropdownHeight }]}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text>Option 3</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        <View style={styles.noResultsContainer}>
          <FontAwesome name="times-circle" size={100} color="#ccc" style={styles.noResultsImage} />
          <Text style={styles.noResultsText}>Your search didn't match any courses.</Text>
          <Text style={styles.noResultsSubText}>Try adjusting your filters or browse all courses below.</Text>
          <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('AvailableCourses')}>
            <FontAwesome name="search" size={24} color="#000" style={styles.browseIcon} />
            <Text>Browse all courses</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CoursesBrowse;
