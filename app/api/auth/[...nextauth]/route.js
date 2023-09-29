/** @format */

import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { connectToDatabase } from '@/database/mongo.setup';
import User from '@/models/user.models';

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
  callbacks: {
    async signIn({ error, profile }) {
      if (error) {
        // Log and monitor error
        console.error('OAuth Error', {
          errorCode: error.code,
          errorMessage: error.message,
          provider: account.provider,
        });

        // Gracefully return
        return false;
      }
      try {
        await connectToDatabase();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          const user = await User.create({
            email: profile.email,
            username: profile.name.toLowerCase(),
            image: profile.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { authHandler as GET, authHandler as POST };
