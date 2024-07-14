import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayerScreen = ({ route }) => {
  const { videos } = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videos[0] }} // Assuming you want to play the first video in the array
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default VideoPlayerScreen;
