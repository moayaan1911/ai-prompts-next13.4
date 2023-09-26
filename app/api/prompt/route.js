/** @format */

import { connectToDatabase } from '@/database/mongo.setup';
import Prompt from '@/models/prompt.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const prompts = await Prompt.findOne({});
    return NextResponse.json({ prompts });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'INTERNAL ERROR 500' });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    await connectToDatabase();

    const newPrompt = new Prompt(data);
    await newPrompt.save();

    return NextResponse.json({
      message: 'Prompt successfully added!',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'INTERNAL ERROR 500' });
  }
}
