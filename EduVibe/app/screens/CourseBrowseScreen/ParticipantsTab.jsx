// ParticipantsTab.tsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { ParticipantContext } from '../../../contexts/ParticipantContext';

const ParticipantsTab = () => {
  const participantContext = useContext(ParticipantContext);

  if (!participantContext) {
    return <Text>Loading...</Text>; // Handle the case when context is not available
  }

  const { participants } = participantContext;

  return (
    <View style={styles.container}>
      {participants.length > 0 ? (
        <ScrollView contentContainerStyle={styles.participantsList}>
          {participants.map((participant, index) => (
            <TouchableOpacity key={index} style={styles.participantButton}>
              <Image source={{ uri: participant.avatar }} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.username}>{participant.username}</Text>
                <Text style={styles.lastAccessed}>Last accessed: {participant.lastAccessed}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text>No participant data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  participantsList: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    marginBottom : 500,
  },
  participantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 10,
    width: '100%',

  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    resizeMode : "contain"
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lastAccessed: {
    fontSize: 14,
    color: '#666',
  },
});

export default ParticipantsTab;
