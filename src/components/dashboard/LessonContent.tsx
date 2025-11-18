'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { type Lesson, type LessonQuiz } from '@/lib/lessons';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { IpInfoCard } from './IpInfoCard';


export function LessonContent({ lesson }: { lesson: Lesson | null }) {
  const { progress, updateLessonProgress } = useAuth();
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
    return (
      <Card className="flex h-full items-center justify-center border-border/30 bg-card/30">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-medium text-muted-foreground">Select a lesson from the sidebar to begin your training.</p>
        </CardContent>
      </Card>
    );
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
        className: "bg-green-700/20 border-green-500"
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
  
  if (lesson.id === 'ip-address' && !showQuiz && !quizResult) {
    return (
      <IpInfoCard lesson={lesson} onComplete={() => setShowQuiz(true)} />
    );
  }

  return (
    <Card className="flex h-full flex-col border-border/50 bg-card/50 shadow-xl">
      <CardHeader className="flex flex-row items-start gap-4">
        <lesson.Icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
        <div>
          <CardTitle className="font-headline text-3xl text-primary">{lesson.title}</CardTitle>
          <CardDescription>Interactive Learning Module</CardDescription>
        </div>
      </CardHeader>

      {!showQuiz ? (
        <CardContent className="flex-grow flex flex-col justify-between text-lg text-foreground/90 p-6">
          <p className="flex-grow">{currentMessage}</p>
          <Button onClick={handleNext} className="w-full mt-4">
            {isLastMessage ? 'Start Quiz' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      ) : (
        <CardContent className="flex-grow flex flex-col p-6">
          <h3 className="font-headline text-xl mb-4">Quick Test</h3>
          <div className="space-y-4">
            <p className="font-medium">{lesson.quiz[0].question}</p>
            <RadioGroup
              value={selectedAnswer || ''}
              onValueChange={setSelectedAnswer}
              disabled={!!quizResult}
            >
              {lesson.quiz[0].options.map((option, index) => (
                <div key={index} className={cn(
                  "flex items-center space-x-3 p-3 rounded-md border transition-all",
                  quizResult && option === lesson.quiz[0].correctAnswer && "bg-green-500/10 border-green-500",
                  quizResult && option !== lesson.quiz[0].correctAnswer && selectedAnswer === option && "bg-red-500/10 border-red-500",
                  !quizResult && "border-border/50 hover:bg-accent/50",
                  !!quizResult && "cursor-not-allowed"
                )}>
                  <RadioGroupItem value={option} id={`q1-o${index}`} />
                  <Label htmlFor={`q1-o${index}`} className="flex-1 cursor-pointer">{option}</Label>
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
                        <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-yellow-300">Review this concept:</h4>
                            <p className="text-sm text-yellow-400/80">{lesson.quiz[0].explanation}</p>
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
                    <h4 className="font-semibold text-green-400">Lesson Complete!</h4>
                    <p className="text-sm text-green-500/80">You've mastered the basics of {lesson.title}.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
