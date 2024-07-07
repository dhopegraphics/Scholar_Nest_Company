import React from 'react';
import { View } from 'react-native';
import ContactDetailsScreen from '../app/screens/chat/ContactDetailsScreen';
import { useUsers } from '../contexts/UsersContext';

const TestingMessagingScreen = () => {
  const { users } = useUsers();

  // Assuming '1' is Bell Burgess and '2' is Bernard Baker
  const sender = users.find(user => user.id === '2');
  const receiver = users.find(user => user.id === '1');

  return (
    <View style={{ flex: 1 }}>
      <ContactDetailsScreen route={{ params: { contact: receiver } }} />
    </View>
  );
};

export default TestingMessagingScreen;
