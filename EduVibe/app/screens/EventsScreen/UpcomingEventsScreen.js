import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';

const UpcomingEventsScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsJson = await AsyncStorage.getItem('events');
        if (eventsJson) {
          const parsedEvents = JSON.parse(eventsJson);
          // Flatten the events into an array with date included
          const allEvents = Object.keys(parsedEvents).flatMap(date =>
            parsedEvents[date].map(event => ({ ...event, date }))
          );
          setEvents(allEvents);
        }
      } catch (error) {
        console.error('Failed to load events:', error);
      }
    };

    loadEvents();
  }, []);

  const renderEventItem = ({ item }) => {
    const initials = item.title
      .split(' ')
      .map(word => word[0])
      .join('');

    return (
      <View style={styles.eventItem}>
        <Avatar.Text
          size={40}
          label={initials}
          style={styles.eventAvatar}
          color="white"
        />
        <View style={styles.eventTextContainer}>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDetail}>{item.detail}</Text>
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
    backgroundColor: '#2196F3', // Light blue background
  },
  eventAvatar: {
    marginRight: 16,
    backgroundColor: '#000',
  },
  eventTextContainer: {
    flex: 1,
  },
  eventDate: {
    fontSize: 14,
    color: 'white',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    color: 'white',
  },
  eventDetail: {
    fontSize: 16,
    marginTop: 2,
    color: 'white',
  },
  noEventsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
