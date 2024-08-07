import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RequestChatCard from '../../../../components/RequestChatCard';
import { fetchChatRequests, deleteChatRequest } from '../../../../lib/appwrite';
import { useAuth } from '../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleAcceptPress = async (requestId, setChatRequests, chatRequests) => {
  console.log('Accepted', requestId);
  const acceptedRequest = chatRequests.find(request => request.$id === requestId);
  if (acceptedRequest) {
    try {
      await AsyncStorage.setItem(`accepted_${requestId}`, JSON.stringify(acceptedRequest));
      setChatRequests(prevRequests => prevRequests.filter(request => request.$id !== requestId));
    } catch (error) {
      console.error('Failed to save accepted chat request:', error);
    }
  }
};

const handleRejectPress = async (requestId, setChatRequests) => {
  try {
    await deleteChatRequest(requestId);
    setChatRequests(prevRequests => prevRequests.filter(request => request.$id !== requestId));
    console.log('Rejected', requestId);
    await AsyncStorage.removeItem(`chat_${requestId}`);
  } catch (error) {
    console.error('Failed to reject chat request:', error);
  }
};

const RequestsScreen = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [chatRequests, setChatRequests] = useState([]);

  useEffect(() => {
    const loadChatRequests = async () => {
      try {
        if (currentUser) {
          const requests = await fetchChatRequests(currentUser.$id);
          setChatRequests(requests);
        }
      } catch (error) {
        console.error('Failed to fetch chat requests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChatRequests();
  }, [currentUser]);

  useEffect(() => {
    const loadAcceptedRequests = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const acceptedKeys = keys.filter(key => key.startsWith('accepted_'));
        const acceptedRequests = await AsyncStorage.multiGet(acceptedKeys);
        const acceptedIds = acceptedRequests.map(([key]) => key.replace('accepted_', ''));
        setChatRequests(prevRequests => prevRequests.filter(request => !acceptedIds.includes(request.$id)));
      } catch (error) {
        console.error('Failed to load accepted requests:', error);
      }
    };

    loadAcceptedRequests();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      {chatRequests.length === 0 ? (
        <>
          <Icon name="contacts" size={100} style={styles.contactsIcon} />
          <Text>No Request Yet</Text>
        </>
      ) : (
        <FlatList
          data={chatRequests}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <RequestChatCard
              img={item.avatar}
              name={item.username}
              acceptPress={() => handleAcceptPress(item.$id, setChatRequests, chatRequests)}
              rejectPress={() => handleRejectPress(item.$id, setChatRequests)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactsIcon: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RequestsScreen;
