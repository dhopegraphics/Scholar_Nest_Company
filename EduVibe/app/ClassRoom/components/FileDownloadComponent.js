import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const FileDownloadComponent = ({ fileUrl, fileName }) => {
  const downloadAndShareFile = async () => {
    const fileUri = FileSystem.documentDirectory + fileName;
    try {
      const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);
      console.log('File downloaded to:', uri);

      if (!(await Sharing.isAvailableAsync())) {
        alert(`Uh oh, sharing isn't available on your platform`);
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      alert('File download failed');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={downloadAndShareFile} style={styles.button}>
        <Text style={styles.buttonText}>Download {fileName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FileDownloadComponent;
