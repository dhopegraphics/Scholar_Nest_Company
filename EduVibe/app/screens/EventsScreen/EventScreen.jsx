import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useEventContext } from './EventContext';

const EventScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;
  const { addEvent } = useEventContext();
  const [event, setEvent] = useState('');

  const handleAddEvent = () => {
    addEvent(selectedDate, event);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event for {selectedDate}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event details"
        value={event}
        onChangeText={setEvent}
      />
      <Button title="Add Event" onPress={handleAddEvent} />
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
