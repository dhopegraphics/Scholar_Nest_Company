import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator, // Import ActivityIndicator
  Alert, // Import Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import FeatherIcon from 'react-native-vector-icons/Feather';
import ExperienceCard from '../../../components/ExperienceCard';
import { useUsers } from '../../../contexts/UsersContext';
import { UserAccountStyling } from '../../../themes/UserAccountStyle';
import { useTagContext } from '../../../contexts/TagContext'; // Import the context
import { createChatRequest, deleteChatRequest, createFollowRequest,
   deleteFollowRequest, fetchChatRequests } from '../../../lib/appwrite'; // Import the functions and configurations
const tags = ['ios', 'android', 'web', 'ui', 'ux'];

const UserAccount = ({ navigation, route }) => {
  const { users, stats } = useUsers();
  const { userId } = route.params;
  const { setTag } = useTagContext();

  const currentUser = users.find((user) => user.id === userId);

  const [isFollowed, setIsFollowed] = useState(false);
  const [isChatRequested, setIsChatRequested] = useState(false);
  const [chatRequestDocumentId, setChatRequestDocumentId] = useState(null);
  const [followRequestDocumentId, setFollowRequestDocumentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    setLoading(true);
    if (isFollowed) {
      try {
        await deleteFollowRequest(followRequestDocumentId);
        console.log("Follow request deleted successfully");
        setIsFollowed(false);
        setFollowRequestDocumentId(null);
        await AsyncStorage.removeItem(`follow_${currentUser.id}`);
        Alert.alert("Follow Removed");
      } catch (error) {
        console.error("Failed to delete follow request:", error);
        Alert.alert("Failed to remove follow");
      }
    } else {
      try {
        const newFollowRequest = await createFollowRequest(currentUser.id, currentUser.username);
        console.log("Follow request created successfully:", newFollowRequest);
        setIsFollowed(true);
        setFollowRequestDocumentId(newFollowRequest.$id);
        await AsyncStorage.setItem(`follow_${currentUser.id}`, newFollowRequest.$id);
        Alert.alert("Followed");
      } catch (error) {
        console.error("Failed to create follow request:", error);
        Alert.alert("Failed to follow");
      }
    }
    setLoading(false);
  };

  const toggleChatRequest = async () => {
    setLoading(true);
    if (isChatRequested) {
      try {
        await deleteChatRequest(chatRequestDocumentId);
        console.log("Chat request deleted successfully");
        setIsChatRequested(false);
        setChatRequestDocumentId(null);
        await AsyncStorage.removeItem(`chat_${currentUser.id}`);
        Alert.alert("Request Removed");
      } catch (error) {
        console.error("Failed to delete chat request:", error);
        Alert.alert("Failed to remove request");
      }
    } else {
      try {
        const newChatRequest = await createChatRequest(currentUser.id, currentUser.username, currentUser.img);
        console.log("Chat request created successfully:", newChatRequest);
        setIsChatRequested(true);
        setChatRequestDocumentId(newChatRequest.$id);
        await AsyncStorage.setItem(`chat_${currentUser.id}`, newChatRequest.$id);
        Alert.alert("Request Sent!");
      } catch (error) {
        console.error("Failed to create chat request:", error);
        Alert.alert("Failed to send request");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const followRequestId = await AsyncStorage.getItem(`follow_${currentUser.id}`);
        if (followRequestId) {
          setIsFollowed(true);
          setFollowRequestDocumentId(followRequestId);
        }

        const chatRequestId = await AsyncStorage.getItem(`chat_${currentUser.id}`);
        if (chatRequestId) {
          setIsChatRequested(true);
          setChatRequestDocumentId(chatRequestId);
        }

        // Always fetch the latest chat requests
        const chatRequests = await fetchChatRequests(currentUser.id);
        const chatRequest = chatRequests.find(req => req.receiverId === currentUser.id);

        if (chatRequest) {
          setIsChatRequested(true);
          setChatRequestDocumentId(chatRequest.$id);
          await AsyncStorage.setItem(`chat_${currentUser.id}`, chatRequest.$id);
        } else {
          setIsChatRequested(false);
          setChatRequestDocumentId(null);
          await AsyncStorage.removeItem(`chat_${currentUser.id}`);
        }
      } catch (error) {
        console.error('Failed to fetch follow or chat request status from AsyncStorage:', error);
      }
    };

    fetchStatuses();
  }, [currentUser]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={UserAccountStyling.container}>
        <View style={UserAccountStyling.header}>
          <View style={UserAccountStyling.headerAction}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon name="chevron-left" size={24} />
            </TouchableOpacity>
          </View>

          <View style={UserAccountStyling.search}>
            <Text style={UserAccountStyling.profileTitle}>{currentUser.name}</Text>
          </View>

          <View style={[UserAccountStyling.headerAction, { alignItems: 'flex-end' }]}>
          </View>
        </View>

        <ScrollView>
          <View style={UserAccountStyling.content}>
            <View style={UserAccountStyling.profile}>
              <View style={UserAccountStyling.profileTop}>
                <View style={UserAccountStyling.avatar}>
                  <Image
                    alt=""
                    source={{ uri: currentUser.img }}
                    style={UserAccountStyling.avatarImg}
                  />
                  <View style={UserAccountStyling.avatarNotification} />
                </View>

                <View style={UserAccountStyling.profileBody}>
                  <Text style={UserAccountStyling.profileTitle}>{currentUser.name}</Text>
                  <Text style={UserAccountStyling.profileSubtitle}>
                    {currentUser.portfolio} {' · '}
                    <Text style={{ color: '#266EF1' }}>
                      @{currentUser.username.toLowerCase().replace(/\s/g, '')}
                    </Text>
                  </Text>
                </View>
              </View>

              <Text style={UserAccountStyling.profileDescription}>{currentUser.bio}</Text>

              <View style={UserAccountStyling.profileTags}>
                {tags.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setTag({ title: tag }); // Set the selected tag
                      navigation.navigate('TagDetails'); // Navigate to the TagDetails screen
                    }}
                  >
                    <Text style={UserAccountStyling.profileTagsItem}>#{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={UserAccountStyling.stats}>
              {stats[userId] &&
                stats[userId].map((stat, index) => (
                  <View
                    key={index}
                    style={[
                      UserAccountStyling.statsItem,
                      index === 0 && { borderLeftWidth: 0 },
                    ]}
                  >
                    <Text style={UserAccountStyling.statsItemText}>{stat.label}</Text>
                    <Text style={UserAccountStyling.statsItemValue}>{stat.value}</Text>
                  </View>
                ))}
            </View>

            <View style={UserAccountStyling.contentActions}>
              <TouchableOpacity onPress={toggleFollow} style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={UserAccountStyling.btn}>
                  <Text style={UserAccountStyling.btnText}>
                    {isFollowed ? 'Followed' : 'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleChatRequest} style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={UserAccountStyling.btnPrimary}>
                  <Text style={[UserAccountStyling.btnText, { color: '#fff' }]}>
                    {isChatRequested ? 'Requested' : 'Request To Chat'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {loading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}

            <ExperienceCard navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default UserAccount;
