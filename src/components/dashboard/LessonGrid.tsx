'use client';

import { useAuth } from '@/context/AuthContext';
import { lessons } from '@/lib/lessons';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, XCircle, Trophy, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LessonContent } from './LessonContent';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Lesson } from '@/lib/lessons';
import { cn } from '@/lib/utils';

export function LessonGrid() {
  const { progress } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const completedLessonsCount = Object.values(progress).filter(status => status === 'completed').length;
  const progressValue = (completedLessonsCount / lessons.length) * 100;

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };
  
  return (
    <div className="space-y-8">
      <Card className="bg-card/80 border-border shadow-2xl backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Trophy className="h-10 w-10 text-yellow-400"/>
            <div>
              <CardTitle className="font-headline text-2xl text-foreground">Your Progress</CardTitle>
              <CardDescription>
                You've completed {completedLessonsCount} of {lessons.length} lessons. Keep up the great work!
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressValue} className="h-3" indicatorClassName="bg-primary" />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {lessons.map((lesson) => {
          const status = progress[lesson.id];
          return (
            <Card
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={cn(
                  "flex flex-col cursor-pointer transition-all duration-300 group bg-card/80 border-border/60 shadow-lg hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50 backdrop-blur-sm",
                  status === 'completed' && "border-green-500/50",
                  status === 'failed' && "border-red-500/50"
              )}
            >
              <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
                <div className={cn(
                    "p-3 rounded-lg border",
                    status === 'completed' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    status === 'failed' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                    "bg-accent text-primary border-border"
                )}>
                    <lesson.Icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                    <CardTitle className="font-headline text-xl text-foreground/90">{lesson.title}</CardTitle>
                    {status === 'completed' && <p className="text-xs font-semibold text-green-500 flex items-center gap-1"><CheckCircle className="h-3 w-3"/> Completed</p>}
                    {status === 'failed' && <p className="text-xs font-semibold text-red-500 flex items-center gap-1"><XCircle className="h-3 w-3"/> Failed</p>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {lesson.content[0]}
                </p>
              </CardContent>
              <CardFooter>
                  <Button variant={status ? "secondary" : "default"} className="w-full">
                      {status === 'completed' ? "Review Lesson" : status === 'failed' ? "Try Again" : "Start Lesson"}
                      <ChevronRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Dialog open={!!selectedLesson} onOpenChange={(isOpen) => !isOpen && setSelectedLesson(null)}>
        <DialogContent className="max-w-6xl h-[90vh] flex flex-col bg-card/90 border-border/80 backdrop-blur-xl p-0">
           {selectedLesson && (
              <>
                <DialogHeader className="p-0 absolute -z-10 opacity-0">
                  <DialogTitle>{selectedLesson.title}</DialogTitle>
                  <DialogDescription>Interactive lesson for {selectedLesson.title}.</DialogDescription>
                </DialogHeader>
                <LessonContent lesson={selectedLesson} onComplete={() => setSelectedLesson(null)} />
              </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
