import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity , FlatList} from "react-native";
import React, { useState, useEffect } from 'react';
import { Appbar } from "react-native-paper";
import ContactsCard from "../../../components/ContactsCard";
import { useUsers } from "../../../contexts/UsersContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wardsreport = ({ navigation }) => {
  const { users } = useUsers();

  const handleResultPress = (item) => {
    console.log("Item clicked:", item);
    navigation.navigate('ThierReports', { userId: item.id }); // Navigate to UserAccount with userId as a parameter
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Reports" />
        </Appbar.Header>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <View style={styles.iconContainer}>
          <Icon name="bar-chart" size={100} style={styles.gradesIcon} />
        </View> */}
              </ScrollView>
              <View style = {{  paddingBottom : 460,}}>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleResultPress(item)}>
                <ContactsCard 
                  name={item.name} 
                  img={item.img} 
                  onPress={() => handleResultPress(item)}
                />
              </TouchableOpacity>
            )}
          />

</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: -45,
  },
  header: {
    height: 56,
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradesIcon: {
    height: "auto",
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default Wardsreport;
