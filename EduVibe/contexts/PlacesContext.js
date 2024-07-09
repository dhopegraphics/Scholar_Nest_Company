// PlacesContext.js

import React, { createContext, useState } from 'react';

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      name: 'Kwame Nkrumah University Of Science & Technology',
      description: 'Main Campus - Kumasi',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      name: 'Kwame Nkrumah University Of Science & Technology',
      description: 'Obuasi Campus - Obuasi',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      name: 'Tucson, Arizona',
      description: 'A city in Arizona known for its desert landscapes and rich history.',
    },
  ]);

  return (
    <PlacesContext.Provider value={{ places }}>
      {children}
    </PlacesContext.Provider>
  );
};
