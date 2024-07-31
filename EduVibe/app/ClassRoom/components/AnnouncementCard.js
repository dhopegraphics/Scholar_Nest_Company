import React  , {useState , useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../../../lib/appwrite';

export default function AnnouncementCard() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Check if user data is stored in AsyncStorage
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        } else {
          // Fetch the current user if not found in AsyncStorage
          const user = await getCurrentUser();
          setCurrentUser(user);
          // Save user data to AsyncStorage
          await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
      {currentUser && (
        <Avatar
          rounded
          source={{ uri:  currentUser.avatar  }}
          size="medium"
        />
      )}
        <TextInput
          placeholder="Announce something to your class..."
          style={styles.input}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
});
