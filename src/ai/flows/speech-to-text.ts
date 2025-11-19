
'use server';
/**
 * @fileOverview A flow for transcribing audio to text.
 *
 * - speechToText - A function that handles the audio transcription.
 * - SpeechToTextInput - The input type for the speechToText function.
 * - SpeechToTextOutput - The return type for the speechToText function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SpeechToTextInputSchema = z.object({
  audioDataUri: z.string().describe("The audio to transcribe, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  apiKey: z.string().optional().describe("The user's Gemini API Key."),
});
export type SpeechToTextInput = z.infer<typeof SpeechToTextInputSchema>;

const SpeechToTextOutputSchema = z.object({
  transcript: z.string().describe('The transcribed text.'),
});
export type SpeechToTextOutput = z.infer<typeof SpeechToTextOutputSchema>;

export async function speechToText(input: SpeechToTextInput): Promise<SpeechToTextOutput> {
  return speechToTextFlow(input);
}

const speechToTextFlow = ai.defineFlow(
  {
    name: 'speechToTextFlow',
    inputSchema: SpeechToTextInputSchema,
    outputSchema: SpeechToTextOutputSchema,
  },
  async ({ audioDataUri, apiKey }) => {
    if (!apiKey) {
      throw new Error("Gemini API key is not configured.");
    }
    
    const { text } = await ai.generate({
      model: 'googleai/gemini-1.5-flash', // Using a powerful model that can handle audio
      prompt: [
        { text: 'Transcribe the following audio recording:' },
        { media: { url: audioDataUri } },
      ],
      config: {
          apiKey: apiKey
      }
    });

    if (text) {
      return { transcript: text };
    }

    throw new Error('AI failed to transcribe the audio.');
  }
);
