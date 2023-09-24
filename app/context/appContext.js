/** @format */

'use client';
import React, { useState, createContext } from 'react';

// Create a context for the app
export const AppContext = createContext();

// Create a provider component to wrap your app with
export const AppContextProvider = ({ children }) => {
  // Define the state variable and its setter
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};
