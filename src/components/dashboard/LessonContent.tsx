'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { type Lesson } from '@/lib/lessons';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, RefreshCw, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { IpInfoCard } from './IpInfoCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

export function LessonContent({ lesson, onComplete }: { lesson: Lesson | null, onComplete: () => void }) {
  const { updateLessonProgress } = useAuth();
  const { toast } = useToast();

  const [messageIndex, setMessageIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);
  
  useEffect(() => {
    // Reset state when lesson changes
    setMessageIndex(0);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setQuizResult(null);
  }, [lesson]);

  if (!lesson) {
    return null;
  }
  
  const currentMessage = lesson.content[messageIndex];
  const isLastMessage = messageIndex === lesson.content.length - 1;

  const handleNext = () => {
    if (isLastMessage) {
      setShowQuiz(true);
    } else {
      setMessageIndex(prev => prev + 1);
    }
  };
  
  const handleQuizSubmit = () => {
    if (!selectedAnswer) {
      toast({
        variant: "destructive",
        title: "No Answer Selected",
        description: "Please select an option before submitting.",
      });
      return;
    }
    const isCorrect = selectedAnswer === lesson.quiz[0].correctAnswer;
    if (isCorrect) {
      setQuizResult('correct');
      updateLessonProgress(lesson.id, 'completed');
      toast({
        title: "Correct!",
        description: "Great job! You've completed this lesson.",
        className: "bg-green-100/20 border-green-500 text-green-700"
      });
    } else {
      setQuizResult('incorrect');
      updateLessonProgress(lesson.id, 'failed');
      toast({
        variant: "destructive",
        title: "Not Quite",
        description: "That wasn't the right answer. Review the explanation.",
      });
    }
  };

  const handleRetryLesson = () => {
    setMessageIndex(0);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setQuizResult(null);
  };
  
  const renderContent = () => {
    if (lesson.id === 'ip-address' && !showQuiz && !quizResult) {
      return (
        <IpInfoCard lesson={lesson} onComplete={() => setShowQuiz(true)} />
      );
    }

    if (!showQuiz) {
        return (
            <div className="flex-grow flex flex-col justify-between text-lg text-foreground/90 p-6">
                <p className="flex-grow leading-relaxed">{currentMessage}</p>
                <div className="flex items-center gap-4 mt-6">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Step {messageIndex + 1} of {lesson.content.length}
                    </div>
                    <Button onClick={handleNext} className="w-1/2">
                        {isLastMessage ? 'Start Quiz' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
          </div>
        );
    }
    
    return (
        <div className="flex-grow flex flex-col p-6">
          <h3 className="font-headline text-xl mb-4">Quick Test: {lesson.title}</h3>
          <div className="space-y-4">
            <p className="font-medium text-lg">{lesson.quiz[0].question}</p>
            <RadioGroup
              value={selectedAnswer || ''}
              onValueChange={setSelectedAnswer}
              disabled={!!quizResult}
            >
              {lesson.quiz[0].options.map((option, index) => (
                <div key={index} className={cn(
                  "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all",
                  quizResult && option === lesson.quiz[0].correctAnswer && "bg-green-500/10 border-green-500",
                  quizResult && option !== lesson.quiz[0].correctAnswer && selectedAnswer === option && "bg-red-500/10 border-red-500",
                  !quizResult && "border-border/50 hover:bg-accent hover:border-accent cursor-pointer",
                  !!quizResult && "cursor-not-allowed"
                )}>
                  <RadioGroupItem value={option} id={`q1-o${index}`} className="h-5 w-5" />
                  <Label htmlFor={`q1-o${index}`} className="flex-1 cursor-pointer text-base">{option}</Label>
                  {quizResult && option === lesson.quiz[0].correctAnswer && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {quizResult && option !== lesson.quiz[0].correctAnswer && selectedAnswer === option && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
              ))}
            </RadioGroup>
          </div>

          {!quizResult ? (
            <Button onClick={handleQuizSubmit} className="w-full mt-6">Submit Answer</Button>
          ) : (
            <div className="mt-6 space-y-4">
              {quizResult === 'incorrect' && (
                <div className="p-4 rounded-md bg-yellow-500/10 border border-yellow-500/50">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-yellow-600">Review this concept:</h4>
                            <p className="text-sm text-yellow-700/80">{lesson.quiz[0].explanation}</p>
                        </div>
                    </div>
                    <Button onClick={handleRetryLesson} variant="outline" className="w-full mt-4 border-yellow-500/50 hover:bg-yellow-500/20">
                        <RefreshCw className="mr-2 h-4 w-4"/> Try Lesson Again
                    </Button>
                </div>
              )}
               {quizResult === 'correct' && (
                <div className="p-4 rounded-md bg-green-500/10 border border-green-500/50 text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-600">Lesson Complete!</h4>
                    <p className="text-sm text-green-700/80">You've mastered the basics of {lesson.title}.</p>
                </div>
              )}
            </div>
          )}
        </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
        <DialogHeader className="p-6 border-b border-border/50 relative">
            <div className="flex items-center gap-4">
                <lesson.Icon className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                    <DialogTitle className="font-headline text-2xl text-primary">{lesson.title}</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">Interactive Learning Module</DialogDescription>
                </div>
            </div>
        </DialogHeader>
        <ScrollArea className="flex-grow">
            {renderContent()}
        </ScrollArea>
    </div>
  );
}
