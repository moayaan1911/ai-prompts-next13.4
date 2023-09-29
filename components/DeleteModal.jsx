/** @format */

import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function DeleteModal({ setIsOpen, isOpen, id, fetchPrompts }) {
  const { data: session } = useSession();
  if (!isOpen) return null;

  async function handleDelete() {
    event.preventDefault();
    if (!session) {
      toast.error('Sign in first');
      setTimeout(() => {
        toast.remove();
      }, 2000);
      return;
    }
    try {
      toast.loading('Deleting', { id: 1 });
      await fetch(`/api/prompt/${id}`, { method: 'DELETE' })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          toast.success('Deleted Succesfully', { id: 1 });
          fetchPrompts();
          setIsOpen(false);
        });
    } catch (error) {
      toast.error('Error in Upvoting', { id: 1 });
      console.log(error);
    }

    setTimeout(() => {
      toast.remove();
    }, 1200);
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg border-2 border-blue-600 p-8 opacity-95'>
        <p className='text-lg font-medium mb-4'>
          Do you want to delete this Prompt ?
        </p>

        <div className='flex justify-around space-x-4'>
          <button
            className='bg-red-400 text-white px-4 py-2 rounded hover:bg-red-700'
            onClick={handleDelete}>
            Yes
          </button>

          <button
            className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-500'
            onClick={() => setIsOpen(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
