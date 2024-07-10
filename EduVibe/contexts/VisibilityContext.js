import React, { createContext, useState, useContext } from 'react';

const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isCourseButtonVisible , setCourseButtonVisible] = useState(false);
  const [isAppSettingsVisible, setAppSettingsVisible] = useState(false);


  return (
    <VisibilityContext.Provider value={{ isButtonVisible, setButtonVisible , isCourseButtonVisible , setCourseButtonVisible ,isAppSettingsVisible, setAppSettingsVisible  }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => useContext(VisibilityContext);
