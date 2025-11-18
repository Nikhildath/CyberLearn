'use client';

import { AiAssistant } from '@/components/dashboard/AiAssistant';
import { LessonGrid } from '@/components/dashboard/LessonGrid';
import { AccountSettings } from '@/components/dashboard/AccountSettings';
import { PhishingLab } from '@/components/dashboard/PhishingLab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Bot, User, TestTube2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-4 h-14 bg-card border border-border/50 rounded-lg">
        <TabsTrigger value="dashboard" className="h-10 text-sm">
          <LayoutDashboard className="mr-2" /> Dashboard
        </TabsTrigger>
        <TabsTrigger value="assistant" className="h-10 text-sm">
          <Bot className="mr-2" /> AI Assistant
        </TabsTrigger>
        <TabsTrigger value="lab" className="h-10 text-sm">
            <TestTube2 className="mr-2" /> Phishing Lab
        </TabsTrigger>
        <TabsTrigger value="account" className="h-10 text-sm">
          <User className="mr-2" /> Account
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="mt-6">
        <LessonGrid />
      </TabsContent>
      <TabsContent value="assistant" className="mt-6">
        <AiAssistant />
      </TabsContent>
       <TabsContent value="lab" className="mt-6">
        <PhishingLab />
      </TabsContent>
      <TabsContent value="account" className="mt-6">
        <AccountSettings />
      </TabsContent>
    </Tabs>
  );
}
