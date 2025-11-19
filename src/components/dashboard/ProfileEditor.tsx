'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit } from 'lucide-react';
import { AccountSettings } from './AccountSettings';

export function ProfileEditor() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  if (!user) return null;

  return (
    <>
      <Button variant="ghost" className="relative group h-12 w-12 rounded-full p-0" onClick={() => setIsOpen(true)}>
        <Avatar className="h-12 w-12 border-2 border-transparent group-hover:border-primary transition-colors">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="bg-muted text-lg">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit className="h-6 w-6 text-white"/>
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border p-0">
            <AccountSettings />
        </DialogContent>
      </Dialog>
    </>
  );
}
