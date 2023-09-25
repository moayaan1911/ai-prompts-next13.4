/** @format */

import React from 'react';

export default function Header() {
  return (
    <div className='flex flex-col gap-9'>
      <h1 className='md:text-4xl text-2xl font-bold text-center'>
        Find the most popular{' '}
        <span className='text-blue-500 font-extrabold underline'>
          WEB3 AI Prompts
        </span>
      </h1>
      <p className='text-center mx-auto font-sans font-normal md:w-3/5 w-11/12 text-lg'>
        AI Prompts encyclopedia for
        <span className='text-blue-500 font-semibold'> WEB3 and DeFi</span>.
        This open source project provides a collection of AI-generated prompts
        to assist developers building
        <span className='text-blue-500 font-semibold'>
          {' '}
          decentralized applications{' '}
        </span>
        and
        <span className='text-blue-500 font-semibold'>
          {' '}
          blockchain projects
        </span>
        .
      </p>
    </div>
  );
}
