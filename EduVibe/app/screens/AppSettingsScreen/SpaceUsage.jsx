// SpaceUsage.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import imageExport from "../../../assets/images/imageExport";
import { Tile } from "react-native-elements";

const data = [
  {
    id: "1",
    title: "Moodle - Open-source learning platform",
    url: "moodle.org",
    name: "Paapa Cobbold",
    size: "4.97 MB",
    image: imageExport.logo,
  },
];

const SpaceUsageScreen = (props) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.url}>{item.url}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.size}>{item.size}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.trashIcon}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalSize}>9.62 MB</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  flatList: {
    marginLeft: 10,
  },
  listContent: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  url: {
    fontSize: 12,
    color: "gray",
  },
  name: {
    fontSize: 14,
    color: "#000",
  },
  size: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  trashIcon: {
    padding: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalSize: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SpaceUsageScreen;
