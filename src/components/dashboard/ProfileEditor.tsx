'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit } from 'lucide-react';
import { AccountSettings } from './AccountSettings';

export function ProfileEditor() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  if (!user) return null;

  return (
    <>
      <Button variant="ghost" className="relative group h-10 w-10 rounded-full p-0" onClick={() => setIsOpen(true)}>
        <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-primary transition-colors">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="bg-muted text-base">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-3xl bg-card/90 border-border/80 backdrop-blur-xl p-0">
            <DialogHeader className="p-0 absolute -z-10 opacity-0">
                <DialogTitle>Account Settings</DialogTitle>
                <DialogDescription>Edit your profile and manage your API keys.</DialogDescription>
            </DialogHeader>
            <AccountSettings />
        </DialogContent>
      </Dialog>
    </>
  );
}
