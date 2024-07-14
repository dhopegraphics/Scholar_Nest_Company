import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useCourseContext } from '../../../contexts/useCourseContext';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCourseHeader } from '../../../contexts/CourseHeaderContext';
import CourseField from './CourseField'; // Import your CourseField component

const Course = () => {
  const { course } = useCourseContext();
  const navigation = useNavigation();
  const { setHeaderProps, scrollY } = useCourseHeader();

  useEffect(() => {
    setHeaderProps((prevProps) => ({
      ...prevProps,
      animateType: 'scroll',
    }));
  }, []);

  if (!course) {
    return <Text>No course selected</Text>;
  }

  const handleButtonPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  // Calculate screen dimensions
  const { height: screenHeight } = Dimensions.get('window');

  return (
    <>
      <Animated.View style={[styles.header]}>
      </Animated.View>
          <CourseField />
      <TouchableOpacity style={styles.roundedButton} onPress={handleButtonPress}>
        <Ionicons name="chevron-back-circle" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  creator: {
    fontSize: 18,
    marginTop: 8,
  },
  roundedButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -25 }],
    backgroundColor: "#3b82f6",
    width: 70,
    height: 50,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default Course;
