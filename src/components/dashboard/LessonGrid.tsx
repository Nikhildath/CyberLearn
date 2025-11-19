'use client';

import { useAuth } from '@/context/AuthContext';
import { lessons } from '@/lib/lessons';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '../ui/button';
import { useState } from 'react';
import { LessonContent } from './LessonContent';
import { Dialog, DialogContent } from '../ui/dialog';
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
      <Card className="bg-card/50 border-border/50 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Trophy className="h-10 w-10 text-yellow-400"/>
            <div>
              <CardTitle className="font-headline text-2xl">Your Progress</CardTitle>
              <CardDescription>
                You've completed {completedLessonsCount} of {lessons.length} lessons. Keep up the great work!
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressValue} className="h-3" />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {
          const status = progress[lesson.id];
          return (
            <Card
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={cn(
                  "flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-card/50 border-border/50",
                  status === 'completed' && "border-green-500/50",
                  status === 'failed' && "border-red-500/50"
              )}
            >
              <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                <div className={cn(
                    "p-3 rounded-lg",
                    status === 'completed' ? "bg-green-500/10 text-green-400" :
                    status === 'failed' ? "bg-red-500/10 text-red-400" :
                    "bg-accent text-accent-foreground"
                )}>
                    <lesson.Icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-xl flex-1">{lesson.title}</CardTitle>
                {status === 'completed' && <CheckCircle className="h-6 w-6 text-green-500" />}
                {status === 'failed' && <XCircle className="h-6 w-6 text-red-500" />}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {lesson.content[1]}
                </p>
              </CardContent>
              <CardFooter>
                  <Button variant="secondary" className="w-full">
                      {status ? "Review Lesson" : "Start Lesson"}
                  </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Dialog open={!!selectedLesson} onOpenChange={(isOpen) => !isOpen && setSelectedLesson(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col bg-card border-border p-0">
            {selectedLesson && <LessonContent lesson={selectedLesson} onComplete={() => setSelectedLesson(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
