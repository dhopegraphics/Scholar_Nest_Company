import React , {useEffect , useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo vector icons
import Dashboard from '../tabs/Dashboard';
import announcements from '../screens/Annoucement/announcementsData';
import TeacherDashboard from '../screens/Educator/TeacherDashboard';
import { useVisibility } from '../../contexts/VisibilityContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Drawer = createDrawerNavigator();

const retrieveUserState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userState');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load user state from AsyncStorage", e);
  }
};

const CustomDrawerContent = ({ navigation }) => {


  const navigateToAnnouncementDetails = (announcementId) => {
    navigation.navigate('AnnouncementDetails', { announcementId });
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
        <Text style={styles.sectionTitle}>Announcements</Text>
        {announcements.map((announcement) => (
          <TouchableWithoutFeedback key={announcement.id} onPress={() => navigateToAnnouncementDetails(announcement.id)}>
            <View style={styles.announcementContainer}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementMeta}>By {announcement.author} | {announcement.date} {announcement.time}</Text>
              <Text style={[styles.announcementContent, styles.clickableText]}>{announcement.content}</Text>
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
  announcementContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  announcementMeta: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  announcementContent: {
    fontSize: 14,
    marginBottom: 5,
  },

});

const DifferentDrawerNavigator = () => {
  const {isCourseButtonVisible} = useVisibility();
  const {  setCourseButtonVisible   } = useVisibility(); 

useEffect(() => {
    const fetchUserState = async () => {
      const savedState = await retrieveUserState();
      if (savedState) {
        setCourseButtonVisible(savedState.isCourseButtonVisible);
      }
    };
    fetchUserState();
  }, []);

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} drawerPosition="left">
      {isCourseButtonVisible ? (
         <Drawer.Screen name="TeacherDashboard" component={TeacherDashboard} options={{ headerShown: false  ,  drawerPosition: "right" }} />
      ) : (
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, drawerPosition: "right" }} />
      )}
    </Drawer.Navigator>
  );
};

export default DifferentDrawerNavigator;
