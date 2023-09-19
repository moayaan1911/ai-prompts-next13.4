/** @format */

import Navbar from '@/components/Navbar';
import './globals.css';
import { Open_Sans } from 'next/font/google';

const opensans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  keywords: ['create-next-app'],
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={opensans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
