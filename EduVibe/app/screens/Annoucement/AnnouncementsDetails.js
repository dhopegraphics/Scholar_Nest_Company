import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import announcements from './announcementsData'; // Import announcements data

const AnnouncementsDetails = () => {
  const route = useRoute();
  const { announcementId } = route.params;

  // Find the announcement object based on announcementId
  const selectedAnnouncement = announcements.find(item => item.id === announcementId);

  if (!selectedAnnouncement) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Announcement not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedAnnouncement.title}</Text>
      <Text style={styles.meta}>By {selectedAnnouncement.author} | {selectedAnnouncement.date} {selectedAnnouncement.time}</Text>
      <Text style={styles.content}>{selectedAnnouncement.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meta: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default AnnouncementsDetails;
