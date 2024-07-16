import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Header from './components/Header';

const Stack = createStackNavigator();


const PeopleParticipating = ({route}) => {
  const { item } = route.params;
  const teachers = [{ id: 1, name: 'cyril usikpedo', avatar: 'https://via.placeholder.com/50' }];
  const classmates = [
    { id: 1, name: 'Gwendolin Obianodo', avatar: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Reign of Stickmen', avatar: 'https://via.placeholder.com/50' },
    { id: 3, name: 'salamatu suleiman', avatar: 'https://via.placeholder.com/50' },
  ];

  return (
    <><Header HeaderTitle = {item.title}  />
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Teachers</Text>
        {teachers.map((teacher) => (
          <View key={teacher.id} style={styles.item}>
            <Image source={{ uri: teacher.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{teacher.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Classmates</Text>
        {classmates.map((classmate) => (
          <View key={classmate.id} style={styles.item}>
            <Image source={{ uri: classmate.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{classmate.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView></>
  );
};

export default PeopleParticipating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
  },
});
