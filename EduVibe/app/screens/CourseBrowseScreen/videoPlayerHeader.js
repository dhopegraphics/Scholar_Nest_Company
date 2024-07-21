// videoPlayerHeader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const VideoPlayerHeader = ({ videoUrl, onStatusUpdate }) => {
  return (
    <View style={styles.videoContainer}>
      <Video
        style={styles.video}
        source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={onStatusUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
});

export default VideoPlayerHeader;
