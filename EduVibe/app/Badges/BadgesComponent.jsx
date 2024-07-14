import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Example of using react-native-vector-icons

const data = [
  { id: 1, icon: 'trophy', name: 'John Doe', subtitle: 'Coding Fundamentals' },
  { id: 2, icon: 'graduation-cap', name: 'Jane Smith', subtitle: 'Data Structures' },
  { id: 3, icon: 'star', name: 'Michael Johnson', subtitle: 'Algorithms Mastery' },
  { id: 4, icon: 'book', name: 'Emily Davis', subtitle: 'Object-Oriented Programming' },
  { id: 5, icon: 'search', name: 'David Wilson', subtitle: 'Data Analysis Fundamentals' },
  { id: 6, icon: 'star', name: 'Sarah Lee', subtitle: 'Machine Learning Essentials' },
];

const Component = () => {
  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.badge}>
          <Icon name={item.icon} size={32} color="#FFFFFF" />
        </View>
        <Text> Giving By</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Example background color
  },
  header: {
    backgroundColor: '#3182CE', // Example primary color
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // Example text color
  },
  menuButton: {
    borderRadius: 999, // Large number for rounded button
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF', // Example card background color
    width: '48%', // Adjust based on your layout needs
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3, // Add shadow for Android
    shadowColor: '#000000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  badge: {
    backgroundColor: '#3182CE', // Example badge background color
    borderRadius: 999, // Large number for rounded badge
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280', // Example subtitle text color
  },
});

export default Component;
