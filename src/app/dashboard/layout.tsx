'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import { lessons } from '@/lib/lessons';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { ProfileEditor } from '@/components/dashboard/ProfileEditor';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { LessonContent } from '@/components/dashboard/LessonContent';
import { Lesson } from '@/lib/lessons';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, progress } = useAuth();
  const router = useRouter();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" className="border-r border-border/50" collapsible="icon">
        <SidebarHeader>
          <div className="flex h-16 items-center justify-start px-3">
            <Logo className="text-primary transition-all group-data-[collapsible=icon]:-translate-x-12" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {lessons.map((lesson) => (
              <SidebarMenuItem key={lesson.id}>
                <SidebarMenuButton
                  onClick={() => handleLessonClick(lesson)}
                  className="group/button"
                  tooltip={{
                    children: lesson.title,
                    className: 'font-headline',
                  }}
                >
                  <lesson.Icon className="text-sidebar-foreground/70 group-hover/button:text-sidebar-accent-foreground" />
                  <span>{lesson.title}</span>
                  {progress[lesson.id] === 'completed' && <CheckCircle className="ml-auto h-4 w-4 text-green-500" />}
                  {progress[lesson.id] === 'failed' && <XCircle className="ml-auto h-4 w-4 text-red-500" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip="Logout">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/80 backdrop-blur-sm px-4 lg:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden"/>
                <h1 className="text-xl font-semibold font-headline text-foreground">Cyber Security Training</h1>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {user.username}</span>
                <ProfileEditor />
            </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>

      <Dialog open={!!selectedLesson} onOpenChange={(isOpen) => !isOpen && setSelectedLesson(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col bg-card border-border p-0">
            {selectedLesson && <LessonContent lesson={selectedLesson} onComplete={() => setSelectedLesson(null)} />}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
