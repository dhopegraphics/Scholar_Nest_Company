import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import ClassCard from './components/ClassCard';
import AnnouncementCard from './components/AnnouncementCard';
import AssignmentCard from './components/AssignmentCard';
import NewMaterialCard from './components/NewMaterialCard';

export default function SubjectRoom() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView >
        <ClassCard />
        <AnnouncementCard />
        <AssignmentCard title="Assignment 2" date="6 Nov" attachment="+ 1 attachment" />
        <NewMaterialCard title="New material available" date="6 Nov" />
      </ScrollView>
      <Footer />

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

});
