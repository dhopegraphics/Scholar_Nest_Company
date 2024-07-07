import React from 'react';
import {
  NoteStylesheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../../../contexts/UsersContext';
import { NoteStyles } from '../../../themes/NotificationStyle';

const NotifiedState = () => {
  const { users } = useUsers();
  const navigation = useNavigation();

  const handleContactPress = (contact) => {
    navigation.navigate('ContactDetailsScreen', { contact });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <ScrollView
        contentContainerStyle={NoteStyles.container}
        showsVerticalScrollIndicator={false}>
        {users.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            onPress={() => handleContactPress(contact)}>
            <View style={NoteStyles.card}>
              <Image
                alt=""
                resizeMode="cover"
                style={NoteStyles.cardImg}
                source={{ uri: contact.img }}
              />
              <View>
                <Text style={NoteStyles.cardTitle}>{contact.name}</Text>
                <View style={NoteStyles.cardStats}>
                  <View style={NoteStyles.cardStatsItem}>
                    <FeatherIcon color="#636a73" name="clock" />
                    <Text style={NoteStyles.cardStatsItemText}>
                      {contact.duration} mins ago
                    </Text>
                  </View>
                  <View style={NoteStyles.cardStatsItem}>
                    <FeatherIcon color="#636a73" name="zap" />
                    <Text style={NoteStyles.cardStatsItemText}>
                      {contact.NoteCount}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={NoteStyles.cardAction}>
                <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotifiedState;

