/** @format */

import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, 'Please Enter the prompt'],
  },
  tags: {
    type: String,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  creator: {
    type: String,
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
