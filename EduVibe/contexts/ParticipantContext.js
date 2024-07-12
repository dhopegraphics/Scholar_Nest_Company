import React, { createContext, useState, useEffect } from 'react';
import { getUser } from '../lib/appwrite';

const ParticipantContext = createContext(undefined);

const ParticipantProvider = ({ children }) => {
  const [participants, setParticipants] = useState([ 
    {
      username: ' ',
      lastAccessed: ' ',
      avatar: ' ',
    }
  ]);

  const [courses, setCourses] = useState([
    {
      title: ' ',
      creator: ' ',
      participants: '',
      image: ' ',
    },
    // Add more courses as needed
  ]);

  const addCourse = async (course) => {
    try {
      const user = await getUser(course.userId);
      const username = user.username;

      setCourses((prevCourses) => [
        ...prevCourses,
        {
          title: course.title,
          creator: username,
          participants: participants.slice(0, 1),
          image: course.courseAvatar,
        }
      ]);
    } catch (error) {
      console.error('Failed to fetch user details:', error.message);
    }
  };

  return (
    <ParticipantContext.Provider value={{ participants, setParticipants, courses, addCourse }}>
      {children}
    </ParticipantContext.Provider>
  );
};

export { ParticipantContext, ParticipantProvider };
