import { StyleSheet } from "react-native";

export const UpcomingEventStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    eventItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
    },
    eventAvatar: {
      marginRight: 16,
    },
    eventTextContainer: {
      flex: 1,
    },
    eventDate: {
      fontSize: 14,
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 4,
    },
    eventDetail: {
      fontSize: 16,
      marginTop: 2,
    },
    noEventsText: {
      fontSize: 18,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#007bff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8, // Android
      shadowColor: '#000', // iOS
      shadowOffset: { width: 0, height: 4 }, // iOS
      shadowOpacity: 0.3, // iOS
    },
    addButtonText: {
      fontSize: 30,
      color: '#fff',
    },
  });
  