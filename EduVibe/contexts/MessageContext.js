import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessageContext = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const getMessages = (contactId) => {
    // Example implementation: Replace with your actual fetch logic
    return new Promise((resolve, reject) => {
      // Simulating async fetch
      setTimeout(() => {
        const filteredMessages = messages.filter(msg => msg.contactId === contactId);
        resolve(filteredMessages);
      }, 1000);
    });
  };

  const addMessage = (contactId, newMessage) => {
    // Example implementation: Replace with your actual add message logic
    return new Promise((resolve, reject) => {
      // Simulating async add
      setTimeout(() => {
        const updatedMessages = [...messages, { ...newMessage, contactId }];
        setMessages(updatedMessages);
        resolve();
      }, 500);
    });
  };

  return (
    <MessageContext.Provider value={{ messages, getMessages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
