// EducationPlaceContext.js

import React, { createContext, useState } from 'react';

export const EducationPlaceContext = createContext();

export const EducationPlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([
    {
      id: 1,
      img: 'https://blog.getrooms.co/wp-content/uploads/2020/12/knust-entrance.jpg',
      name: 'Kwame Nkrumah University Of Science & Technology',
      description: 'Computer Science Student',
    },
    {
      id: 2,
      img: 'https://www.sophiaapenkro.com/wp-content/uploads/2023/04/st-augustines-college-cape-coast-entrance-1024x768.jpg',
      name: 'St Augustine College',
      description: 'General Science',
    },
    {
      id: 3,
      img: 'https://ghanahighschools.com/wp-content/uploads/2022/06/0010224-1-1024x768.jpg',
      name: 'Ideal College - Jhs',
      description: ' ',
    },
  ]);

  return (
    <EducationPlaceContext.Provider value={{ places }}>
      {children}
    </EducationPlaceContext.Provider>
  );
};
