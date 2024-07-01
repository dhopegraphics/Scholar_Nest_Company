import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import { useEventContext } from "../EventsScreen/EventContext";
import Ionicons from 'react-native-vector-icons/Ionicons';

LocaleConfig.locales["en"] = {
  monthNames: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  monthNamesShort: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  dayNames: [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};
LocaleConfig.defaultLocale = "en";

const CalendarComponent = () => {
  const { events } = useEventContext();
  const [selectedDate, setSelectedDate] = useState("");
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('DrawerScreen')} style={styles.headerButton}>
            <Ionicons name="funnel-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSettingsModal(true)} style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const handleDatePress = (date) => {
    setSelectedDate(date.dateString);
    navigation.navigate("EventScreen", { selectedDate: date.dateString });
  };

  const renderEventsForDate = (date) => {
    const eventsForDate = events[date] || [];
    return eventsForDate.map((event, index) => (
      <View key={index} style={styles.eventContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDetail}>{event.detail}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDatePress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />
      {selectedDate && (
        <View style={styles.eventList}>
          {renderEventsForDate(selectedDate)}
        </View>
      )}
      <Modal
        visible={showSettingsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSettingsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable style={styles.closeButton} onPress={() => setShowSettingsModal(false)}>
              <Ionicons name="close-outline" size={24} color="black" />
            </Pressable>
            <Text style={styles.modalText}>Settings Options</Text>
            {/* Add your settings options here */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  eventList: {
    padding: 16,
  },
  eventContainer: {
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDetail: {
    fontSize: 14,
  },
  headerButton: {
    marginRight: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalText: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default CalendarComponent;
