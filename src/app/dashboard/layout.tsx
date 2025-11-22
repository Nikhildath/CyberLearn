'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Bot, TestTube2, User, LayoutDashboard, Menu } from 'lucide-react';
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { ProfileEditor } from '@/components/dashboard/ProfileEditor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LessonContent } from '@/components/dashboard/LessonContent';
import { Lesson } from '@/lib/lessons';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, progress } = useAuth();
  const router = useRouter();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const isMobile = useIsMobile();

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
      <div className="flex min-h-screen w-full">
        <Sidebar side="left" className="border-r border-border/50 shrink-0" collapsible={isMobile ? "offcanvas" : "icon"}>
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
            <div className='flex items-center gap-3 p-3 transition-colors duration-300 group-data-[collapsible=icon]:w-14 group-data-[collapsible=icon]:h-14 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center'>
               <ProfileEditor />
                <div className='flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden'>
                    <span className="text-sm font-semibold text-foreground whitespace-nowrap">{user.username}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">CyberLearn Student</span>
                </div>
                <Button onClick={logout} variant="ghost" size="icon" className="group-data-[collapsible=icon]:hidden ml-auto">
                    <LogOut className='w-5 h-5'/>
                </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-1 flex-col w-full min-w-0">
            <header className="flex md:hidden h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/80 backdrop-blur-sm px-4 lg:px-6 sticky top-0 z-30">
                <div className="flex items-center gap-2">
                     <SidebarTrigger><Menu /></SidebarTrigger>
                    <Logo className="text-primary text-base" />
                </div>
                 <ProfileEditor />
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/30 flex flex-col">
                {children}
            </main>
        </div>
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
    </SidebarProvider>
  );
}
