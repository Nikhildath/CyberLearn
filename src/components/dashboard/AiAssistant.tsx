'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Mic, MicOff } from 'lucide-react';
import { interactiveCybersecurityAssistant } from '@/ai/flows/interactive-cybersecurity-assistant';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ParticleCanvas } from './ParticleCanvas';

export function AiAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseAudio, setResponseAudio] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
  const { toast } = useToast();

  const setupAudioAnalysis = useCallback(() => {
    if (!audioRef.current) return;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const audioContext = audioContextRef.current;
    if (!analyserRef.current) {
      analyserRef.current = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContext.destination);
    }
    analyserRef.current.fftSize = 64;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    setAudioData(dataArray);

    const animate = () => {
      analyserRef.current?.getByteFrequencyData(dataArray);
      setAudioData(new Uint8Array(dataArray));
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Browser Not Supported',
        description: 'Speech recognition is not supported here. Please use a modern browser like Chrome.',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(final + interim);
    };

    recognition.onend = () => {
        setIsRecording(false);
    }

    recognition.onerror = (event) => {
      toast({
        variant: 'destructive',
        title: 'Speech Recognition Error',
        description: `Error: ${event.error}`,
      });
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      audioContextRef.current?.close();
    };
  }, [toast]);

  useEffect(() => {
      if (!isRecording && transcript.trim()) {
          processRequest(transcript);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setResponseAudio(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const processRequest = async (query: string) => {
    if(!query) return;
    setIsThinking(true);
    try {
      const result = await interactiveCybersecurityAssistant({ query });
      setResponseAudio(result.media);
      // The audio element will auto-play
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

  const handleAudioPlay = () => {
    setupAudioAnalysis();
    setIsPlaying(true);
    audioContextRef.current?.resume();
  };
  
  const handleAudioPause = () => {
    setIsPlaying(false);
    if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  }

  const state = isRecording ? 'recording' : isThinking ? 'thinking' : (responseAudio && isPlaying) ? 'speaking' : 'idle';
  const averageAmplitude = audioData.length > 0 ? audioData.reduce((a, b) => a + b) / audioData.length : 0;

  return (
    <Card className="flex h-full flex-col bg-card/50 border-border/50 shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Interactive AI Assistant</CardTitle>
        <CardDescription>
          Ask a cybersecurity question. Click the orb to talk.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center space-y-4 text-center">
        
        <div className="relative w-48 h-48 flex items-center justify-center">
            <ParticleCanvas state={state} amplitude={averageAmplitude} />
            <Button
                onClick={handleToggleRecording}
                size="icon"
                className={cn('h-24 w-24 rounded-full transition-all duration-300 z-10 text-white',
                    state === 'recording' && 'bg-red-500/80 hover:bg-red-600/80',
                    state === 'thinking' && 'bg-primary/50 cursor-not-allowed',
                    state === 'speaking' && 'bg-accent/80',
                    state === 'idle' && 'bg-primary/80 hover:bg-primary/90'
                )}
                disabled={isThinking}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
                {isThinking ? (
                    <Loader2 size={36} className="animate-spin" />
                ) : isRecording ? (
                    <MicOff size={36} />
                ) : (
                    <Mic size={36} />
                )}
            </Button>
        </div>

        <div className="min-h-[40px] w-full text-center">
          <p className="text-lg font-medium text-foreground transition-opacity duration-300">
            {transcript || <span className="text-muted-foreground">
                {
                    {
                        'recording': 'Listening...',
                        'thinking': 'Thinking...',
                        'speaking': 'Here is my response...',
                        'idle': 'Ask me anything...'
                    }[state]
                }
            </span>}
            </p>
        </div>

      </CardContent>
       <CardFooter className="min-h-[50px]">
        {responseAudio && (
            <audio
              ref={audioRef}
              src={responseAudio}
              autoPlay
              onPlay={handleAudioPlay}
              onEnded={handleAudioPause}
              onPause={handleAudioPause}
              className="w-full hidden"
            >
              Your browser does not support the audio element.
            </audio>
        )}
      </CardFooter>
    </Card>
  );
}
