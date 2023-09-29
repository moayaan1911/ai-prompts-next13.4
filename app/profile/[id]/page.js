/** @format */
'use client';
import AllPrompts from '@/components/AllPrompts';
import Loading from '@/components/Loading';
import { AppContext } from '@/context/appContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  const { setOpen } = useContext(AppContext);
  const [userData, setUserData] = useState('');
  const [promptsData, setPromptsData] = useState([]);
  const params = useParams();
  const email = params.id.toString().replace(/%40/g, '@');
  const [fetched, setFetched] = useState(false);
  async function fetchProfile() {
    await fetch(`/api/user/${email}`, {
      method: 'GET',
      cache: 'force-cache',
    })
      .then((response) => response.json())
      .then((data) => {
        setPromptsData(data.prompts);
        setUserData(data.user);
        setFetched(true);
      });
  }

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchProfile();
    }, 1000);
  }, [email]);
  return (
    <>
      {fetched && (
        <div>
          <div className='flex justify-center my-10 flex-col items-center gap-2'>
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                width={200}
                height={400}
                className='rounded-full border-8 border-blue-500 mb-2'
              />
            )}
            <div className='text-2xl font-semibold text-blue-600 font-sans'>
              {userData?.username}
            </div>
            <div className='text-lg font-thin italic '>
              Created With - {userData?.email}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-2xl font-semibold mb-6'>
              Prompts created by this user
            </p>
            {promptsData.map((prompt) => (
              <AllPrompts
                key={prompt._id}
                creator={prompt.creator}
                prompt={prompt.prompt}
                tags={prompt.tags}
                upvotes={prompt.upvotes}
                id={prompt._id}
              />
            ))}
          </div>
        </div>
      )}
      {!fetched && (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
}
