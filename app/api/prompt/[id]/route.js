/** @format */

import { connectToDatabase } from '@/database/mongo.setup';
import Prompt from '@/models/prompt.model';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const id = params;
    console.log(id);
    return NextResponse.json({ message: 'prompt' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'INTERNAL ERROR 500' });
  }
}

// PUT to update upvotes
export async function PUT(request, { params }) {
  try {
    const id = params;
    const _id = id.id;

    await connectToDatabase();
    const prompt = await Prompt.findById(_id);

    prompt.upvotes += 1;

    await prompt.save();

    return NextResponse.json({
      message: 'Upvoted!',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'INTERNAL ERROR 500' });
  }
}

// DELETE to delete a prompt
export async function DELETE(request, { params }) {
  try {
    const id = params;
    const _id = id.id;

    await connectToDatabase();

    await Prompt.findByIdAndDelete(_id);

    return NextResponse.json({
      message: 'Prompt deleted',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'INTERNAL ERROR 500' });
  }
}
