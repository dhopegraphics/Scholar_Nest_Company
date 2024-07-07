import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the context
const UsersContext = createContext();

// Create a provider component
export const UsersProvider = ({ children }) => {
  // Define the state for the users data
  const [users, setUsers] = useState([]);

  // Define the stats array for each user based on their id
  const stats = {
    '1': [
      { label: 'Location', value: 'USA' },
      { label: 'Job Type', value: 'Full Time' },
      { label: 'Experience', value: '6 years' },
    ],
    '2': [
      { label: 'Location', value: 'Ghana' },
      { label: 'Job Type', value: 'Part Time' },
      { label: 'Experience', value: '5 years' },
    ],
  };

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
        portfolio: 'UI/UX Designer',
        bio:
          'Skilled in user research, wireframing, prototyping, and collaborating with cross-functional teams.',
      },

      {
        id: '2',
        img: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        name: 'Papaa',
        phone: '+1 (887) 478-2693',
        NoteCount: 20,
        duration: 20,
        portfolio: 'Graphics Designer',
        bio:
          'Skilled in design, prototyping, and collaborating with cross-functional teams.',
      },
      // Add more users with unique IDs and additional information
    ]);
  }, []);

  return (
    <UsersContext.Provider value={{ users, stats }}>
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
