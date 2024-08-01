import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    getCurrentUser, 
    getAllUsers, 
    databases, 
    updateAvatar as updateAvatarAPI, 
    fetchAllTagCollectionDocuments, 
    updateTagCollectionDocument, 
    appwriteConfig 
} from '../lib/appwrite'; // Adjust imports as per your setup

const UsersContext = createContext();

const USERS_KEY = 'users';
const CURRENT_USER_ID_KEY = 'currentUserId';
const TAG_DATA_KEY = 'tagData';
const STATS_KEY = 'stats';

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [tagData, setTagData] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [storedUsers, storedCurrentUserId, storedTagData, storedStats] = await Promise.all([
          AsyncStorage.getItem(USERS_KEY),
          AsyncStorage.getItem(CURRENT_USER_ID_KEY),
          AsyncStorage.getItem(TAG_DATA_KEY),
          AsyncStorage.getItem(STATS_KEY)
        ]);

        if (storedUsers && storedCurrentUserId && storedTagData && storedStats) {
          setUsers(JSON.parse(storedUsers));
          setCurrentUserId(storedCurrentUserId);
          setTagData(JSON.parse(storedTagData));
          setStats(JSON.parse(storedStats));
        } else {
          const currentUser = await getCurrentUser();
          setCurrentUserId(currentUser.userId);

          const [allUsers, fetchedTags] = await Promise.all([getAllUsers(), fetchAllTagCollectionDocuments()]);

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

          await Promise.all([
            AsyncStorage.setItem(USERS_KEY, JSON.stringify(allUserDataCombined)),
            AsyncStorage.setItem(CURRENT_USER_ID_KEY, currentUser.userId),
            AsyncStorage.setItem(TAG_DATA_KEY, JSON.stringify(tagDataMap)),
            AsyncStorage.setItem(STATS_KEY, JSON.stringify(userStats))
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Provide fallback mechanism or user notification here
      }
    };

    fetchUserData();
  }, []);

  const updateAvatar = useCallback(async (userId, avatarUrl) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === userId ? { ...user, img: avatarUrl } : user))
    );

    try {
      await updateAvatarAPI(userId, avatarUrl);
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, img: avatarUrl } : user
      );
      setUsers(updatedUsers);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Failed to update user avatar:', error);
      // Provide user feedback on error here
    }
  }, [users]);

  const updateUserTags = useCallback(async (userId, updatedTags) => {
    setTagData(prevTagData => ({
      ...prevTagData,
      [userId]: updatedTags,
    }));

    try {
      await updateTagCollectionDocument(userId, { tags: updatedTags });
      const updatedTagData = { ...tagData, [userId]: updatedTags };
      setTagData(updatedTagData);
      await AsyncStorage.setItem(TAG_DATA_KEY, JSON.stringify(updatedTagData));
    } catch (error) {
      console.error('Failed to update user tags:', error);
      // Provide user feedback on error here
    }
  }, [tagData]);

  return (
    <UsersContext.Provider value={{ users, currentUserId, updateUserTags, stats, tagData, updateAvatar }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
