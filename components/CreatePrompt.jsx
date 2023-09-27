/** @format */
'use client';
import { AppContext } from '@/context/appContext';
import React, { useContext, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
export default function CreatePrompt() {
  const { prompt, setPrompt, tags, setTags } = useContext(AppContext);
  const [tagInput, setTagInput] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setTagInput(inputValue);

    // Split the input text by spaces and filter out any empty strings
    const inputTags = inputValue
      .split(' ')
      .filter((tag) => tag.trim() !== '')
      .map((tag) => {
        // If the tag doesn't start with '#', add '#' prefix
        if (!tag.startsWith('#')) {
          return `#${tag}`;
        }
        return tag;
      });

    // Update the tags state with the formatted tags
    setTags(inputTags);
  };

  async function handleSubmitPrompt() {
    event.preventDefault();
    if (!session) {
      toast.error('Sign in first');
      setTimeout(() => {
        toast.remove();
      }, 2000);
      return;
    }
    toast.loading('Creating Prompt..', { id: 1 });
    const response = await fetch('/api/prompt', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        tags: tags,
        creator: session.user.email,
      }),
    });

    if (response.ok) {
      toast.success('Prompt Created Succesfully', { id: 1 });
    } else {
      toast.error('Error creating Prompt', { id: 1 });
    }
    setTimeout(() => {
      toast.remove();
    }, 1500);
    setTagInput('');
    setTags([]);
    setPrompt('');
    setTimeout(() => {
      router.push('/');
    }, 6000);
  }
  return (
    <div className='flex flex-col mt-8 text-center mx-auto'>
      <h1 className='my-10 text-5xl font-bold'>
        Create <span className='text-blue-500 font-serif'>Prompt</span>
      </h1>

      <form
        className='flex flex-col items-center justify-center'
        onSubmit={handleSubmitPrompt}>
        <div className='md:w-3/5 w-4/5 my-12'>
          <label
            htmlFor='prompt'
            className='flex flex-col gap-4 items-start'>
            <span className='font-light mx-auto'>Enter Prompt</span>
            <textarea
              id='prompt'
              className='w-full p-2 pl-4 border rounded-xl text-blue-600 font-semibold border-blue-300'
              placeholder='How to create an ERC20 smart contract?'
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            />
          </label>
        </div>

        <div className='w-1/2 mt-4'>
          <label
            htmlFor='tags'
            className='flex flex-col gap-4 items-start'>
            <span className='font-light mx-auto'>Enter Tags</span>
            <textarea
              id='tags'
              className='w-full p-2 pl-4 border rounded-xl text-blue-600 font-semibold border-blue-300'
              placeholder='#smartcontract #solidity #ethereum #erc'
              value={tagInput}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <button
          type='submit'
          className='mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gradient-to-bl hover:from-green-400 hover:to-slate-700 duration-150 '>
          Submit
        </button>
      </form>
    </div>
  );
}
