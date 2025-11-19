'use client';

import { AiAssistant } from '@/components/dashboard/AiAssistant';
import { LessonGrid } from '@/components/dashboard/LessonGrid';
import { AccountSettings } from '@/components/dashboard/AccountSettings';
import { Lab } from '@/components/dashboard/Lab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Bot, User, TestTube2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-4 h-16 bg-card border rounded-lg">
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

      <TabsContent value="dashboard" className="mt-6">
        <LessonGrid />
      </TabsContent>
      <TabsContent value="assistant" className="mt-6">
        <AiAssistant />
      </TabsContent>
       <TabsContent value="test" className="mt-6">
        <Lab />
      </TabsContent>
      <TabsContent value="account" className="mt-6">
        <AccountSettings />
      </TabsContent>
    </Tabs>
  );
}
