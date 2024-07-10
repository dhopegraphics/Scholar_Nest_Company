// CourseContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Participant {
  username: string;
  lastAccessed: string;
  avatar: string;
}

interface Course {
  title: string;
  creator: string;
  participants: Participant[];
}

interface CourseContextType {
  course: Course | null;
  setCourse: (course: Course) => void;
}

export const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [course, setCourse] = useState<Course | null>(null);

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
