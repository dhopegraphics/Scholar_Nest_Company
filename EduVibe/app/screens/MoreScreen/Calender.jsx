import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import { useEventContext } from "../EventsScreen/EventContext";

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
  const { events } = useEventContext();
  const [selectedDate, setSelectedDate] = useState("");
  const navigation = useNavigation();

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    navigation.navigate('EventScreen', { selectedDate: day.dateString });
  };

  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = { selected: true, selectedColor: "blue" };
  }

  return (
    <View style={styles.container}>
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
                - {event}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
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
});
