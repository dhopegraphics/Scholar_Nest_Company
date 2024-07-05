// TagContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Tag {
  title: string;
  // Add other tag details here
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
