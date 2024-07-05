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

interface ParticipantContextType {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  courses: Course[];
}

export const ParticipantContext = createContext<ParticipantContextType | undefined>(undefined);

export const ParticipantProvider = ({ children }: { children: ReactNode }) => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      username: 'mensah',
      lastAccessed: '2 days ago',
      avatar: "https://fileinfo.com/img/ss/xl/jpg_44-2.jpg",
    },
    {
      username: 'john',
      lastAccessed: '5 days ago',
      avatar: 'https://c4.wallpaperflare.com/wallpaper/848/223/819/nature-jpg-format-download-1920x1200-wallpaper-preview.jpg',
    },
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      title: 'Course Title 1',
      creator: 'Creator 1',
      participants: participants.slice(0, 2), // Example using participants state
    },
    {
      title: 'Course Title 2',
      creator: 'Creator 2',
      participants: participants.slice(0, 1), // Example using participants state
    },
    // Add more courses as needed
  ]);

  return (
    <ParticipantContext.Provider value={{ participants, setParticipants, courses }}>
      {children}
    </ParticipantContext.Provider>
  );
};
