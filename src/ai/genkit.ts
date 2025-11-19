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
  if (keys.length === 0 && process.env.GEMINI_API_KEY) {
    keys.push(process.env.GEMINI_API_KEY);
  }
  return keys;
}

const apiKeys = getApiKeys();

function getApiKey(): string {
  if (apiKeys.length === 0) {
    // Return a dummy key or throw an error if no keys are found
    // This prevents the app from crashing if .env is not set up
    console.warn("No GEMINI_API_KEY found in .env. Using a placeholder. AI calls will fail.");
    return "NO_API_KEY_FOUND";
  }
  // Select a random key from the pool
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: getApiKey(), // Execute the function to get the key string
    }),
  ],
});
