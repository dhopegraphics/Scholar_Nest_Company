import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

const LecturesScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <SelectableItem title="Introduction" duration="Video - 04:43 mins" />
    <SelectableItem title="Information and Data Models" duration="Video - 04:54 mins" />
    <SelectableItem title="Types of Relationships" duration="Video - 04:01 mins" />
    <SelectableItem title="Relational Constraints Introduction" duration="Video - 03:08 mins" />
    <SelectableItem title="Mapping Entities to tables" duration="Video - 03:19 mins" />
    <SelectableItem title="Relational Model Concepts" duration="Video - 02:11 mins" />
  </ScrollView>
);

const DownloadsScreen = () => (
  <View style={styles.center}>
    <Text style={styles.header}>No downloads yet</Text>
    <Text>Your downloaded lectures go here</Text>
  </View>
);

const MoreScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <SelectableItem title="About this course" />
    <SelectableItem title="Course certificate" />
    <SelectableItem title="Share this course" />
    <SelectableItem title="Q&A" />
    <SelectableItem title="Notes" />
    <SelectableItem title="Resources" />
    <SelectableItem title="Announcements" />
    <SelectableItem title="Add course to favorites" />
    <SelectableItem title="Archive course" />
  </ScrollView>
);

const CourseField = () => {
  return (
    <Tab.Navigator
      initialRouteName="Lectures"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { backgroundColor: '#f5f5f5' },
        tabBarIndicatorStyle: { backgroundColor: '#3b82f6' },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: 'gray',
        tabBarShowIcon: false,
        tabBarShowLabel: true,
      }}
      tabBarPosition="top"
      swipeEnabled
    >
      <Tab.Screen name="Lectures" component={LecturesScreen} />
      <Tab.Screen name="Downloads" component={DownloadsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

const SelectableItem = ({ title, duration }) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <TouchableOpacity
      style={[styles.selectableItem, selected ? styles.selectedItem : null]}
      onPress={handlePress}
    >
      <View style={styles.itemContent}>
        <Text style={[styles.selectableItemTitle, selected ? styles.selectedItemText : null]}>
          {title}
        </Text>
        {duration && <Text style={styles.selectableItemDuration}>{duration}</Text>}
      </View>
      {/* Check icon when item is selected */}
      {selected && <Ionicons name="checkmark-circle" size={24} color="#3b82f6" style={styles.checkIcon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectableItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#e6f7ff', // Example of selected item background color
  },
  itemContent: {
    flex: 1,
    marginRight: 20,
  },
  selectableItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedItemText: {
    color: '#3b82f6', // Example of selected item text color
  },
  selectableItemDuration: {
    fontSize: 14,
    color: 'gray',
  },
  checkIcon: {
    marginRight: 16,
  },
});

export default CourseField;
