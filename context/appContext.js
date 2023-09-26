/** @format */

'use client';
import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [providers, setProviders] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState([]);

  return (
    <AppContext.Provider
      value={{ providers, setProviders, prompt, setPrompt, tags, setTags }}>
      {children}
    </AppContext.Provider>
  );
};
