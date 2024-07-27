import React, { useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LecturesScreen from './LecturesScreen';
import MoreScreen from './MoreScreen';
import DownloadsScreen from './DownloadsScreen';

const Tab = createMaterialTopTabNavigator();

const CourseField = ({ course }) => {
  const [downloadProgress, setDownloadProgress] = useState({});

  useEffect(() => {
    const loadDownloadProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem(`downloadProgress-${course.$id}`);
        if (storedProgress) {
          setDownloadProgress(JSON.parse(storedProgress));
        }
      } catch (error) {
        console.error('Failed to load download progress', error);
      }
    };

    loadDownloadProgress();
  }, [course.$id]);

  useEffect(() => {
    const saveDownloadProgress = async () => {
      try {
        await AsyncStorage.setItem(`downloadProgress-${course.$id}`, JSON.stringify(downloadProgress));
      } catch (error) {
        console.error('Failed to save download progress', error);
      }
    };

    saveDownloadProgress();
  }, [downloadProgress, course.$id]);

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
    >
      <Tab.Screen name="Lectures">
        {props => <LecturesScreen {...props} course={course} />}
      </Tab.Screen>
      <Tab.Screen name="Downloads">
        {props => <DownloadsScreen {...props} course={course} downloadProgress={downloadProgress} />}
      </Tab.Screen>
      <Tab.Screen name="More">
        {props => <MoreScreen {...props} course={course} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};


export default CourseField;
