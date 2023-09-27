/** @format */
'use client';
import { MdDelete } from 'react-icons/md';
import { BiSolidUpvote } from 'react-icons/bi';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function AllPrompts({
  creator,
  tags,
  prompt,
  upvotes,
  id,
  fetchPrompts,
  search,
  setSearch,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  async function handleUpvotes() {
    event.preventDefault();
    if (!session) {
      toast.error('Sign in first');
      setTimeout(() => {
        toast.remove();
      }, 2000);
      return;
    }
    try {
      toast.loading('Upvoting  the prompt', { id: 1 });
      await fetch(`/api/prompt/${id}`, { method: 'PUT' })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          toast.success('Upvoted Succesfully', { id: 1 });
        });
    } catch (error) {
      toast.error('Error in Upvoting', { id: 1 });
      console.log(error);
    }

    setTimeout(() => {
      toast.remove();
    }, 1500);

    fetchPrompts();
  }

  return (
    <div className='bg-white border border-blue-800 rounded p-4 md:min-w-[70vw] w-[80vw] mx-auto mb-8'>
      <div className='flex'>
        <div className='md:w-full pr-2'>
          <p className='md:text-lg font-medium mb-2 text-blue-500 md:w-[64vw] md:max-w-full max-w-[18rem] text-sm'>
            {prompt}
          </p>

          <div className='flex space-x-2 mb-2 md:w-11/12 md:max-w-full max-w-[18rem] flex-wrap gap-2'>
            {tags.map((tag) => (
              <span
                className='bg-gray-200 cursor-pointer text-gray-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded'
                onClick={() => {
                  setSearch(tag);
                }}>
                {tag}
              </span>
            ))}
          </div>

          <p className='text-blue-700 font-light text-xs'>
            Created by: {creator}
          </p>
        </div>

        <div className='flex flex-col justify-around'>
          <div className='flex flex-col mb-2 items-center'>
            <BiSolidUpvote
              size={28}
              className='text-gray-500 hover:text-green-700 cursor-pointer'
              onClick={handleUpvotes}
            />
            <p>{upvotes}</p>
          </div>
          <MdDelete
            size={28}
            className='text-gray-500 hover:text-red-500 cursor-pointer'
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <DeleteModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        id={id}
        fetchPrompts={fetchPrompts}
      />
    </div>
  );
}
