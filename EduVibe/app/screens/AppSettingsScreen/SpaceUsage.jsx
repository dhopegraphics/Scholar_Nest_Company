import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import imageExport from "../../../assets/images/imageExport";
import { useUsers } from "../../../contexts/UsersContext";
import getCacheSize from "../../../constants/CachedFiles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SpaceUsageScreen = (props) => {
  const { users, currentUserId } = useUsers();
  const [currentUserName, setCurrentUserName] = useState("");
  const [cacheSize, setCacheSize] = useState("Calculating...");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Find the current user's data
    const currentUser = users.find((user) => user.id === currentUserId);
    if (currentUser) {
      setCurrentUserName(currentUser.name);
    }
  }, [users, currentUserId]);

  useEffect(() => {
    // Fetch cache size when the component mounts
    const fetchCacheSize = async () => {
      const size = await getCacheSize();
      setCacheSize(size.toFixed(2) + " MB");
      updateData(size.toFixed(2) + " MB");
    };

    fetchCacheSize();
  }, []);

  const updateData = (size) => {
    const newData = [
      {
        id: "1",
        title: "EduVibe - Learning and Teaching platform",
        url: "scholarnestcompany.edu.gh",
        name: currentUserName,
        size: size,
        image: imageExport.logo,
      },
    ];
    setData(newData);
  };

  const handleClearCache = async () => {
    setLoading(true); // Show loader
    try {
      await AsyncStorage.clear();
      setCacheSize("0.00 MB"); // Update the cache size to 0 after clearing
      updateData("0.00 MB");
      Alert.alert("Success", "Cache files cleared successfully");
      console.log("Cache cleared");
    } catch (error) {
      console.error("Failed to clear cache:", error.message);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <Image source={item.image} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.url}>{item.url}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.size}>{item.size}</Text>
        </View>
      </View>
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

      <TouchableOpacity
        style={styles.clearCacheButton}
        onPress={handleClearCache}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#00796b" />
        ) : (
          <>
            <Icon name="clear" size={24} color="blue" />
            <Text style={styles.clearCacheText}>Clear Cache ({cacheSize})</Text>
          </>
        )}
      </TouchableOpacity>
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
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
  },
  url: {
    fontSize: 12,
    color: "gray",
  },
  name: {
    fontSize: 10,
    color: "#000",
  },
  size: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  trashIcon: {
    padding: 0,
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
  clearCacheButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
    margin: 10,
  },
  clearCacheText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00796b",
    marginLeft: 10,
  },
});

export default SpaceUsageScreen;
