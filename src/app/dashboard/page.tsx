'use client';

import { useState, useEffect } from 'react';
import { AiAssistant } from '@/components/dashboard/AiAssistant';
import { LessonGrid } from '@/components/dashboard/LessonGrid';
import { AccountSettings } from '@/components/dashboard/AccountSettings';
import { Lab } from '@/components/dashboard/Lab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Bot, User, TestTube2 } from 'lucide-react';
import { WelcomeTutorial } from '@/components/dashboard/WelcomeTutorial';

const LOCAL_STORAGE_KEY_TUTORIAL = 'cyberlearnhq_tutorial_seen';

export default function DashboardPage() {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    try {
      const tutorialSeen = localStorage.getItem(LOCAL_STORAGE_KEY_TUTORIAL);
      if (!tutorialSeen) {
        setShowTutorial(true);
      }
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
  }, []);

  const handleTutorialComplete = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_TUTORIAL, 'true');
      setShowTutorial(false);
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
  };


  return (
    <div className="w-full h-full">
      <WelcomeTutorial open={showTutorial} onComplete={handleTutorialComplete} />
      <Tabs defaultValue="dashboard" className="w-full h-full flex flex-col">
        <TabsList id="dashboard-tabs" className="grid w-full grid-cols-4 h-16 bg-card border rounded-lg shadow-sm">
          <TabsTrigger value="dashboard" className="h-12 text-sm gap-2">
            <LayoutDashboard className="h-5 w-5" /> <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="assistant" className="h-12 text-sm gap-2">
            <Bot className="h-5 w-5" /> <span>AI Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="test" className="h-12 text-sm gap-2">
              <TestTube2 className="h-5 w-5" /> <span>Lab</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="h-12 text-sm gap-2">
            <User className="h-5 w-5" /> <span>Account</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6 flex-grow">
          <LessonGrid />
        </TabsContent>
        <TabsContent value="assistant" className="mt-6 flex-grow">
          <AiAssistant />
        </TabsContent>
        <TabsContent value="test" className="mt-6 flex-grow">
          <Lab />
        </TabsContent>
        <TabsContent value="account" className="mt-6 flex-grow">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
