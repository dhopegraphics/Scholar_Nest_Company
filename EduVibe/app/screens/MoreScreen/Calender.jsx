import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, RefreshControl , SafeAreaView , Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import { useEventContext } from "../../../contexts/EventContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  DrawerActions } from "@react-navigation/native";

// Configure the calendar locale
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

  const handleButtonPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  }; 

  const { events } = useEventContext();
  const [selectedDate, setSelectedDate] = useState("");
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleButtonPress}  style={styles.headerButton} >
            <Ionicons name="funnel-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSettingsModal(true)} style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const onDayPress = (day) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
  
    if (events[dateString] && events[dateString].length > 0) {
      navigation.navigate('EventScreen', { selectedDate: dateString, existingEvents: events[dateString] });
    } else {
      navigation.navigate('EventScreen', { selectedDate: dateString });
    }
  };

  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = { selected: true, selectedColor: "blue" };
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data (e.g., reload events)
    setTimeout(() => {
      // Your data loading logic here (e.g., reload events)
      setRefreshing(false);
    }, 1000); // Example delay to simulate data fetching
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.card}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: "blue",
              todayTextColor: "red",
              arrowColor: "blue",
              monthTextColor: "blue",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "bold",
              textDayFontWeight: "500",
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </View>
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate || "None"}
          </Text>
          {selectedDate && events[selectedDate] && (
            <View style={styles.eventsContainer}>
              {events[selectedDate].map((event, index) => (
                <Text key={index} style={styles.eventText}>
                  - {event.title}: {event.detail}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showSettingsModal}
        onRequestClose={() => {
          setShowSettingsModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.navigate('UpcomingEvents');
                setShowSettingsModal(false);
              }}
            >
              <Text style={styles.modalText}>Upcoming Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.navigate('EventSettings');
                setShowSettingsModal(false);
              }}
            >
              <Text style={styles.modalText}>Event Settings</Text>
            </TouchableOpacity>
            <Pressable style={styles.closeButton} onPress={() => setShowSettingsModal(false)}>
              <Ionicons name="close-outline" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  selectedDateContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventsContainer: {
    marginTop: 8,
  },
  eventText: {
    fontSize: 16,
    color: '#333',
  },
  headerButton: {
    marginRight: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalButton: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: '100%',
    alignItems: "center",
  }
});
