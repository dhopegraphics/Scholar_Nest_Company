import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import NotifiedState from '../UseSates/Notifications/NotifiedState';
import { NoteStyles } from '../../themes/NotificationStyle';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../navigation/AppNavigator';

type NotificationsScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'ContactsMainScreen'
>;

const Notifications = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();

  return (
    <>
      <View style={NoteStyles.backColor}>
        <Text style={NoteStyles.title}>Notifications</Text>
        <View style={NoteStyles.headerAction}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ContactsMainScreen');
            }}>
            <FeatherIcon
              color="#266EF1"
              name="user-plus"
              size={21}
            />
          </TouchableOpacity>
        </View>
      </View>
      <NotifiedState />
    </>
  );
};

export default Notifications;
