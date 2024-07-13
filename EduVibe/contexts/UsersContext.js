import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
    getCurrentUser, 
    getAllUsers, 
    databases, 
    updateAvatar, 
    fetchAllTagCollectionDocuments, 
    updateTagCollectionDocument 
} from '../lib/appwrite'; // Adjust imports as per your setup

// Define the context
const UsersContext = createContext();

// Create a provider component
export const UsersProvider = ({ children }) => {
  // Define the state for the users data
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [tagData, setTagData] = useState({});
  const [stats, setStats] = useState({}); // State for stats

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

        // Fetch the tags from TagsCollections
        const fetchedTags = await fetchAllTagCollectionDocuments();
        const tagDataMap = {};
        fetchedTags.forEach(tag => {
          if (!tagDataMap[tag.userId]) {
            tagDataMap[tag.userId] = [];
          }
          tagDataMap[tag.userId].push(tag);
        });

        // Define stats object with the current user ID
        const userStats = {
          [currentUser.userId]: [
            { label: 'Location', value: 'USA' },
            { label: 'Job Type', value: 'Full Time' },
            { label: 'Experience', value: '6 years' },
          ],
        };

        setStats(userStats); // Set the stats state
        setTagData(tagDataMap);

        // Combine the current user data and all users data
        setUsers([
          {
            id: currentUser.userId,
            img: currentUser.avatar,
            name: currentUser.username,
            email: currentUser.email,
            username: currentUser.username,
            tags: tagDataMap[currentUser.userId] || [],
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
  }, []); // Ensure useEffect runs only once when the component mounts

  const updateAvatar = async (userId, avatarUrl) => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          return { ...user, img: avatarUrl };
        }
        return user;
      })
    );

    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
        { avatar: avatarUrl }
      );
    } catch (error) {
      console.error('Failed to update user avatar:', error);
    }
  };

  const updateUserTags = async (userId, updatedTags) => {
    setTagData(prevTagData => ({
      ...prevTagData,
      [userId]: updatedTags,
    }));

    try {
      await updateTagCollectionDocument(userId, { tags: updatedTags });
    } catch (error) {
      console.error('Failed to update user tags:', error);
    }
  };

  return (
    <UsersContext.Provider value={{ users, currentUserId, updateUserTags, stats, tagData, updateAvatar }}>
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
