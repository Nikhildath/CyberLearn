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

function getApiKey(): string | undefined {
  if (apiKeys.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: getApiKey,
    }),
  ],
});
