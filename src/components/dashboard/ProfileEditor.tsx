'use client';
import { useState } from 'react';
import { useAuth, UserProfile } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit } from 'lucide-react';

export function ProfileEditor() {
  const { user, updateProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatar);
  const fileInputRef = useState<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          variant: 'destructive',
          title: 'Image too large',
          description: 'Please select an image smaller than 2MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const profileUpdate: Partial<UserProfile> = {};
    if (username !== user?.username) {
        profileUpdate.username = username;
    }
    if (avatar !== user?.avatar) {
        profileUpdate.avatar = avatar;
    }
    
    if (Object.keys(profileUpdate).length > 0) {
        updateProfile(profileUpdate);
        toast({
            title: 'Profile Updated',
            description: 'Your changes have been saved.',
        });
    }
    setIsOpen(false);
  };
  
  if (!user) return null;

  return (
    <>
      <Button variant="ghost" className="relative group h-12 w-12 rounded-full" onClick={() => setIsOpen(true)}>
        <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="bg-muted text-lg">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit className="h-6 w-6 text-white"/>
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-primary">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="flex flex-col items-center gap-4">
                 <button onClick={() => fileInputRef.current?.click()} className="relative group">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-muted text-4xl">{username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Edit className="h-8 w-8 text-white"/>
                    </div>
                 </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                    accept="image/png, image/jpeg"
                />
             </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
