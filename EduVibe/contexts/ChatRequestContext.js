import React, { createContext, useReducer, useContext } from 'react';

// Create context
const ChatRequestContext = createContext();

// Define actions
const ACTIONS = {
  SET_CHAT_REQUEST: 'set_chat_request',
  REMOVE_CHAT_REQUEST: 'remove_chat_request',
};

// Create reducer
const chatRequestReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CHAT_REQUEST:
      return { ...state, [action.payload.userId]: true };
    case ACTIONS.REMOVE_CHAT_REQUEST:
      const newState = { ...state };
      delete newState[action.payload.userId];
      return newState;
    default:
      return state;
  }
};

// Create provider component
export const ChatRequestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatRequestReducer, {});

  return (
    <ChatRequestContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatRequestContext.Provider>
  );
};

// Custom hook to use the context
export const useChatRequest = () => {
  return useContext(ChatRequestContext);
};
