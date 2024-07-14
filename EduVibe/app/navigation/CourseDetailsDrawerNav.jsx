import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo vector icons
import { useNavigation } from '@react-navigation/native';
import ActivityData from '../screens/Annoucement/ActivityData';
import CourseTopTabs from '../screens/CourseBrowseScreen/CourseTopTabs';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const navigateToActivityDataDetails = (ActivityDataId) => {
    navigation.navigate('ActivityDetails', { ActivityDataId });
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('calendar')}>
          <Text style={styles.buttonText}>Calendar</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>ActivityData</Text>
        {ActivityData.map((activity) => (
          <TouchableWithoutFeedback key={activity.id} onPress={() => navigateToActivityDataDetails(activity.id)}>
            <View style={styles.activityDataContainer}>
              <Text style={styles.activityDataTitle}>{activity.title}</Text>
              <Text style={styles.activityDataMeta}>By {activity.author} | {activity.date} {activity.time}</Text>
              <Text style={[styles.activityDataContent, styles.clickableText]}>{activity.content}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  clickableText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityDataContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  activityDataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activityDataMeta: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  activityDataContent: {
    fontSize: 14,
    marginBottom: 5,
  },
});

const CourseDetailsDrawerNav = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />} 
      drawerPosition="left"
    >
      <Drawer.Screen 
        name="CourseTopTabs" 
        component={CourseTopTabs}
        options={{ 
          headerShown: true,
          headerTitle : "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            height : 30,

          },
          headerLeftContainerStyle : {
            marginBottom : -40,
            marginTop : -120,

          },
          drawerPosition: "right"
        }} 
      />
    </Drawer.Navigator>
  );
};

export default CourseDetailsDrawerNav;
