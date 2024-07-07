import React, { createContext, useContext } from 'react';

// Define the items array
const items = [
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

// Create the context
const ExperienceContext = createContext();

// Create the provider component
const ExperienceProvider = ({ children }) => {
  return (
    <ExperienceContext.Provider value={items}>
      {children}
    </ExperienceContext.Provider>
  );
};

// Custom hook to use the ExperienceContext
const useExperience = () => {
  return useContext(ExperienceContext);
};

export { ExperienceProvider, useExperience };
