'use server';
/**
 * @fileOverview An interactive cybersecurity assistant that uses TTS and SST to answer questions.
 *
 * - interactiveCybersecurityAssistant - A function that handles the interaction with the AI assistant.
 * - InteractiveCybersecurityAssistantInput - The input type for the interactiveCybersecurityAssistant function.
 * - InteractiveCybersecurityAssistantOutput - The return type for the interactiveCybersecurityAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';


const InteractiveCybersecurityAssistantInputSchema = z.object({
  query: z.string().describe('The cybersecurity-related question from the user.'),
  outputFormat: z.enum(['audio', 'text']).default('text').describe('The desired output format.'),
  apiKey: z.string().optional().describe("The user's Gemini API Key."),
});
export type InteractiveCybersecurityAssistantInput = z.infer<typeof InteractiveCybersecurityAssistantInputSchema>;

const InteractiveCybersecurityAssistantOutputSchema = z.object({
  media: z.string().optional().describe('The audio data of the AI assistant response in WAV format.'),
  text: z.string().optional().describe('The text response from the assistant.'),
});
export type InteractiveCybersecurityAssistantOutput = z.infer<typeof InteractiveCybersecurityAssistantOutputSchema>;

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

export async function interactiveCybersecurityAssistant(input: InteractiveCybersecurityAssistantInput): Promise<InteractiveCybersecurityAssistantOutput> {
  return interactiveCybersecurityAssistantFlow(input);
}

const interactiveCybersecurityAssistantFlow = ai.defineFlow(
  {
    name: 'interactiveCybersecurityAssistantFlow',
    inputSchema: InteractiveCybersecurityAssistantInputSchema,
    outputSchema: InteractiveCybersecurityAssistantOutputSchema,
  },
  async ({ query, outputFormat, apiKey }) => {
    if (!apiKey) {
        const message = "Gemini API key is not configured. Please add it in the Account Settings.";
        console.error(message);
        return { text: message };
    }

    // 1. Generate a text answer to the user's query.
    const answerResponse = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: `You are a helpful and friendly cybersecurity expert. Answer the following question clearly and concisely. Use markdown for formatting, such as headings, bullet points, and bold text to make the information easy to digest.

Question: "${query}"`,
      config: {
          apiKey: apiKey
      }
    });
    
    const answer = answerResponse.text;

    if (!answer) {
      console.error('AI failed to generate a text response.');
      return { text: 'Sorry, I was unable to generate a response. Please try again.' };
    }

    if (outputFormat === 'text') {
      return { text: answer };
    }

    // 2. Convert the text answer to speech.
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
            apiKey: apiKey,
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
      console.error('AI failed to generate audio.');
      return { text: answer }; // Fallback to text if audio fails
    }
    
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    return {
        text: answer,
        media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
