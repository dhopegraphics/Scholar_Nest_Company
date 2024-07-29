import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    getCurrentUser, 
    getAllUsers, 
    databases, 
    updateAvatar as updateAvatarAPI, 
    fetchAllTagCollectionDocuments, 
    updateTagCollectionDocument 
} from '../lib/appwrite'; // Adjust imports as per your setup

// Define the context
const UsersContext = createContext();

// Create a provider component
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [tagData, setTagData] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        const storedCurrentUserId = await AsyncStorage.getItem('currentUserId');
        const storedTagData = await AsyncStorage.getItem('tagData');
        const storedStats = await AsyncStorage.getItem('stats');

        if (storedUsers && storedCurrentUserId && storedTagData && storedStats) {
          setUsers(JSON.parse(storedUsers));
          setCurrentUserId(storedCurrentUserId);
          setTagData(JSON.parse(storedTagData));
          setStats(JSON.parse(storedStats));
        } else {
          const currentUser = await getCurrentUser();
          setCurrentUserId(currentUser.userId);

          const allUsers = await getAllUsers();
          const fetchedTags = await fetchAllTagCollectionDocuments();

          const tagDataMap = {};
          fetchedTags.forEach(tag => {
            if (!tagDataMap[tag.userId]) {
              tagDataMap[tag.userId] = [];
            }
            tagDataMap[tag.userId].push(tag);
          });

          const userStats = {
            [currentUser.userId]: [
              { label: 'Location', value: 'USA' },
              { label: 'Job Type', value: 'Full Time' },
              { label: 'Experience', value: '6 years' },
            ],
          };

          const allUsersData = allUsers.map(user => ({
            id: user.userId,
            img: user.avatar,
            name: user.username,
            email: user.email,
            username: user.username,
            tags: tagDataMap[user.userId] || [],
            phone: user.phone || 'N/A',
            NoteCount: user.NoteCount || 0,
            duration: user.duration || 0,
            portfolio: user.portfolio || 'N/A',
            bio: user.bio || 'N/A',
            birthday: user.birthday || 'N/A',
            password: user.password || ' ',
            country: user.country || 'N/A',
            lastseen: user.lastseen || 0,
          }));

          const otherUsersData = allUsersData.filter(user => user.id !== currentUser.userId);

          const currentUserData = {
            id: currentUser.userId,
            img: currentUser.avatar,
            name: currentUser.username,
            email: currentUser.email,
            username: currentUser.username,
            tags: tagDataMap[currentUser.userId] || [],
            phone: ' ',
            NoteCount: 44,
            duration: 10,
            portfolio: 'UI/UX Designer',
            bio: 'Skilled in user research, wireframing, prototyping, and collaborating with cross-functional teams.',
            birthday: '02/07/2012',
            password: ' ',
            country: 'Ghana',
            lastseen: 20,
          };

          const allUserDataCombined = [currentUserData, ...otherUsersData];
          
          setUsers(allUserDataCombined);
          setTagData(tagDataMap);
          setStats(userStats);

          await AsyncStorage.setItem('users', JSON.stringify(allUserDataCombined));
          await AsyncStorage.setItem('currentUserId', currentUser.userId);
          await AsyncStorage.setItem('tagData', JSON.stringify(tagDataMap));
          await AsyncStorage.setItem('stats', JSON.stringify(userStats));
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

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
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, img: avatarUrl } : user
      );
      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
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
      const updatedTagData = { ...tagData, [userId]: updatedTags };
      setTagData(updatedTagData);
      await AsyncStorage.setItem('tagData', JSON.stringify(updatedTagData));
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
