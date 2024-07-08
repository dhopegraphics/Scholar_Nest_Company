import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Tag {
  title: string;
  // Add other tag details here if needed
}

interface TagContextType {
  tag: Tag | null;
  setTag: (tag: Tag) => void;
}

export const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }: { children: ReactNode }) => {
  const [tag, setTag] = useState<Tag | null>(null);

  return (
    <TagContext.Provider value={{ tag, setTag }}>
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
 