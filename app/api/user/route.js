/** @format */

// user/index.js

import { connectToDatabase } from '@/database/mongo.setup';
import User from '@/models/user.models';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();

    const users = await User.find();

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error fetching users' });
  }
}
