/** @format */
'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillDownSquare } from 'react-icons/ai';
import { getProviders, useSession, signIn, signOut } from 'next-auth/react';
import { AppContext } from '@/context/appContext.js';
import { useRouter } from 'next/navigation';
export default function Navbar() {
  const { providers, setProviders, open, setOpen, setEmail } =
    useContext(AppContext);
  const { data: session } = useSession();
  const router = useRouter();
  const randomString = Math.random().toString(36).slice(2, 7);
  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProvider();
  }, []);
  setEmail(session?.user?.email);
  return (
    <div className='flex md:justify-between justify-center md:px-5 mx-auto py-2 border-b-4 border-blue-900 text-white items-center md:flex-row flex-col bg-blue-400'>
      <Link href={'/'}>
        <Image
          src={'/assets/defiprompts.png'}
          width={'300'}
          height={'200'}
          className='rounded'
        />
      </Link>
      {!session?.user ? (
        <>
          {providers && (
            <button
              className='hover:bg-white px-2 py-1 hover:rounded-lg hover:from-blue-500 hover:to-blue-900 hover:bg-gradient-to-r'
              onClick={() => {
                signIn(providers.id);
              }}>
              Login
            </button>
          )}
        </>
      ) : (
        <div className='relative'>
          <div className='flex flex-col md:flex-row'>
            <img
              src={session?.user.image}
              className='w-12 h-12 rounded-2xl border border-gray-200 mx-auto md:mx-2'
              title={`Logged in as ${session?.user.email}`}
            />
            <Link
              className='md:px-1 py-1 hover:text-black text-md flex items-center'
              href={'/create-prompt'}>
              Create Prompt
            </Link>
            <button
              className='md:px-1 py-1 mx-auto md:m-0 text-4xl'
              onClick={() => setOpen(!open)}>
              <AiFillDownSquare />
            </button>
          </div>
          {open && (
            <div className='absolute right-0 w-56 mt-2 py-2 bg-white border rounded shadow-xl md:text-left text-center'>
              <Link
                href={`/profile/${session.user.email}`}
                className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'>
                Profile
              </Link>

              <div
                className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
                onClick={() => {
                  setOpen(false);
                  signOut({ redirect: '/' });
                }}>
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
