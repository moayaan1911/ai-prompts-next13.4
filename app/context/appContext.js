/** @format */

'use client';
import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [providers, setProviders] = useState(null);

  return (
    <AppContext.Provider value={{ providers, setProviders }}>
      {children}
    </AppContext.Provider>
  );
};
