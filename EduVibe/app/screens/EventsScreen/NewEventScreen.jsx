import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [reminder, setReminder] = useState('');
  const [titleFocused, setTitleFocused] = useState(false);
  const [detailsFocused, setDetailsFocused] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(Platform.OS === 'ios'); // Hide date picker on iOS when selecting date
    setEventDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventTime;
    setShowTimePicker(Platform.OS === 'ios'); // Hide time picker on iOS when selecting time
    setEventTime(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const setEventReminder = () => {
    // Function to set reminder
    setReminder(`Reminder set for ${eventDate.toLocaleDateString()} at ${eventTime.toLocaleTimeString()}`);
  };

  const handleTitleFocus = () => {
    setTitleFocused(true);
  };

  const handleTitleBlur = () => {
    setTitleFocused(false);
  };

  const handleDetailsFocus = () => {
    setDetailsFocused(true);
  };

  const handleDetailsBlur = () => {
    setDetailsFocused(false);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSaveEvent = () => {
    // Logic to save the event
    // This is where you would typically save eventTitle, eventDetails, eventDate, eventTime, etc.
    // Example: Save to AsyncStorage or send to backend API
    console.log('Event saved:', { eventTitle, eventDetails, eventDate, eventTime });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.headerText}>New Event</Text>
          <TextInput
            style={[
              styles.input,
              styles.leftAlign,
              titleFocused ? styles.inputFocused : null,
            ]}
            placeholder="Event Title"
            placeholderTextColor="#888"
            value={eventTitle}
            onChangeText={text => setEventTitle(text)}
            onFocus={handleTitleFocus}
            onBlur={handleTitleBlur}
          />
          <TextInput
            style={[
              styles.input,
              styles.leftAlign,
              styles.detailsInput,
              detailsFocused ? styles.inputFocused : null,
            ]}
            placeholder="Event Details"
            placeholderTextColor="#888"
            multiline={true}
            numberOfLines={4}
            value={eventDetails}
            onChangeText={text => setEventDetails(text)}
            onFocus={handleDetailsFocus}
            onBlur={handleDetailsBlur}
          />
          <TouchableOpacity style={[styles.button, styles.leftAlign]} onPress={showDatepicker}>
            <Text style={styles.buttonText}>Select Event Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={eventDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity style={[styles.button, styles.leftAlign]} onPress={showTimepicker}>
            <Text style={styles.buttonText}>Select Event Time</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={eventTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}
          <TouchableOpacity style={[styles.button, styles.leftAlign]} onPress={setEventReminder}>
            <Text style={styles.buttonText}>Set Reminder</Text>
          </TouchableOpacity>
          {reminder ? <Text style={[styles.reminderText, styles.leftAlign]}>{reminder}</Text> : null}
        </ScrollView>
        <TouchableOpacity style={styles.saveButton} onPress={onSaveEvent}>
          <Text style={styles.buttonText}>Save Event</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the left
    width: '100%',
    marginBottom: 80, // Adjust as needed to accommodate the save button
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start', // Align text to the left
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  inputFocused: {
    borderColor: '#007BFF', // Example border color when focused
  },
  detailsInput: {
    height: 100,
    textAlignVertical: 'top', // Ensure text starts from top in multiline input
  },
  leftAlign: {
    alignSelf: 'flex-start', // Align button text to the left
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  reminderText: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
    alignSelf: 'flex-start', // Align text to the left
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#28a745', // Green color for save button
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default NewEvent;
