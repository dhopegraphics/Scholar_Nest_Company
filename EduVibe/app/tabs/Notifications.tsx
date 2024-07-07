import { View, Text } from 'react-native'
import React from 'react'
import NotifiedState from '../UseSates/Notifications/NotifiedState';
import NoNotificationsState from '../UseSates/Notifications/noNotificationsState';

const Notifications = () => {
  return (
      <NoNotificationsState/>
  );
};

export default Notifications