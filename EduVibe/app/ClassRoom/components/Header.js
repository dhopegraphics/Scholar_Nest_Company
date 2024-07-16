import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Header() {
  return (
    <View style={styles.header}>
      <Icon name="menu" size={24} />
      <Text style={styles.title}>Linear Algebra</Text>
      <View style={styles.icons}>
        <Icon name="info" size={24} style={styles.icon} />
        <Icon name="settings" size={24} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
});
