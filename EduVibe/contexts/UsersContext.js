import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the context
const UsersContext = createContext();

// Create a provider component
export const UsersProvider = ({ children }) => {
  // Define the state for the users data
  const [users, setUsers] = useState([]);

  const stats = {
    '1': [
      { label: 'Location', value: 'USA' },
      { label: 'Job Type', value: 'Full Time' },
      { label: 'Experience', value: '6 years' },
    ],

  };

  // Define the initial tag data for each user
  const initialTagData = {
    '1': [
      { id: "1", title: "Documentation", categories: ["Everywhere"] },
      { id: "2", title: "Art", categories: ["Everywhere"] },
      { id: "3", title: "Books", categories: ["Everywhere", "Default Collection"] },
      { id: "4", title: "Digital Marketing", categories: ["Everywhere", "Forum Tags"] },
      { id: "5", title: "Engineering", categories: ["Everywhere", "Default Collection"] },
      { id: "6", title: "Fashion Design", categories: ["Everywhere", "Forum Tags"] },
    ],
   
  };

  const [tagData, setTagData] = useState(initialTagData);

  // Fetch or set the data for users
  useEffect(() => {
    // Fetching data or setting it statically with unique IDs
    setUsers([
      {
        id: '1',
        img: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        name: 'BELL BURGESS',
        phone: '202472680',
        NoteCount: 44,
        duration: 10,
        portfolio: 'UI/UX Designer',
        bio:
          'Skilled in user research, wireframing, prototyping, and collaborating with cross-functional teams.',
        email: 'bell.burgess@example.com',
        username: 'bellburgess',
        birthday: '02/07/2012',
        password: ' ',
        country: 'Ghana',
        tags: tagData['1'],
        lastseen : 20 ,
      },
     
    ]);
  }, [tagData]); // Ensure useEffect depends on tagData for updates

  const updateUserTags = (userId, updatedTags) => {
    setTagData(prevTagData => ({
      ...prevTagData,
      [userId]: updatedTags,
    }));
  };

  return (
    <UsersContext.Provider value={{ users, updateUserTags, stats , tagData }}>
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
