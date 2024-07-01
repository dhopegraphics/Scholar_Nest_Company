import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error("Failed to load events:", error);
    }
  };

  const saveEvents = async (newEvents) => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.error("Failed to save events:", error);
    }
  };

  const addEvent = async (date, title, detail) => {
    const newEvent = { title: title.toString(), detail: detail.toString() }; // Ensure title and detail are strings
    const newEvents = {
      ...events,
      [date]: [...(events[date] || []), newEvent]
    };
    await saveEvents(newEvents);
  };

  const clearAllEvents = async () => {
    try {
      await AsyncStorage.removeItem('events');
      setEvents({});
    } catch (error) {
      console.error("Failed to clear AsyncStorage:", error);
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, clearAllEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
