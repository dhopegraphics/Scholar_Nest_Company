import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import { NewEventStyling } from "../../../themes/NewEvent";

const categoryColors = {
  Meeting: "#0984e3",
  Birthday: "#00b894",
  Reminder: "#00cec9",
};

function NewEvent() {
  const [timers, setTimers] = useState([]);
  const [newTimerTitle, setNewTimerTitle] = useState("");
  const [newTimerCategory, setNewTimerCategory] = useState("");
  const [newTimerDateTime, setNewTimerDateTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categorySelectedMessage, setCategorySelectedMessage] = useState("");
  const [dateSelectedMessage, setDateSelectedMessage] = useState("");

  useEffect(() => {
    const intervalIds = {};

    const updateTimers = () => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          const targetTime = new Date(timer.targetDateTime).getTime();
          const currentTime = new Date().getTime();
          const timeRemaining = Math.max(
            Math.floor((targetTime - currentTime) / 1000),
            0
          );

          if (timeRemaining === 0) {
            clearInterval(intervalIds[timer.id]);
            return { ...timer, isRunning: false, timeRemaining: 0 };
          }

          return { ...timer, timeRemaining };
        })
      );
    };

    timers.forEach((timer) => {
      if (timer.isRunning && timer.timeRemaining > 0 && timerRunning) {
        intervalIds[timer.id] = setInterval(updateTimers, 1000);
      }
    });

    return () => {
      Object.values(intervalIds).forEach((intervalId) =>
        clearInterval(intervalId)
      );
    };
  }, [timers, timerRunning]);

  const removeTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.filter((timer) => timer.id !== timerId)
    );
  };

  const calculateTimeRemaining = (targetTime) => {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;
    const secondsRemaining = Math.max(Math.floor(timeDifference / 1000), 0);
    return secondsRemaining;
  };

  const formatTimeRemaining = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds: remainingSeconds,
    };
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setNewTimerDateTime(date.toISOString());
    setDateSelectedMessage("Date has been selected successfully");
    hideDatePicker();
    setTimeout(() => {
      setDateSelectedMessage("");
    }, 1000);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setCategorySelectedMessage("Category has been selected successfully");
    setModalVisible(false);
    setTimeout(() => {
      setCategorySelectedMessage("");
    }, 1000);
  };

  const addTimer = () => {
    if (!newTimerTitle || !selectedCategory || !newTimerDateTime) return;

    const targetDateTime = new Date(newTimerDateTime).getTime();

    const newTimer = {
      id: timers.length + 1,
      category: selectedCategory,
      targetDateTime,
      timeRemaining: calculateTimeRemaining(targetDateTime),
      isRunning: true,
      title: newTimerTitle,
      showTitleInput: false,
    };

    setTimers([...timers, newTimer]);
    setNewTimerTitle("");
    setNewTimerCategory("");
    setNewTimerDateTime("");
    setTimerRunning(true);
  };

  return (
    <ScrollView style={NewEventStyling.container}>
      <View style={NewEventStyling.inputContainer}>
        <Text style={NewEventStyling.heading}>Event Countdown Timer</Text>
        <TextInput
          style={NewEventStyling.input}
          placeholder="Timer Title"
          placeholderTextColor="#aaa"
          value={newTimerTitle}
          onChangeText={(text) => setNewTimerTitle(text)}
        />
        <TouchableOpacity
          style={NewEventStyling.button}
          onPress={toggleModal}
          disabled={!newTimerTitle}
        >
          <Text style={NewEventStyling.buttonText}>Select Category</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={NewEventStyling.modalContainer}>
            <Text style={NewEventStyling.modalTitle}>Select a Category</Text>
            <TouchableOpacity
              style={NewEventStyling.categoryButton}
              onPress={() => handleCategorySelection("Meeting")}
            >
              <Text style={NewEventStyling.buttonText}>Meeting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={NewEventStyling.categoryButton}
              onPress={() => handleCategorySelection("Birthday")}
            >
              <Text style={NewEventStyling.buttonText}>Birthday</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={NewEventStyling.categoryButton}
              onPress={() => handleCategorySelection("Reminder")}
            >
              <Text style={NewEventStyling.buttonText}>Reminder</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={NewEventStyling.messageText}>
          {categorySelectedMessage}
        </Text>
        <TouchableOpacity
          style={NewEventStyling.button}
          onPress={showDatePicker}
          disabled={!newTimerTitle || !selectedCategory}
        >
          <Text style={NewEventStyling.buttonText}>Select Date</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          customPicker={
            <View style={{ backgroundColor: 'black', padding: 20 }}>
              <Text style={{ color: 'white' }}>Select Date and Time</Text>
            </View>
          }
        />
        <Text style={NewEventStyling.messageText}>{dateSelectedMessage}</Text>
        <TouchableOpacity
          style={NewEventStyling.button}
          onPress={addTimer}
          disabled={!newTimerTitle || !selectedCategory || !newTimerDateTime}
        >
          <Text style={NewEventStyling.buttonText}>Add Timer</Text>
        </TouchableOpacity>
      </View>
      <View style={NewEventStyling.timersContainer}>
        {timers.map((timer) => {
          const timeRemaining = formatTimeRemaining(timer.timeRemaining);

          return (
            <View
              key={timer.id}
              style={[
                NewEventStyling.card,
                {
                  backgroundColor: categoryColors[timer.category] || "transparent",
                },
              ]}
            >
              <Text style={NewEventStyling.cardTitle}>{timer.title}</Text>
              <Text style={NewEventStyling.cardCategory}>{timer.category}</Text>
              <View style={NewEventStyling.timerInfo}>
                {timeRemaining.days > 0 && (
                  <View style={NewEventStyling.timeInfo}>
                    <Text>
                      <Text style={NewEventStyling.timeValue}>
                        {timeRemaining.days}
                      </Text>{" "}
                      days
                    </Text>
                  </View>
                )}
                <View style={NewEventStyling.timeInfo}>
                  <Text>
                    <Text style={NewEventStyling.timeValue}>
                      {timeRemaining.hours}
                    </Text>{" "}
                    hours
                  </Text>
                </View>
                <View style={NewEventStyling.timeInfo}>
                  <Text>
                    <Text style={NewEventStyling.timeValue}>
                      {timeRemaining.minutes}
                    </Text>{" "}
                    minutes
                  </Text>
                </View>
                <View style={NewEventStyling.timeInfo}>
                  <Text>
                    <Text style={NewEventStyling.timeValue}>
                      {timeRemaining.seconds}
                    </Text>{" "}
                    seconds
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={NewEventStyling.button}
                onPress={() => removeTimer(timer.id)}
                disabled={timer.timeRemaining <= 0}
              >
                <Text style={NewEventStyling.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default NewEvent;
