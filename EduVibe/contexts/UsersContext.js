import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, getAllUsers } from '../lib/appwrite';

// Define the context
const UsersContext = createContext();

// Create a provider component
export const UsersProvider = ({ children }) => {
  // Define the state for the users data
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [tagData, setTagData] = useState({});

  // Fetch or set the data for users
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUserId(currentUser.userId); // Store the current user ID

        const allUsers = await getAllUsers();
        const allUsersData = allUsers.map(user => ({
          id: user.userId,
          img: user.avatar,
          name: user.username,
          email: user.email,
          username: user.username,
          tags: tagData[user.userId] || [], // Provide default empty array if no tags found
          phone: user.phone || 'N/A', // Replace with actual data if available
          NoteCount: user.NoteCount || 0, // Replace with actual data if available
          duration: user.duration || 0, // Replace with actual data if available
          portfolio: user.portfolio || 'N/A', // Replace with actual data if available
          bio: user.bio || 'N/A', // Replace with actual data if available
          birthday: user.birthday || 'N/A', // Replace with actual data if available
          password: user.password || ' ', // Replace with actual data if available
          country: user.country || 'N/A', // Replace with actual data if available
          lastseen: user.lastseen || 0, // Replace with actual data if available
        }));

        // Define the initial tag data for each user
        const initialTagData = {
          [currentUser.userId]: [
            { id: "1", title: "Documentation", categories: ["Everywhere"] },
            { id: "2", title: "Art", categories: ["Everywhere"] },
            { id: "3", title: "Books", categories: ["Everywhere", "Default Collection"] },
            { id: "4", title: "Digital Marketing", categories: ["Everywhere", "Forum Tags"] },
            { id: "5", title: "Engineering", categories: ["Everywhere", "Default Collection"] },
            { id: "6", title: "Fashion Design", categories: ["Everywhere", "Forum Tags"] },
          ],
        };

        // Define stats object with the current user ID
        const stats = {
          [currentUser.userId]: [
            { label: 'Location', value: 'USA' },
            { label: 'Job Type', value: 'Full Time' },
            { label: 'Experience', value: '6 years' },
          ],
        };

        setTagData(initialTagData);

        // Combine the current user data and all users data
        setUsers([
          {
            id: currentUser.userId,
            img: currentUser.avatar,
            name: currentUser.username,
            email: currentUser.email,
            username: currentUser.username,
            tags: initialTagData[currentUser.userId],
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
          ...allUsersData,
        ]);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []); // Ensure useEffect depends on tagData for updates

  const updateUserTags = (userId, updatedTags) => {
    setTagData(prevTagData => ({
      ...prevTagData,
      [userId]: updatedTags,
    }));
  };

  return (
    <UsersContext.Provider value={{ users, currentUserId, updateUserTags, tagData }}>
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
