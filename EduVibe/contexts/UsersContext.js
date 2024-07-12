import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser } from '../lib/appwrite';

// Define the context
const UsersContext = createContext();

// Create a provider component
export const UsersProvider = ({ children }) => {
  // Define the state for the users data
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

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
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUserId(currentUser.userId); // Store the current user ID
        setUsers([
          {
            id: currentUser.userId,
            img: currentUser.avatar,
            name: currentUser.username,
            email: currentUser.email,
            username: currentUser.username,
            tags: tagData[currentUser.userId],
            phone: '0202472680', // Placeholder data, update as needed
            NoteCount: 44,      // Placeholder data, update as needed
            duration: 10,       // Placeholder data, update as needed
            portfolio: 'UI/UX Designer', // Placeholder data, update as needed
            bio: 'Skilled in user research, wireframing, prototyping, and collaborating with cross-functional teams.', // Placeholder data, update as needed
            birthday: '02/07/2012', // Placeholder data, update as needed
            password: ' ', // Placeholder data, update as needed
            country: 'Ghana', // Placeholder data, update as needed
            lastseen: 20, // Placeholder data, update as needed
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [tagData]); // Ensure useEffect depends on tagData for updates

  const updateUserTags = (userId, updatedTags) => {
    setTagData(prevTagData => ({
      ...prevTagData,
      [userId]: updatedTags,
    }));
  };

  return (
    <UsersContext.Provider value={{ users, currentUserId, updateUserTags, stats, tagData }}>
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
