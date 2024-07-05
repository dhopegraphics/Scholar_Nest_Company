import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import moment from 'moment';
import { useSettings } from './SettingsContext';
import { UpcomingEventStyle } from '../../../themes/UpcomingEventStyle';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const UpcomingEventsScreen = () => {
  const { settings } = useSettings();
  const [events, setEvents] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation(); // Hook into navigation object

  useEffect(() => {
    loadEvents(); // Load events on initial render
  }, []);

  const loadEvents = async () => {
    try {
      const eventsJson = await AsyncStorage.getItem('events');
      if (eventsJson) {
        const parsedEvents = JSON.parse(eventsJson);
        const allEvents = Object.keys(parsedEvents).flatMap(date =>
          parsedEvents[date].map(event => ({ ...event, date }))
        );
        setEvents(allEvents);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    // Simulate fetching data (e.g., reload events)
    setTimeout(() => {
      loadEvents();
      setIsRefreshing(false);
    }, 1000); // Example delay to simulate data fetching
  }, []);

  const renderEventItem = ({ item }) => {
    const initials = item.title
      .split(' ')
      .map(word => word[0])
      .join('');

    return (
      <View style={[UpcomingEventStyle.eventItem, { backgroundColor: settings.themeColor }]}>
        <Avatar.Text
          size={40}
          label={initials}
          style={[UpcomingEventStyle.eventAvatar, { backgroundColor: settings.avatarBackgroundColor }]}
          color={settings.textColor}
        />
        <View style={UpcomingEventStyle.eventTextContainer}>
          <Text style={[UpcomingEventStyle.eventDate, { color: settings.textColor }]}>
            {moment(item.date).format('MMMM Do YYYY')}
          </Text>
          <Text style={[UpcomingEventStyle.eventTitle, { color: settings.textColor }]}>{item.title}</Text>
          <Text style={[UpcomingEventStyle.eventDetail, { color: settings.textColor }]}>{item.detail}</Text>
        </View>
      </View>
    );
  };

  const navigateToNewEvent = () => {
    navigation.navigate('NewEvent'); // Navigate to 'NewEvent' screen
  };

  return (
    <View style={UpcomingEventStyle.container}>
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderEventItem}
        ListEmptyComponent={<Text style={UpcomingEventStyle.noEventsText}>No upcoming events</Text>}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
      
      {/* Rounded Button at Bottom-Right Corner */}
      <TouchableOpacity style={UpcomingEventStyle.addButton} onPress={navigateToNewEvent}>
        <Text style={UpcomingEventStyle.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpcomingEventsScreen;
