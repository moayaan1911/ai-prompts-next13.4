/** @format */
'use client';
import React, { useContext, useState } from 'react';
import defiPrompts from '../assets/defiprompts.png';
import Image from 'next/image';
import { AppContext } from '@/app/context/appContext';
import Link from 'next/link';
import { AiFillDownSquare } from 'react-icons/ai';
export default function Navbar() {
  const { isLoggedIn, setLoggedIn } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  return (
    <div className='flex md:justify-between justify-center md:px-5 mx-auto py-2 border-b-4 border-blue-900 text-white items-center md:flex-row flex-col bg-blue-400'>
      <Image
        src={defiPrompts}
        width={'300'}
        className='rounded'
      />
      {!isLoggedIn && (
        <button
          className='hover:bg-white px-2 py-1 hover:rounded-lg hover:from-blue-500 hover:to-blue-900 hover:bg-gradient-to-r'
          onClick={() => setLoggedIn(true)}>
          Login
        </button>
      )}
      {isLoggedIn && (
        <div className='relative'>
          <div className='flex flex-col md:flex-row'>
            <button className='md:px-1 py-1 hover:text-black text-md '>
              Create Prompt
            </button>
            <button
              className='md:px-1 py-1 mx-auto md:m-0 text-4xl'
              onClick={() => setOpen(!open)}>
              <AiFillDownSquare />
            </button>
          </div>
          {open && (
            <div className='absolute right-0 w-56 mt-2 py-2 bg-white border rounded shadow-xl md:text-left text-center'>
              <Link
                href='/profile'
                className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'>
                Profile
              </Link>

              <div
                className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
                onClick={() => setLoggedIn(false)}>
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
