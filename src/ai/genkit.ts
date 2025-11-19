'use server';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

function getApiKeys(): string[] {
  const keys: string[] = [];
  for (const key in process.env) {
    if (key.startsWith('GEMINI_API_KEY_')) {
      const apiKey = process.env[key];
      if (apiKey) {
        keys.push(apiKey);
      }
    }
  }
  // Fallback to the single key if no patterned keys are found
  if (keys.length === 0 && process.env.GEMINI_API_KEY) {
    keys.push(process.env.GEMINI_API_KEY);
  }
  return keys;
}

const apiKeys = getApiKeys();

function getApiKey(): string | undefined {
  if (apiKeys.length === 0) {
    return undefined; // Or throw an error if you want to enforce key presence
  }
  // Select a random key from the pool
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}


export const ai = genkit({
  plugins: [
    googleAI({
      // Use a function to provide a key on-demand for each request
      apiKey: getApiKey,
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
