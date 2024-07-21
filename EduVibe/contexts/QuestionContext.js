import React, { createContext, useState, useContext } from 'react';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [answer, setAnswer] = useState(null);
  const [educator , setEducator] = useState(null);
  const [showDrawerItems , setShowDrawerItems] = useState(null);

  return (
    <QuestionContext.Provider value={{ answer, setAnswer  , educator , setEducator ,  showDrawerItems , setShowDrawerItems }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => useContext(QuestionContext);