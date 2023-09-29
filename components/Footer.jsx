/** @format */
'use client';
import { useState } from 'react';
import { SiEthereum } from 'react-icons/si';
import VideoModal from './VideoModal';
export default function Footer() {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <footer className='bg-blue-400 text-white mt-auto sticky bottom-0'>
      <div className='container max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center'>
        <div className='text-lg text-center md:text-left flex'>
          Created by
          <a
            className='flex items-center cursor-pointer underline'
            href='https://linktr.ee/ayaaneth'
            target='_blank'>
            <SiEthereum />
            moayaan.eth
            <SiEthereum />
          </a>
        </div>

        <div className='mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-md'>
          <button
            className='cursor-pointer hover:text-black '
            onClick={() => setShowVideo(true)}>
            Video Demo
          </button>
          <a
            href='/zip/project.zip'
            download={'defiprompts.zip'}
            className='cursor-pointer hover:text-black '>
            Source Code
          </a>
        </div>
        <VideoModal
          show={showVideo}
          onClose={() => setShowVideo(false)}
        />
      </div>
    </footer>
  );
}
