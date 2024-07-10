import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useExperience } from '../../../contexts/ExperienceContext';

const ExperienceDetailsScreen = ({ route, navigation }) => {
  const { items, updateExperienceItem } = useExperience();
  const { item } = route.params;

  // State variables for editable fields
  const [editedLabel, setEditedLabel] = useState(item.label);
  const [editedCompany, setEditedCompany] = useState(item.company);
  const [editedJobType, setEditedJobType] = useState(item.jobType);
  const [editedYears, setEditedYears] = useState(item.years);

  // Function to save edits
  const saveEdits = () => {
    const updatedItem = {
      ...item,
      label: editedLabel,
      company: editedCompany,
      jobType: editedJobType,
      years: editedYears,
    };

    updateExperienceItem(updatedItem); // Update context with edited item
    navigation.goBack(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FeatherIcon name={item.icon} size={24} color="#000" />
        <Text style={styles.title}>{item.label}</Text>
      </View>
      
      {/* Editable fields with headers */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Label</Text>
        <TextInput
          style={styles.input}
          value={editedLabel}
          onChangeText={text => setEditedLabel(text)}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Company</Text>
        <TextInput
          style={styles.input}
          value={editedCompany}
          onChangeText={text => setEditedCompany(text)}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Job Type</Text>
        <TextInput
          style={styles.input}
          value={editedJobType}
          onChangeText={text => setEditedJobType(text)}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Years</Text>
        <TextInput
          style={styles.input}
          value={editedYears}
          onChangeText={text => setEditedYears(text)}
        />
      </View>
      
      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveEdits}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#121a26',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#778599',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#121a26',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ExperienceDetailsScreen;
