/** @format */

import React from 'react';
import defiPrompts from '../assets/defiprompts.png';
import Image from 'next/image';
export default function Navbar() {
  return (
    <div className='flex md:justify-between justify-center md:px-5 mx-auto py-2 border-b-4 border-blue-300 text-white items-center md:flex-row flex-col bg-[#4e4e4f]'>
      <Image
        src={defiPrompts}
        width={'300'}
        className='rounded'
      />
      <button className='hover:bg-black px-2 py-1 rounded-lg text-xl '>
        Login
      </button>
    </div>
  );
}
