/** @format */

import mongoose from 'mongoose';

let connected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);
  if (connected) {
    console.log('Connected to database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_CLIENT, {
      dbName: 'defiprompts',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
