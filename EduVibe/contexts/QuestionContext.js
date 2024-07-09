import React, { createContext, useState, useContext } from 'react';

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [answer, setAnswer] = useState(null);

  return (
    <QuestionContext.Provider value={{ answer, setAnswer }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => useContext(QuestionContext);