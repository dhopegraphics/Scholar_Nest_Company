import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useUsers } from './UsersContext';

interface Tag {
  title: string;
  // Add other tag details here if needed
}

interface TagContextType {
  tag: Tag | null;
  setTag: (tag: Tag) => void;
  TagData: { id: string; title: string; categories: string[] }[];
  allTagData: { [userId: string]: { id: string; title: string; categories: string[] }[] };
}

export const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }: { children: ReactNode }) => {
  const { tagData: usersTagData } = useUsers();
  const [tag, setTag] = useState<Tag | null>(null);
  const [TagData, setTagData] = useState<{ id: string; title: string; categories: string[] }[]>([]);
  const [allTagData, setAllTagData] = useState<{ [userId: string]: { id: string; title: string; categories: string[] }[] }>({});

  useEffect(() => {
    setAllTagData(usersTagData);
  }, [usersTagData]);

  useEffect(() => {
    if (Object.keys(usersTagData).length > 0) {
      // Assuming you want to set tagData for the first user in the list for this example
      const firstUserId = Object.keys(usersTagData)[0];
      setTagData(usersTagData[firstUserId] || []);
    }
  }, [usersTagData]);

  return (
    <TagContext.Provider value={{ tag, setTag, TagData, allTagData }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error('useTagContext must be used within a TagProvider');
  }
  return context;
};
