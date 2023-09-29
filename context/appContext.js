/** @format */

'use client';
import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [providers, setProviders] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState([]);
  const [allPrompts, setAllPrompts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <AppContext.Provider
      value={{
        providers,
        setProviders,
        prompt,
        setPrompt,
        tags,
        setTags,
        allPrompts,
        setAllPrompts,
        open,
        setOpen,
        email,
        setEmail,
      }}>
      {children}
    </AppContext.Provider>
  );
};
