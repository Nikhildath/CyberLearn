'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Mic, MicOff, Send, Bot } from 'lucide-react';
import { interactiveCybersecurityAssistant } from '@/ai/flows/interactive-cybersecurity-assistant';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ParticleCanvas } from './ParticleCanvas';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '../ui/scroll-area';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseText, setResponseText] = useState('');
  const [inputValue, setInputValue] = useState('');
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
      setInputValue(final + interim);
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
      if (!isRecording && inputValue.trim() && !responseAudio && !responseText) {
          processRequest(inputValue, 'audio');
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
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
      recognitionRef.current?.start();
      setIsRecording(true);
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
    setTranscript(query);
    setInputValue('');
    setIsThinking(true);
    try {
      const result = await interactiveCybersecurityAssistant({ query, outputFormat: format });
      if (result.media) {
        setResponseAudio(result.media);
      }
      if(result.text) {
        setResponseText(result.text);
      }
      // The audio element will auto-play if src is set
    } catch (error) {
      console.error('AI assistant error:', error);
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: 'Could not get a response from the assistant.',
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

  const state = isRecording ? 'recording' : isThinking ? 'thinking' : (responseAudio && isPlaying) ? 'speaking' : responseText ? 'text-reply' : 'idle';
  const averageAmplitude = audioData.length > 0 ? audioData.reduce((a, b) => a + b) / audioData.length : 0;

  const getDisplayMessage = () => {
      if (state === 'text-reply') return <MarkdownRenderer content={responseText} />;
      if (transcript) return <p className="text-lg font-medium text-foreground transition-opacity duration-300">{transcript}</p>;
      return <span className="text-muted-foreground">
          {
              {
                  'recording': 'Listening...',
                  'thinking': 'Thinking...',
                  'speaking': 'Here is my response...',
                  'idle': 'Ask me anything...'
              }[state] || 'Ask me anything...'
          }
      </span>;
  }

  return (
    <Card className="flex h-[70vh] flex-col border-border/60 shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Interactive AI Assistant</CardTitle>
        <CardDescription>
          Ask any cybersecurity question. Use your voice or type below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center space-y-4 text-center">
        
        <div className="relative w-48 h-48 flex items-center justify-center">
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

        <ScrollArea className="h-40 w-full rounded-lg border border-border/50 bg-background p-4">
            <div className="min-h-[72px] w-full text-center flex items-center justify-center p-4">
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
                disabled={isThinking || isRecording}
            />
            <Button
                type="button"
                onClick={handleToggleRecording}
                size="icon"
                className={cn('h-12 w-12 transition-all duration-300 z-10 text-white',
                    state === 'recording' && 'bg-red-500/80 hover:bg-red-600/80',
                    state !== 'recording' && 'bg-primary hover:bg-primary/90'
                )}
                disabled={isThinking}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
                {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
            </Button>
            <Button
                type="submit"
                size="icon"
                className="h-12 w-12"
                disabled={isThinking || isRecording || !inputValue.trim()}
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
