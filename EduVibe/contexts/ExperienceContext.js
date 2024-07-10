// ExperienceContext.js

import React, { createContext, useContext, useState } from 'react';

// Initial items array
const initialItems = [
  {
    icon: 'figma',
    label: 'Senior UI/UX Designer',
    company: 'Figma',
    jobType: 'Full Time',
    years: '2019-2023',
  },
  {
    icon: 'github',
    label: 'Mid-level Designer',
    company: 'GitHub',
    jobType: 'Full Time',
    years: '2017-2019',
  },
  {
    icon: 'twitter',
    label: 'Junior Designer',
    company: 'Twitter',
    jobType: 'Full Time',
    years: '2015-2017',
  },
];

// Create context
const ExperienceContext = createContext();

// Provider component
export const ExperienceProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);

  // Function to update an experience item
  const updateExperienceItem = (updatedItem) => {
    const updatedItems = items.map(item => item.label === updatedItem.label ? updatedItem : item);
    setItems(updatedItems);
  };

  // Context value includes items and updateExperienceItem function
  const contextValue = {
    items,
    updateExperienceItem,
  };

  return (
    <ExperienceContext.Provider value={contextValue}>
      {children}
    </ExperienceContext.Provider>
  );
};

// Custom hook to use experience context
export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};
