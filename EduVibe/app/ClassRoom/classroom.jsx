import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageExport from "../../assets/images/imageExport";

const data = [
  {
    id: 1,
    title: "Linear Algebra",
    description: "MT-203-UG21(3rd),BS CSE(Sec-A)",
    instructor: "Dr. Naeem Ullah",
    bgColor: "#e91e63",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms-Fall2K22",
    description: "A,B",
    instructor: "Syed Ali Nqai Raza",
    bgColor: "#2196f3",
  },
  {
    id: 3,
    title: "INTERNATIONAL RELATIONS",
    description: "HS-302-UG 21 3RD,SE Section A-B",
    instructor: "Zahida Jabeen Maths",
    bgColor: "#009688",
  },
  {
    id: 4,
    title: "Software Requirements Engineering",
    description: "SE-201 Fall 2022, BSSE-2021(A)",
    instructor: "Mehwish Naseer",
    bgColor: "#607d8b",
  },
  {
    id: 5,
    title: "Human Computer Interaction",
    description: "CS-408, UG-21(3rd), SE",
    instructor: "Veena Dilshad CSCE",
    bgColor: "#3f51b5",
  },
];

const MenuIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>☰</Text>
  </View>
);

const OptionIcon = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>⋮</Text>
  </View>
);

const Card = ({ title, description, instructor, bgColor, onPress }) => (
  <TouchableOpacity
    style={[styles.card, { backgroundColor: bgColor }]}
    onPress={onPress}
  >
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardInstructor}>{instructor}</Text>
      <TouchableOpacity style={styles.optionIcon}>
        <OptionIcon />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const ClassRoomHome = () => {
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    navigation.navigate("SubjectRoom", { item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MenuIcon />
        <Text style={styles.headerTitle}>EduVibe ClassRoom</Text>
        <Image source={imageExport.logo} style={styles.avatar} />
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            instructor={item.instructor}
            bgColor={item.bgColor}
            onPress={() => handleCardPress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ClassRoomHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  main: {
    width: "100%",
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  cardDescription: {
    fontSize: 12,
    color: "#ffffff",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInstructor: {
    color: "#ffffff",
  },
  optionIcon: {
    padding: 4,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 24,
    color: "#000",
  },
});
