/** @format */

import { AppContext } from '@/context/appContext';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useContext } from 'react';

export default function HomeBanner() {
  const { providers } = useContext(AppContext);

  return (
    <div className='flex flex-col text-center items-center justify-center text-2xl font-mono'>
      <p className='md:w-full w-3/5 text-gray-800 my-20'>
        <span
          className='underline cursor-pointer'
          onClick={() => signIn(providers.id)}>
          Sign in
        </span>{' '}
        to explore the best web3 AI Prompts
      </p>
      <Image
        src={'/assets/home.png'}
        width={'800'}
        height={'800'}
        title='Sign In to Continue'
      />
    </div>
  );
}
