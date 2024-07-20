import React, { createContext, useState, useContext } from 'react';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [answer, setAnswer] = useState(null);
  const [educator , setEducator] = useState(null);

  return (
    <QuestionContext.Provider value={{ answer, setAnswer  , educator , setEducator }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => useContext(QuestionContext);