import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useEventContext } from '../EventsScreen/EventContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UpcomingEventsScreen = () => {
  const { events, clearAllEvents } = useEventContext();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // Transform events into a format suitable for FlatList
    const transformedEvents = Object.entries(events).map(([date, eventsForDate]) => ({
      date,
      events: eventsForDate.map((event, index) => ({
        id: `${date}_${index}`,
        title: event.title || 'No Title', // Default to 'No Title' if not provided
        detail: event.detail || 'No Detail', // Default to 'No Detail' if not provided
      })),
    }));
    setEventList(transformedEvents);
  }, [events]);

  const handleClearAll = () => {
    Alert.alert(
      'Confirm Clear All',
      'Are you sure you want to clear all events? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: clearAllEvents,
        },
      ],
      { cancelable: true }
    );
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventContainer}>
      <View style={styles.eventIcon}>
        <Ionicons name="calendar-outline" size={24} color="black" />
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.events[0].title}</Text>
        <Text style={styles.eventDetail}>{item.events[0].detail}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={eventList}
        keyExtractor={(item) => item.date}
        renderItem={renderEvent}
      />
      <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
        <Text style={styles.clearButtonText}>Clear All Events</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 8,
  },
  eventIcon: {
    marginRight: 12,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDetail: {
    fontSize: 14,
    color: '#666',
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpcomingEventsScreen;
