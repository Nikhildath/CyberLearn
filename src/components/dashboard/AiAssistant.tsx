'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Mic, MicOff, Play } from 'lucide-react';
import { interactiveCybersecurityAssistant } from '@/ai/flows/interactive-cybersecurity-assistant';
import { useToast } from '@/hooks/use-toast';

export function AiAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseAudio, setResponseAudio] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Component Did Mount: Check for SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Browser Not Supported',
        description: 'Speech recognition is not supported in this browser. Please use Chrome or Safari.',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        } else {
          interimTranscript += transcriptPart;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      toast({
        variant: 'destructive',
        title: 'Speech Recognition Error',
        description: `Error occurred: ${event.error}`,
      });
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      // Component Will Unmount: Stop recognition
      recognition.stop();
    };
  }, [toast]);

  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      if (transcript.trim()) {
        processRequest(transcript);
      }
    } else {
      setTranscript('');
      setResponseAudio(null);
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const processRequest = async (query: string) => {
    setIsThinking(true);
    try {
      const result = await interactiveCybersecurityAssistant({ query });
      setResponseAudio(result.media);
    } catch (error) {
      console.error('AI assistant error:', error);
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: 'Could not get a response from the assistant.',
      });
    } finally {
      setIsThinking(false);
    }
  };

  const playAudio = () => {
    if (responseAudio && audioRef.current) {
        audioRef.current.play();
    }
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Interactive AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground">
          Ask a cybersecurity question. Click the microphone to start and stop recording.
        </p>
        <div className="min-h-[60px] rounded-md border bg-muted p-3 text-sm">
          <p className="font-medium text-foreground">Your query:</p>
          <p className="text-muted-foreground">{transcript || '...'}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={handleToggleRecording}
            size="icon"
            className={`h-16 w-16 rounded-full transition-all duration-300 ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'
            }`}
            disabled={isThinking}
          >
            {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
          </Button>
          {isThinking && <Loader2 className="h-8 w-8 animate-spin" />}
        </div>
      </CardContent>
      <CardFooter>
        {responseAudio && (
          <div className="w-full">
            <p className="mb-2 text-sm font-medium">AI Response:</p>
            <audio ref={audioRef} src={responseAudio} controls className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
