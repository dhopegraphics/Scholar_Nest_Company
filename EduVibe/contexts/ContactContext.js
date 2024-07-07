import React, { createContext, useState } from 'react';

// Create a context
export const ContactContext = createContext();

// Create a provider component
export const ContactProvider = ({ children }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <ContactContext.Provider value={{ selectedContact, setSelectedContact }}>
      {children}
    </ContactContext.Provider>
  );
};
