'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { lessons, type Lesson } from '@/lib/lessons';
import { AiAssistant } from '@/components/dashboard/AiAssistant';

function LessonContent({ lesson }: { lesson: Lesson | null }) {
  if (!lesson) {
    return (
      <Card className="flex h-full items-center justify-center">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-medium text-muted-foreground">Select a lesson from the sidebar to begin.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <lesson.Icon className="h-10 w-10 text-accent" />
        <div>
          <CardTitle className="font-headline text-2xl">{lesson.title}</CardTitle>
          <CardDescription>Key concepts and best practices.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="text-base text-foreground/90">
        <p>{lesson.content}</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const lessonExists = lessons.some(l => l.id === hash);
      if (lessonExists) {
        setSelectedLessonId(hash);
        setCompletedLessons(prev => new Set(prev).add(hash));
      } else if (lessons.length > 0) {
        // Fallback to first lesson if hash is invalid or empty
        const firstLessonId = lessons[0].id;
        window.location.hash = firstLessonId;
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial load
    handleHashChange();
    if (!window.location.hash && lessons.length > 0) {
        window.location.hash = lessons[0].id;
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectedLesson = useMemo(() => {
    return lessons.find((lesson) => lesson.id === selectedLessonId) || null;
  }, [selectedLessonId]);
  
  const progressValue = (completedLessons.size / lessons.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Your Progress</h2>
        <p className="text-sm text-muted-foreground">
          You've completed {completedLessons.size} of {lessons.length} lessons.
        </p>
        <Progress value={progressValue} className="mt-2" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-h-[400px]">
          <LessonContent lesson={selectedLesson} />
        </div>
        <div className="min-h-[400px]">
          <AiAssistant />
        </div>
      </div>
    </div>
  );
}
