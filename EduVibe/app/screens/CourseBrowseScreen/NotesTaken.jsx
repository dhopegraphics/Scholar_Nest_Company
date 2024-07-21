import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotesComponent = () => {
  const [actionSheetVisible, setActionSheetVisible] = useState(null);

  const showActionSheet = (type) => {
    setActionSheetVisible(type);
    this[`actionSheet${type}`].show();
  };

  const handlePress = (index) => {
    console.log(`Selected index: ${index}`);
    setActionSheetVisible(null);
  };

  const options1 = ['Option 1', 'Option 2', 'Option 3', 'Cancel'];
  const options2 = ['Sort by Date', 'Sort by Name', 'Sort by Type', 'Cancel'];

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Text style={styles.topBarButton}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Notes</Text>
        <TouchableOpacity>
          <Text style={styles.topBarButton}>Create new</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dropdowns}>
        <TouchableOpacity onPress={() => showActionSheet('1')} style={styles.dropdown}>
          <Text style={styles.dropdownText}>All lectures</Text>
          <Icon name="chevron-down" size={24} color="#fff" style={styles.dropdownIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showActionSheet('2')} style={styles.dropdown } >
          <Text style={styles.dropdownText}>Sort by most recent</Text>
          <Icon name="chevron-down" size={24} color="#fff" style={{ marginLeft : 5,}} />
        </TouchableOpacity>
      </View>

      <View style={styles.message}>
        <Text style={styles.messageText}>There's nothing here yet</Text>
        <Text style={styles.subText}>Tap "Create new" to make your first note.</Text>
      </View>

      <ActionSheet
        ref={(o) => (this.actionSheet1 = o)}
        title={'Select an option'}
        options={options1}
        cancelButtonIndex={3}
        onPress={(index) => handlePress(index)}
      />
      <ActionSheet
        ref={(o) => (this.actionSheet2 = o)}
        title={'Sort options'}
        options={options2}
        cancelButtonIndex={3}
        onPress={(index) => handlePress(index)}
      />
    </View>
  );
}

export default NotesComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  topBarButton: {
    color: '#F5B227',
    fontWeight: '800',
  },
  topBarTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: '800',
  },
  dropdowns: {
 
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  dropdown: {
    flex: 1,
    backgroundColor: '#444',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#fff',
  },
  dropdownIcon: {
    alignContent : "flex-end",
    marginLeft: 10,
  },
  message: {
    alignItems: 'center',
    marginTop: 40,
  },
  messageText: {
    color: '#1C9C9D',
    fontSize: 20,
    marginBottom: 10,
  },
  subText: {
    color: 'black',
    fontSize: 16,
  },
});
