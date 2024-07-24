import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getParticipantsForCourse } from '../../../lib/appwrite';
import Participantcard from '../../../components/Participantcard';

const ParticipantsTab = ({ course }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantsData = await getParticipantsForCourse(course.$id);
        setParticipants(participantsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [course.$id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      {participants.length > 0 ? (
        participants.map((participant) => (
          <Participantcard 
            key={participant.userId} 
            name={participant.username} 
            img={participant.img} 
          />
        ))
      ) : (
        <Text style={styles.noParticipantsText}>No participants found for the course</Text>
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
});

export default ParticipantsTab;
