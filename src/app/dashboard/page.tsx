'use client';

import { useState, useEffect, useMemo } from 'react';
import { lessons } from '@/lib/lessons';
import { AiAssistant } from '@/components/dashboard/AiAssistant';
import { LessonContent } from '@/components/dashboard/LessonContent';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const { progress } = useAuth();
  
  const completedLessonsCount = useMemo(() => {
      return Object.values(progress).filter(status => status === 'completed').length;
  }, [progress]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const lessonExists = lessons.some(l => l.id === hash);
      if (lessonExists) {
        setSelectedLessonId(hash);
      } else if (lessons.length > 0) {
        const firstLessonId = lessons[0].id;
        window.location.hash = firstLessonId;
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    handleHashChange();
    if (!window.location.hash && lessons.length > 0) {
        window.location.hash = lessons[0].id;
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectedLesson = useMemo(() => {
    return lessons.find((lesson) => lesson.id === selectedLessonId) || null;
  }, [selectedLessonId]);
  
  const progressValue = (completedLessonsCount / lessons.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-headline">Your Progress</h2>
        <p className="text-sm text-muted-foreground">
          You've completed {completedLessonsCount} of {lessons.length} lessons. Keep going!
        </p>
        <Progress value={progressValue} className="mt-2 h-2" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-h-[500px] lg:col-span-1">
          <LessonContent lesson={selectedLesson} />
        </div>
        <div className="min-h-[500px] lg:col-span-1">
          <AiAssistant />
        </div>
      </div>
    </div>
  );
}
