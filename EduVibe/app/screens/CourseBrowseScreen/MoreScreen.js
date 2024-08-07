
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView  , Alert} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FileDownloadComponent from '../../ClassRoom/components/FileDownloadComponent';
import QuestionTaken from './QuestionTaken';
import NotesComponent from './NotesTaken';
import * as Sharing from 'expo-sharing';

const MoreScreen = ({ course, navigation }) => {
    const bottomSheetRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
  
    // Define the default snap points
    const defaultSnapPoints = useMemo(() => ['1%', '25%', '50%', '90%'], []);
    // Define the snap points for the Notes
    const notesSnapPoints = useMemo(() => ['1%', '25%', '50%', '100%'], []);
  
    const renderContent = () => (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {selectedItem === 'About this course' && (
          <View>
            <Text style={styles.sheetText}>{course.description}</Text>
          </View>
        )}
        {selectedItem === 'Course certificate' && (
          <View>
            <Icon name="certificate" size={150} color="#3b82f6" style={{ alignContent: "center", alignSelf: "center" }} />
            <Text style={styles.sheetText}>Download Your Certificate For {course.title}</Text>
            <FileDownloadComponent
              fileUrl="https://morth.nic.in/sites/default/files/dd12-13_0.pdf"
              fileName="Certificate.pdf"
            />
          </View>
        )}
        {selectedItem === 'Q&A' && (
          <View>
            <TouchableOpacity
              style={{ padding: 12, marginBottom: 8, borderRadius: 8, borderColor: "#F5B227", borderWidth: 2, backgroundColor: "#F5B227" }}
              onPress={() => { navigation.navigate("QuestionTaken", { course: course }) }}
            >
              <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 17, color: "#010101" }}>Ask a Question</Text>
            </TouchableOpacity>
            <Text style={styles.sheetText}>Certificate Information: Explanation of how to earn the certificate.</Text>
            <Text style={styles.sheetText}>Share Options: Buttons to share the certificate on social media or via email.</Text>
          </View>
        )}
        {selectedItem === 'Notes' && (
          <NotesComponent />
        )}
        {selectedItem === 'Resources' && (
          <View>
            <Text style={styles.sheetText}>Certificate Information: Explanation of how to earn the certificate.</Text>
            <Text style={styles.sheetText}>Download Option: Link to download or view the certificate.</Text>
            <Text style={styles.sheetText}>Share Options: Buttons to share the certificate on social media or via email.</Text>
          </View>
        )}
        {selectedItem === 'Questions' && (
          <View>
            <QuestionTaken course={course} />
          </View>
        )}
      </ScrollView>
    );
  
    useEffect(() => {
      if (selectedItem === 'Notes') {
        bottomSheetRef.current.snapToIndex(3); // Snap to the top if 'Notes' is selected
      }
    }, [selectedItem]);
  
    const handleShare = async () => {
      try {
        // Replace with the content you want to share
        const url = `https://eduvibe.com/courses/${course.$id}/${course.title}`; // Example URL
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(url, {
            mimeType: 'text/plain',
            UTI: 'public.text',
          });
        } else {
          Alert.alert('Sharing is not available on this device');
        }
      } catch (error) {
        Alert.alert('Error', `Failed to share: ${error.message}`);
      }
    };
  
    return (
      <View style={styles.ActionContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setSelectedItem('About this course'); bottomSheetRef.current.expand(); }}
        >
          <Icon name="information" size={24} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>About this course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setSelectedItem('Course certificate'); bottomSheetRef.current.expand(); }}
        >
          <Icon name="certificate" size={26} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>Course certificate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={handleShare} >
          <Icon name="arrow-up-box" size={24} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>Share this course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setSelectedItem('Q&A'); bottomSheetRef.current.expand(); }}
        >
          <Icon name="android-messages" size={26} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>Q&A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setSelectedItem('Notes'); bottomSheetRef.current.expand(); }}
        >
          <Icon name="application-edit" size={26} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setSelectedItem('Resources'); bottomSheetRef.current.expand(); }}
        >
          <Icon name="dns" size={26} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}
        >
          <Icon name="flag-outline" size={26} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>Add course to favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}
        >
          <Icon name="archive" size={26} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>Archive course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}
        >
          <Icon name="bug" size={26} color="#3b82f6" style={styles.icon} />
          <Text style={styles.buttonText}>Report a playback problem</Text>
        </TouchableOpacity>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Start closed
          snapPoints={selectedItem === 'Notes' ? notesSnapPoints : defaultSnapPoints} // Dynamically set snap points
        >
          {renderContent()}
        </BottomSheet>
      </View>
    );
  };

  export default MoreScreen;
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    videoContainer: {
      marginBottom: 5,
    },
    videoHeaderContainer: {
      padding: 10,
    },
    selectedVideoHeaderContainer: {
      backgroundColor: '#e0f7fa',
    },
    videoHeader: {
      fontSize: 16,
      color: '#333',
      fontWeight: "600",
    },
    selectedVideoHeader: {
      color: '#00796b',
      fontWeight: '900',
    },
    ActionContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    button: {
      padding: 12,
      marginBottom: 8,
      borderRadius: 8,
    },
    contentContainer: {
      padding: 16,
    },
    sheetText: {
      marginBottom: 8,
      fontSize: 16,
    },
    icon: {
      marginRight: 70,
      marginTop: -5,
    },
    buttonText: {
      marginLeft: 40,
      fontSize: 16,
      marginTop: -21,
      fontWeight: "700"
    },
    downloadButton: { 
      alignItems : 'flex-end',
      marginRight : 10,
      
    },
    headerWithDownload: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
