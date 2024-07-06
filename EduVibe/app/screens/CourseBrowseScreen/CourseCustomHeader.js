import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CourseCustomHeader = ({ activeTab, animateType }) => {
  const [marginAnim] = useState(new Animated.Value(1));
  const [opacityAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (animateType === 'tab') {
      if (activeTab === 'Participants') {
        Animated.timing(marginAnim, {
          toValue: -130,
          duration: 100,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(marginAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: false,
        }).start();
      }
    } else if (animateType === 'scroll') {
      Animated.timing(opacityAnim, {
        toValue: activeTab === 'hidden' ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [activeTab, animateType]);

  // Dummy data for course information (replace with actual course data)
  const courseTitle = "Introduction to React Native";
  const progressPercentage = 75; // Example percentage

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        animateType === 'tab' ? { marginBottom: marginAnim } : { opacity: opacityAnim },
      ]}
    >
      <View style={styles.thumbnailContainer}>
        <View style={styles.thumbnail} />
      </View>
      <Text style={styles.courseTitle}>{courseTitle}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressIndicator, { width: `${progressPercentage}%` }]} />
      </View>
      <Text style={styles.progress}>{progressPercentage}%</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    flexDirection: 'row', // Arrange items horizontally
  },
  thumbnailContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#ccc', // Placeholder color for thumbnail
    marginRight: 5,
    borderRadius: 20,
  },
  thumbnail: {
    flex: 1,
    backgroundColor: '#aaa', // Placeholder color for thumbnail content
    borderRadius: 10,
  },
  courseTitle: {
    flex: 1, // Take remaining space
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -25,
    marginRight: -270,
    paddingRight: 10,
  },
  progressBar: {
    height: 10,
    width: "59%", // Full width of the header
    backgroundColor: '#ddd',
    marginTop: 50,
    marginRight: 25,
    marginBottom: 8,
    borderRadius: 10,
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#ff9800', // Progress color
    borderRadius: 10,
  },
  progress: {
    marginTop: 50,
    marginBottom: 8,
    color: "black",
  },
});

export default CourseCustomHeader;
