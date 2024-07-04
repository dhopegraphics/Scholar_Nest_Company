import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import moment from 'moment';
import { useSettings } from './SettingsContext';

const UpcomingEventsScreen = () => {
  const { settings } = useSettings();
  const [events, setEvents] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      <View style={[styles.eventItem, { backgroundColor: settings.themeColor }]}>
        <Avatar.Text
          size={40}
          label={initials}
          style={[styles.eventAvatar, { backgroundColor: settings.avatarBackgroundColor }]}
          color={settings.textColor}
        />
        <View style={styles.eventTextContainer}>
          <Text style={[styles.eventDate, { color: settings.textColor }]}>{moment(item.date).format('MMMM Do YYYY')}</Text>
          <Text style={[styles.eventTitle, { color: settings.textColor }]}>{item.title}</Text>
          <Text style={[styles.eventDetail, { color: settings.textColor }]}>{item.detail}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderEventItem}
        ListEmptyComponent={<Text style={styles.noEventsText}>No upcoming events</Text>}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default UpcomingEventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  eventAvatar: {
    marginRight: 16,
  },
  eventTextContainer: {
    flex: 1,
  },
  eventDate: {
    fontSize: 14,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  eventDetail: {
    fontSize: 16,
    marginTop: 2,
  },
  noEventsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
