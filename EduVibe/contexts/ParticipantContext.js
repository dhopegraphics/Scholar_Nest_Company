import React, { createContext, useContext } from 'react';
import { joinCourse as apiJoinCourse, getUserJoinedCourses as apiGetUserJoinedCourses } from '../lib/appwrite'; // Import your API methods

const ParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
  const joinCourse = async (userId, courseId) => {
    try {
      if (!userId || !courseId) {
        throw new Error('Invalid userId or courseId provided');
      }
      await apiJoinCourse(userId, courseId);
    } catch (error) {
      console.error('Failed to join course:', error.message);
    }
  };

  const hasJoinedCourse = async (userId, courseId) => {
    if (!userId || !courseId) {
      throw new Error('Invalid userId or courseId provided');
    }
    try {
      const joinedCourses = await apiGetUserJoinedCourses(userId);
      return joinedCourses.some(course => course.courseId === courseId);
    } catch (error) {
      console.error('Failed to check joined courses:', error.message);
      return false; // Return false on error
    }
  };

  return (
    <ParticipantContext.Provider value={{ joinCourse, hasJoinedCourse }}>
      {children}
    </ParticipantContext.Provider>
  );
};

export const useParticipants = () => useContext(ParticipantContext);
