/** @format */

'use client';
import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};
