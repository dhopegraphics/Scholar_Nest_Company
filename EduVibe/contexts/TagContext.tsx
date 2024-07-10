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
}

export const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }: { children: ReactNode }) => {
  const { users, tagData: usersTagData } = useUsers();
  const [tag, setTag] = useState<Tag | null>(null);
  const [TagData, setTagData] = useState<{ id: string; title: string; categories: string[] }[]>([]);

  useEffect(() => {
    if (users && users.length > 0) {
      // Assuming we want to set tagData for user with id '1' for this example
      const userId = '1'; // Change this to dynamic user id as needed
      setTagData(usersTagData[userId] || []);
    }
  }, [users, usersTagData]);

  return (
    <TagContext.Provider value={{ tag, setTag, TagData }}>
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
