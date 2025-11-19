import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Note: The key rotation logic was causing a persistent bug.
// This has been simplified to use a single, reliable API key from .env.
// Ensure GEMINI_API_KEY is set in your .env file.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || "NO_API_KEY_FOUND",
    }),
  ],
});
