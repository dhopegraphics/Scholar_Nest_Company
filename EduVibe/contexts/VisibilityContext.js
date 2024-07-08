import React, { createContext, useState, useContext } from 'react';

const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [isButtonVisible, setButtonVisible] = useState(false);

  return (
    <VisibilityContext.Provider value={{ isButtonVisible, setButtonVisible }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => useContext(VisibilityContext);
