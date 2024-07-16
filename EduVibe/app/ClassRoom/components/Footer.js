import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Button
        type="clear"
        icon={<Icon name="live-tv" size={24} />}
        title="Stream"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      <Button
        type="clear"
        icon={<Icon name="school" size={24} />}
        title="Classwork"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      <Button
        type="clear"
        icon={<Icon name="people" size={24} />}
        title="People"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  button: {
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    marginTop: 4,
  },
});
