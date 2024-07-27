import React  from 'react';
import { View, Text, StyleSheet } from 'react-native';



const DownloadsScreen = ({ course, downloadProgress }) => {
    const downloadedHeaders = Object.keys(downloadProgress).filter(index => downloadProgress[index] === 100);
  
    console.log('Downloaded Headers:', downloadedHeaders);
  
    return (
      <View style={styles.center}>
        {downloadedHeaders.length > 0 ? (
          downloadedHeaders.map(index => (
            <View key={index} style={styles.videoContainer}>
              <Text style={styles.videoHeader}>{`${parseInt(index) + 1}. ${course.videoHeader[index]}`}</Text>
            </View>
          ))
        ) : (
          <>
            <Text style={styles.header}>No downloads yet</Text>
            <Text>Your downloaded lectures go here</Text>
          </>
        )}
      </View>
    );
  };

  export default DownloadsScreen ;
  
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