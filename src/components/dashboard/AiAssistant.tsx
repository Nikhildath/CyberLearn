'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Mic, MicOff, Send, Bot } from 'lucide-react';
import { interactiveCybersecurityAssistant } from '@/ai/flows/interactive-cybersecurity-assistant';
import { speechToText } from '@/ai/flows/speech-to-text';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ParticleCanvas } from './ParticleCanvas';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { useAuth } from '@/context/AuthContext';

function MarkdownRenderer({ content }: { content: string }) {
  // A simple markdown renderer
  const html = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted/50 p-2 rounded-md my-2 text-sm"><code>$1</code></pre>') // Code blocks
    .replace(/`(.*?)`/g, '<code class="bg-muted/50 px-1 rounded-sm text-sm">$1</code>') // Inline code
    .replace(/^(#+)\s*(.*)/gm, (match, hashes, text) => {
        const level = hashes.length;
        return `<h${level} class="font-headline text-primary mt-4 mb-2 text-${3-level}xl">${text}</h${level}>`;
    })
    .replace(/^\s*-\s(.*)/gm, '<li class="ml-4">$1</li>') // List items
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n/g, '<br />');

  return <div className="prose prose-sm max-w-none text-left" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function AiAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseText, setResponseText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [responseAudio, setResponseAudio] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
  const { toast } = useToast();
  const { apiKey } = useAuth();

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

  const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                const base64Audio = reader.result as string;
                setIsTranscribing(true);
                try {
                    const result = await speechToText({ audioDataUri: base64Audio, apiKey });
                    if (result && result.transcript) {
                        setInputValue(result.transcript);
                        processRequest(result.transcript, 'audio');
                    } else {
                        toast({ title: "Transcription failed", description: "Could not transcribe audio."});
                    }
                } catch (error) {
                    console.error("Transcription error:", error);
                    toast({ title: "Transcription Error", description: "Failed to process audio.", variant: 'destructive'});
                } finally {
                    setIsTranscribing(false);
                }
            };
            stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
        setIsRecording(true);
    } catch (error) {
        console.error("Error starting recording:", error);
        toast({ title: "Microphone Error", description: "Could not access microphone.", variant: 'destructive' });
    }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
  };
  
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      audioContextRef.current?.close();
    };
  }, []);


  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      setTranscript('');
      setInputValue('');
      setResponseAudio(null);
      setResponseText('');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      startRecording();
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
          processRequest(inputValue, 'text');
      }
  }

  const processRequest = async (query: string, format: 'audio' | 'text') => {
    if(!query) return;

    if (!apiKey) {
      toast({
        variant: 'destructive',
        title: 'API Key Not Found',
        description: 'Please add and select a Gemini API key in the Account settings.',
      });
      return;
    }

    setTranscript(query);
    setInputValue('');
    setIsThinking(true);
    try {
      const result = await interactiveCybersecurityAssistant({ query, outputFormat: format, apiKey });
      if (result) {
          if (result.media) {
            setResponseAudio(result.media);
          }
          if(result.text) {
            setResponseText(result.text);
          }
      } else {
         throw new Error("The AI assistant returned an empty response.");
      }
    } catch (error) {
      console.error('AI assistant error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Could not get a response from the assistant.';
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: errorMessage,
      });
      setTranscript('');
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
    // Reset after speaking
    setTimeout(() => {
        setTranscript('');
        setResponseAudio(null);
        setResponseText('');
    }, 500);
  }

  const state = isRecording ? 'recording' : isTranscribing ? 'thinking' : isThinking ? 'thinking' : (responseAudio && isPlaying) ? 'speaking' : responseText ? 'text-reply' : 'idle';
  const averageAmplitude = audioData.length > 0 ? audioData.reduce((a, b) => a + b) / audioData.length : 0;

  const getDisplayMessage = () => {
      if (state === 'text-reply') return <MarkdownRenderer content={responseText} />;
      if (transcript) return <p className="text-lg font-medium text-foreground transition-opacity duration-300">{transcript}</p>;
      return <span className="text-muted-foreground">
          {
              {
                  'recording': 'Listening...',
                  'thinking': isTranscribing ? 'Transcribing...' : 'Thinking...',
                  'speaking': 'Here is my response...',
                  'idle': 'Ask me anything...'
              }[state] || 'Ask me anything...'
          }
      </span>;
  }

  return (
    <Card className="flex flex-col border-border/60 shadow-xl h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Interactive AI Assistant</CardTitle>
        <CardDescription>
          Ask any cybersecurity question. Use your voice or type below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-start space-y-4 text-center p-4">
        
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center shrink-0">
            <ParticleCanvas state={state as any} amplitude={averageAmplitude} />
             <div className={cn("z-10", state==='speaking' ? 'text-white' : 'text-primary')}>
                {
                    {
                        'recording': <MicOff size={48} />,
                        'thinking': <Loader2 size={48} className="animate-spin" />,
                        'speaking': <div className="h-12 w-12 rounded-full border-4 border-white/50 animate-pulse" />,
                        'idle': <Bot size={48} />,
                        'text-reply': <Bot size={48} />
                    }[state]
                }
            </div>
        </div>

        <ScrollArea className="w-full flex-grow rounded-lg border border-border/50 bg-background">
            <div className="min-h-full w-full text-center flex items-center justify-center p-4">
                {getDisplayMessage()}
            </div>
        </ScrollArea>

      </CardContent>
       <CardFooter className="p-4 border-t border-border/50">
        <form onSubmit={handleFormSubmit} className="w-full flex items-center gap-2">
            <Input 
                placeholder="Type your question here..."
                className="flex-1 h-12 text-base bg-white"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={isThinking || isRecording || isTranscribing}
            />
            <Button
                type="button"
                onClick={handleToggleRecording}
                size="icon"
                className={cn('h-12 w-12 shrink-0 transition-all duration-300 z-10 text-white',
                    state === 'recording' && 'bg-red-500/80 hover:bg-red-600/80',
                    state !== 'recording' && 'bg-primary hover:bg-primary/90'
                )}
                disabled={isThinking || isTranscribing}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
                {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
            </Button>
            <Button
                type="submit"
                size="icon"
                className="h-12 w-12 shrink-0"
                disabled={isThinking || isRecording || isTranscribing || !inputValue.trim()}
            >
                <Send size={24} />
            </Button>
        </form>
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
