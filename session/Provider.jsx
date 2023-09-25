/** @format */
'use client';
import { SessionProvider } from 'next-auth/react';

const Provider = async ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
