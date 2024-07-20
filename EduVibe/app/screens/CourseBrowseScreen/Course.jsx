import React, { useEffect } from 'react';
import { View, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCourseHeader } from '../../../contexts/CourseHeaderContext';
import CourseField from './CourseField';

const Course = ({ course }) => {
  const navigation = useNavigation();
  const { setHeaderProps } = useCourseHeader();

  useEffect(() => {
    setHeaderProps((prevProps) => ({
      ...prevProps,
      animateType: 'scroll',
    }));
  }, []);

  const handleButtonPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const { height: screenHeight } = Dimensions.get('window');

  return (
    <>
      <Animated.View style={[styles.header]} />
      <CourseField course={course} />
      <TouchableOpacity style={styles.roundedButton} onPress={handleButtonPress}>
        <Ionicons name="chevron-back-circle" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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
