import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

export default function QuestionTaken({ route }) {
  const { course } = route.params;
  const [category, setCategory] = useState('Select The Lecture');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const submitQuestion = () => {
    // Implement your submit logic here
    console.log('Category:', category);
    console.log('Title:', title);
    console.log('Details:', details);
    console.log('Image:', image);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
       
      <View style={styles.container}>
        <Text style={styles.header}>New Question</Text>

        <TouchableOpacity style={styles.dropdown} onPress={() => setCategoryModalVisible(true)}>
          <Text style={styles.dropdownText}>{category}</Text>
          <Ionicons name="chevron-down" size={20} color="white" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Question title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.detailsInput]}
          placeholder="Details"
          placeholderTextColor="#999"
          value={details}
          onChangeText={setDetails}
          multiline
        />

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={submitQuestion}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <Modal visible={isCategoryModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <FlatList
              data={course.videoHeader}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (

                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(item);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5B227',
  },
  container: {
 
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  detailsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
    marginTop : 70,
  },
  categoryItem: {
   
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
  },
  closeModalText: {
    color: '#1E90FF',
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
});
