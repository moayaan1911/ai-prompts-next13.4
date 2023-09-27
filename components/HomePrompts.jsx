/** @format */
'use client';
import { AppContext } from '@/context/appContext';
import React, { useContext, useEffect, useState } from 'react';
import AllPrompts from '@/components/AllPrompts';
import { AiOutlineSearch } from 'react-icons/ai';

export default function HomePrompts() {
  const { allPrompts, setAllPrompts } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const fetchPrompts = async () => {
    await fetch('/api/prompt', {
      method: 'GET',
      cache: 'no-cache',
      next: { revalidate: 20 },
    })
      .then((response) => response.json())
      .then((data) => setAllPrompts(data.prompts));
  };

  console.log(allPrompts);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const filteredPrompts = allPrompts.filter((prompt) => {
    const tagsMatch = prompt.tags.some((tag) =>
      tag.toLowerCase().includes(search.toLowerCase())
    );
    return (
      prompt.prompt.toLowerCase().includes(search.toLowerCase()) || tagsMatch
    );
  });
  return (
    <div>
      <p className='flex justify-center mt-10 text-3xl font-bold'>
        All prompts on our platform
      </p>
      <div className='flex mx-auto md:min-w-[65vw] md:max-w-[65vw] border border-gray-400 rounded-lg px-5 py-2 my-12'>
        <input
          type='text'
          placeholder='Search prompts or tags'
          value={search}
          className='w-full outline-none'
          onChange={(e) => setSearch(e.target.value)}
        />
        <AiOutlineSearch size={28} />
      </div>
      {filteredPrompts.map((prompt) => (
        <AllPrompts
          key={prompt._id}
          creator={prompt.creator}
          prompt={prompt.prompt}
          tags={prompt.tags}
          upvotes={prompt.upvotes}
          id={prompt._id}
          fetchPrompts={fetchPrompts}
          search={search}
          setSearch={setSearch}
        />
      ))}
    </div>
  );
}
