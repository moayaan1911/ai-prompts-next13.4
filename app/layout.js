/** @format */

import Navbar from '@/components/Navbar';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import { AppContextProvider } from '@/context/appContext';
import Provider from '@/session/Provider';
import { Toaster } from 'react-hot-toast';

const opensans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'defiPrompts-WEB3 AI Prompts',
  description:
    'AI Prompts encyclopedia for WEB3 and DeFi. This open source project provides a collection of AI-generated prompts to assist developers building decentralized applications and blockchain projects.',
  keywords: [
    'ai',
    'prompts',
    'web3',
    'defi',
    'blockchain',
    'dapps',
    'decentralized',
    'open source',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={opensans.className}>
        <Provider>
          <AppContextProvider>
            <Toaster />
            <Navbar />
            {children}
          </AppContextProvider>
        </Provider>
      </body>
    </html>
  );
}
