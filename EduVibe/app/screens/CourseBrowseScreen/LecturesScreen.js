import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView  , Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayerHeader from './videoPlayerHeader';
import { useCourseHeader } from '../../../contexts/CourseHeaderContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const LecturesScreen = ({ course }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedHeader, setSelectedHeader] = useState(null);
    const [status, setStatus] = useState({});
    const { setHeaderProps } = useCourseHeader();
    const [downloadProgress, setDownloadProgress] = useState({});
  
    useEffect(() => {
      const loadDownloadProgress = async () => {
        try {
          const storedProgress = await AsyncStorage.getItem(`downloadProgress_${course.$id}`);
          if (storedProgress) {
            setDownloadProgress(JSON.parse(storedProgress));
          }
        } catch (error) {
          console.error('Failed to load download progress:', error);
        }
      };
    
      loadDownloadProgress();
    }, [course.$id]);
    
  
    useEffect(() => {
      // Save download progress to AsyncStorage
      const saveDownloadProgress = async () => {
        try {
          await AsyncStorage.setItem(`downloadProgress_${course.$id}`, JSON.stringify(downloadProgress));
        } catch (error) {
          console.error('Failed to save download progress:', error);
        }
      };
  
      saveDownloadProgress();
    }, [downloadProgress, course.$id]);
  
    const handleVideoPress = (videoUrl, header) => {
      setSelectedVideo(videoUrl);
      setSelectedHeader(header);
      setHeaderProps({
        headerComponent: <VideoPlayerHeader videoUrl={videoUrl} onStatusUpdate={setStatus} />,
      });
    };
  
    const showRemoveDownloadAlert = (index) => {
      Alert.alert(
        'Remove Download',
        'Do you want to remove this from your downloads?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              setDownloadProgress((prevProgress) => ({ ...prevProgress, [index]: 0 }));
            },
          },
        ]
      );
    };
  
    const handleDownloadPress = (index) => {
      if (downloadProgress[index] === 100) {
        showRemoveDownloadAlert(index);
        return;
      }
    
      // Start the download and update progress
      let progress = 0;
      setDownloadProgress((prevProgress) => {
        const newProgress = { ...prevProgress, [index]: progress };
        saveDownloadProgress(newProgress); // Save progress immediately
        return newProgress;
      });
    
      const downloadInterval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
          clearInterval(downloadInterval);
          setDownloadProgress((prevProgress) => {
            const newProgress = { ...prevProgress, [index]: 100 };
            saveDownloadProgress(newProgress); // Save progress when complete
            return newProgress;
          });
        } else {
          setDownloadProgress((prevProgress) => {
            const newProgress = { ...prevProgress, [index]: progress };
            saveDownloadProgress(newProgress); // Save progress during download
            return newProgress;
          });
        }
      }, 100);
    };
    
    const saveDownloadProgress = async (progress) => {
      try {
        await AsyncStorage.setItem(`downloadProgress_${course.$id}`, JSON.stringify(progress));
      } catch (error) {
        console.error('Failed to save download progress:', error);
      }
    };
    
  
    useEffect(() => {
      if (selectedHeader !== null) {
        console.log(`Selected header: ${selectedHeader}`);
      }
    }, [selectedHeader]);
  
    useEffect(() => {
      console.log('Download Progress:', downloadProgress);
    }, [downloadProgress]);
    
    useEffect(() => {
      console.log('Loaded Download Progress:', downloadProgress);
    }, []);
    
  
    return (
      <View>
        {course.videoHeader.map((header, index) => (
          <View key={index} style={styles.videoContainer}>
            <View style={styles.headerWithDownload}>
              <TouchableOpacity
                onPress={() => handleVideoPress(course.videos[index], header)}
                style={[
                  styles.videoHeaderContainer,
                  selectedHeader === header && styles.selectedVideoHeaderContainer
                ]}
              >
                <Text
                  style={[
                    styles.videoHeader,
                    selectedHeader === header && styles.selectedVideoHeader
                  ]}
                >
                  {`${index + 1}. ${header}`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => handleDownloadPress(index)}
              >
                <AnimatedCircularProgress
                  size={27}
                  width={3}
                  fill={downloadProgress[index] || 0}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875"
                >
                  {(fill) => (
                    <Icon
                      name={fill === 100 ? "check" : "download"}
                      size={18}
                      color={fill === 100 ? "#4caf50" : "black"}
                    />
                  )}
                </AnimatedCircularProgress>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  };

  export default LecturesScreen;

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