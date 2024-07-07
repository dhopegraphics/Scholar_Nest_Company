// context/UsersContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the context
const UsersContext = createContext();

// Create a provider component
export const UsersProvider = ({ children }) => {
  // Define the state for the users data
  const [users, setUsers] = useState([]);

  // Fetch or set the data for users
  useEffect(() => {
    // Fetching data or setting it statically with unique IDs
    setUsers([
      {
        id: '1',
        img: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        name: 'Bell Burgess',
        phone: '+1 (887) 478-2693',
        NoteCount: 44,
        duration: 10,
      },
      {
        id: '2',
        img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
        name: 'Bernard Baker',
        phone: '+1 (862) 581-3022',
        NoteCount: 22,
        duration: 10,
      },
      {
        id: '3',
        img: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        name: 'Grace',
        phone: '+1 (913) 497-2020',
        NoteCount: 12,
        duration: 15,
      },
      // Add more users with unique IDs and additional information
    ]);
  }, []);

  return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  );
};

// Custom hook to use the UsersContext
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
