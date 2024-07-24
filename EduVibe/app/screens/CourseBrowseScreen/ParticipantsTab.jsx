import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getParticipantsForCourse, unjoinCourse } from '../../../lib/appwrite';
import { useUsers } from '../../../contexts/UsersContext';
import ParticipantCard from '../../../components/ParticipantCard';

const ParticipantsTab = ({ course }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { users } = useUsers(); 
  const currentUserId = users?.id; // Make sure you're getting the correct user ID

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // Check AsyncStorage first
        const storedParticipants = await AsyncStorage.getItem(`participants_${course.$id}`);
        if (storedParticipants) {
          setParticipants(JSON.parse(storedParticipants));
        } else {
          // Fetch from API if not in AsyncStorage
          const participantsData = await getParticipantsForCourse(course.$id);
          setParticipants(participantsData);
          await AsyncStorage.setItem(`participants_${course.$id}`, JSON.stringify(participantsData));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [course.$id]);

  const handleUnjoin = async () => {
    if (!currentUserId) {
      console.error('User ID is not available.');
      return;
    }

    try {
      await unjoinCourse(currentUserId, course.$id);
      const updatedParticipants = participants.filter(p => p.userId !== currentUserId);
      setParticipants(updatedParticipants);
      await AsyncStorage.setItem(`participants_${course.$id}`, JSON.stringify(updatedParticipants));
    } catch (error) {
      console.error('Failed to unjoin course:', error.message);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      {participants.length > 0 ? (
        participants.map((participant) => (
          <ParticipantCard 
            key={participant.userId} 
            name={participant.username} 
            img={participant.img} 
          />
        ))
      ) : (
        <Text style={styles.noParticipantsText}>No participants found for the course</Text>
      )}

      {participants.some(p => p.userId === currentUserId) && (
        <TouchableOpacity style={styles.unjoinButton} onPress={handleUnjoin}>
          <Text style={styles.unjoinButtonText}>Unjoin Course</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noParticipantsText: {
    fontSize: 16,
    color: '#888',
  },
  unjoinButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f44336', // Red color for the button
    borderRadius: 5,
    alignItems: 'center',
  },
  unjoinButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ParticipantsTab;
