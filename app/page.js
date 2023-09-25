/** @format */
'use client';
import Header from '@/components/Header';
import HomeBanner from '@/components/HomeBanner';
import HomePrompts from '@/components/HomePrompts';
import { useSession } from 'next-auth/react';
export default function page() {
  const { data: session } = useSession();
  return (
    <main className='flex flex-col items-center justify-center p-20'>
      {/* Header */}
      <Header />
      {/* Main div */}
      {session?.user?.id ? <HomePrompts /> : <HomeBanner />}
    </main>
  );
}
