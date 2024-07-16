import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-elements';

export default function AnnouncementCard() {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Avatar
          rounded
          source={{ uri: 'https://via.placeholder.com/80' }}
          size="medium"
        />
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
