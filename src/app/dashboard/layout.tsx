'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, LogOut } from 'lucide-react';
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar side="left" className="border-r" collapsible="icon">
        <SidebarHeader>
          <div className="flex h-12 items-center justify-start px-2">
            <Logo className="text-sidebar-foreground transition-all group-data-[collapsible=icon]:-translate-x-12" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {lessons.map((lesson) => (
              <SidebarMenuItem key={lesson.id}>
                <SidebarMenuButton
                  href={`#${lesson.id}`}
                  className="group/button"
                  tooltip={{
                    children: lesson.title,
                    className: 'font-headline',
                  }}
                >
                  <lesson.Icon className="text-sidebar-foreground/70 group-hover/button:text-sidebar-accent-foreground" />
                  <span>{lesson.title}</span>
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
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-xl font-semibold font-headline">CyberLearnHQ Dashboard</h1>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
