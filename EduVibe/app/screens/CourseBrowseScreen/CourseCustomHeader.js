import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated , Image } from "react-native";


const CourseCustomHeader = ({
  activeTab,
  animateType,
  course,
  progressPercentage,
  thumbnailImage,
}) => {
  const [marginAnim] = useState(new Animated.Value(1));
  const [opacityAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (animateType === "tab") {
      if (activeTab !== "Course") {
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
    } else if (animateType === "scroll") {
      Animated.timing(opacityAnim, {
        toValue: activeTab === "hidden" ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [activeTab, animateType]);

  const courseTitle = course ? course.title : "No Title";

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        animateType === "tab"
          ? { marginBottom: marginAnim }
          : { opacity: opacityAnim },
      ]}
    >
      <View style={styles.thumbnailContainer}>
      <Image 
          source={thumbnailImage} 
          style={styles.thumbnail} 
          resizeMode="cover" 
        />
      </View>
      <Text style={styles.courseTitle}>{courseTitle}</Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressIndicator,
            { width: `${progressPercentage}%` },
          ]}
        />
      </View>
      <Text style={styles.progress}>{progressPercentage}%</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    padding: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  thumbnailContainer: {
    width: 80,
    height: 70,
    backgroundColor: "#ccc",
    marginRight: 5,
    borderRadius: 20,
  },
  thumbnail: {
    flex: 1,
    backgroundColor: "#aaa",
    borderRadius: 10,
  },
  courseTitle: {
    flex: 1,
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 0,
    marginRight: -280,
    paddingRight: 12,
    paddingTop : "auto",
    marginBottom : "auto"
  },
  progressBar: {
    height: 10,
    width: "59%",
    backgroundColor: "#ddd",
    marginTop: "auto",
    marginRight: 25,
    marginBottom: "0%",
    borderRadius: 10,
  },
  progressIndicator: {
    height: "100%",
    backgroundColor: "#ff9800",
    borderRadius: 10,
   
  },
  progress: {
    marginTop: 50,
    marginBottom: 10,
    color: "black",
    margin : "auto",
    paddingBottom : "auto",
    marginVertical : 10,
    paddingTop : 5,
  },
});

export default CourseCustomHeader;
