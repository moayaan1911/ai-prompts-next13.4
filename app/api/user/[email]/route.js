/** @format */

import { connectToDatabase } from '@/database/mongo.setup';
import User from '@/models/user.models';
import Prompt from '@/models/prompt.model';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const email = params.email;
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email: String(email) });

    // Find prompts for this user
    const prompts = await Prompt.find({ creator: user.email });

    return NextResponse.json({
      user,
      prompts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error fetching user' });
  }
}
