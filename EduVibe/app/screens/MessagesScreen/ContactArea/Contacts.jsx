import React, { useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../../../../contexts/UsersContext';

const ContactsScreen = ({ searchText }) => {
  const navigation = useNavigation();
  const { users } = useUsers();  // Access the users data from the context

  const filteredRows = useMemo(() => {
    const rows = [];
    const query = searchText.toLowerCase();

    for (const item of users) {
      const nameIndex = item.name.toLowerCase().search(query);

      if (nameIndex !== -1) {
        rows.push({
          ...item,
          index: nameIndex,
        });
      }
    }

    return rows.sort((a, b) => a.index - b.index);
  }, [searchText, users]);  // Add users as a dependency

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.searchContent}>
        {filteredRows.length ? (
          filteredRows.map((contact, index) => {
            const { img, name, phone } = contact;
            return (
              <View key={index} style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ContactDetailsScreen', { contact });
                  }}>
                  <View style={styles.card}>
                    {img ? (
                      <Image
                        alt=""
                        resizeMode="cover"
                        source={{ uri: img }}
                        style={styles.cardImg} />
                    ) : (
                      <View style={[styles.cardImg, styles.cardAvatar]}>
                        <Text style={styles.cardAvatarText}>{name[0]}</Text>
                      </View>
                    )}

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{name}</Text>
                      <Text style={styles.cardPhone}>{phone}</Text>
                    </View>

                    <View style={styles.cardAction}>
                      <FeatherIcon
                        color="#9ca3af"
                        name="chevron-right"
                        size={22} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={styles.searchEmpty}>No results</Text>
        )}
      </ScrollView>
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
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 3,
  },
  cardAction: {
    paddingRight: 16,
  },
});

export default ContactsScreen;
