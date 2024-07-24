import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchParentWardsForUser } from '../../../lib/appwrite';
import { useAuth } from '../../../contexts/AuthContext';

const AddedWards = () => {
  const { currentUser } = useAuth();
  const [parentWards, setParentWards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchParentWardsForUser(currentUser.username);
        setParentWards(data);
      } catch (error) {
        console.error('Error fetching ParentWards data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser.username]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Added Wards</Text>
      {parentWards.length > 0 ? (
        <FlatList
          data={parentWards}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>Your Ward Username: {item.WardsUsername}</Text>
              <Text>Added By: {item.AddedBy}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No wards added by you</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default AddedWards;
