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
    } catch (error) {
      console.error("Failed to save events:", error);
    }
  };

  const addEvent = (date, event) => {
    const newEvents = {
      ...events,
      [date]: [...(events[date] || []), event]
    };
    setEvents(newEvents);
    saveEvents(newEvents);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
