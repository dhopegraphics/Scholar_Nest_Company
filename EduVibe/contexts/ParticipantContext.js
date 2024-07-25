import React, { createContext, useContext, useState, useEffect } from 'react';
import { joinCourse as apiJoinCourse, getUserJoinedCourses as apiGetUserJoinedCourses, unjoinCourse as apiUnjoinCourse } from '../lib/appwrite';

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
      return false;
    }
  };

  const unjoinCourse = async (userId, courseId) => {
    try {
      if (!userId || !courseId) {
        throw new Error('Invalid userId or courseId provided');
      }
      await apiUnjoinCourse(userId, courseId);
    } catch (error) {
      console.error('Failed to unjoin course:', error.message);
    }
  };

  return (
    <ParticipantContext.Provider value={{ joinCourse, hasJoinedCourse, unjoinCourse }}>
      {children}
    </ParticipantContext.Provider>
  );
};

export const useParticipants = () => useContext(ParticipantContext);
