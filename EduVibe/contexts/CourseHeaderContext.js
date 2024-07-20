// contexts/CourseHeaderContext.js
import React, { createContext, useContext, useState } from 'react';
import { Animated } from 'react-native'; 

const CourseHeaderContext = createContext();

export const CourseHeaderProvider = ({ children }) => {
  const [headerProps, setHeaderProps] = useState({
    activeTab: 'Course',
    animateType: 'tab',
  });

  const [scrollY] = useState(new Animated.Value(0));

  return (
    <CourseHeaderContext.Provider value={{ headerProps, setHeaderProps, scrollY }}>
      {children}
    </CourseHeaderContext.Provider>
  );
};

export const useCourseHeader = () => useContext(CourseHeaderContext);
