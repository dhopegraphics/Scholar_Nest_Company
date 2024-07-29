import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../../../../contexts/UsersContext';
import Modal from 'react-native-modal';
import { getCurrentUser } from '../../../../lib/appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactsCard from '../../../../components/ContactsCard';

const ContactsScreen = ({ searchText }) => {
  const navigation = useNavigation();
  const { users } = useUsers();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [acceptedContacts, setAcceptedContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUserId(user.$id);
      } catch (error) {
        console.error('Failed to fetch current user', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchAcceptedContacts = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const acceptedKeys = keys.filter(key => key.startsWith('accepted_'));
      const contacts = await AsyncStorage.multiGet(acceptedKeys);
      const parsedContacts = contacts.map(contact => JSON.parse(contact[1]));
      setAcceptedContacts(parsedContacts);
    } catch (error) {
      console.error('Failed to fetch accepted contacts', error);
    }
  };

  useEffect(() => {
    fetchAcceptedContacts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAcceptedContacts();
    setRefreshing(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLongPress = (contact) => {
    setSelectedContact(contact);
    toggleModal();
  };

  const filteredRows = useMemo(() => {
    const rows = [];
    const query = searchText.toLowerCase();

    for (const item of acceptedContacts) {
      if (item.$id !== currentUserId) {
        const nameIndex = item.username.toLowerCase().search(query);

        if (nameIndex !== -1) {
          rows.push({
            ...item,
            index: nameIndex,
          });
        }
      }
    }

    return rows.sort((a, b) => a.index - b.index);
  }, [searchText, acceptedContacts, currentUserId]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.searchContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredRows.length ? (
          filteredRows.map((contact, index) => (
            <View key={index} style={styles.cardWrapper}>
              <ContactsCard
                name={contact.username}
                img={contact.avatar}
                onPress={() => navigation.navigate('ContactDetailsScreen', { contact })}
                onLongPress={() => handleLongPress(contact)}
              />
            </View>
          ))
        ) : (
          <Text style={styles.searchEmpty}>No results</Text>
        )}
      </ScrollView>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Move Contact To</Text>
          <TouchableOpacity onPress={() => Alert.alert(`You Have Starred ${selectedContact?.username}`)}>
            <Text style={styles.modalItem}>Starred</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert(`${selectedContact?.username} has been moved to Private`)}>
            <Text style={styles.modalItem}>Private</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert(`${selectedContact?.username} has been deleted`)}>
            <Text style={styles.modalItem}>Delete Contact</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  searchContent: {
    paddingLeft: 24,
  },
  searchEmpty: {
    textAlign: 'center',
    paddingTop: 16,
    fontWeight: '500',
    fontSize: 15,
    color: '#9ca1ac',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalItem: {
    fontSize: 16,
    marginVertical: 10,
    alignSelf: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "justify"
  },
});

export default ContactsScreen;
