'use server';
/**
 * @fileOverview An interactive cybersecurity assistant that uses TTS and SST to answer questions.
 *
 * - interactiveCybersecurityAssistant - A function that handles the interaction with the AI assistant.
 * - InteractiveCybersecurityAssistantInput - The input type for the interactiveCybersecurityAssistant function.
 * - InteractiveCybersecurityAssistantOutput - The return type for the interactiveCybersecurityAssistant function.
 */

import {ai} from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import {z} from 'genkit';
import wav from 'wav';

const InteractiveCybersecurityAssistantInputSchema = z.object({
  query: z.string().describe('The cybersecurity-related question from the user.'),
});
export type InteractiveCybersecurityAssistantInput = z.infer<typeof InteractiveCybersecurityAssistantInputSchema>;

const InteractiveCybersecurityAssistantOutputSchema = z.object({
  media: z.string().describe('The audio data of the AI assistant response in WAV format.'),
});
export type InteractiveCybersecurityAssistantOutput = z.infer<typeof InteractiveCybersecurityAssistantOutputSchema>;

export async function interactiveCybersecurityAssistant(input: InteractiveCybersecurityAssistantInput): Promise<InteractiveCybersecurityAssistantOutput> {
  return interactiveCybersecurityAssistantFlow(input);
}

const interactiveCybersecurityAssistantFlow = ai.defineFlow(
  {
    name: 'interactiveCybersecurityAssistantFlow',
    inputSchema: InteractiveCybersecurityAssistantInputSchema,
    outputSchema: InteractiveCybersecurityAssistantOutputSchema,
  },
  async ({ query }) => {
    // 1. Generate a text answer to the user's query.
    const answerResponse = await ai.generate({
      prompt: `You are a cybersecurity expert. Answer the following question: ${query}`,
    });
    const answer = answerResponse.text;

    // 2. Convert the text answer to speech.
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: answer,
    });
    
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
