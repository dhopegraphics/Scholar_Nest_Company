import React, { createContext, useState, useContext } from 'react';

// Create a context for the course data
const CourseContext = createContext();

// Create a custom hook to use the CourseContext
export const useCourse = () => {
  return useContext(CourseContext);
};

// Create a provider component
export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(null);

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
