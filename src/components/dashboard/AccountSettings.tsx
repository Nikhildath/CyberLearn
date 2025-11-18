'use client';
import { useState } from 'react';
import { useAuth, UserProfile } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export function AccountSettings() {
  const { user, updateProfile } = useAuth();
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
  };
  
  if (!user) return null;

  return (
    <Card className="max-w-2xl mx-auto bg-card/50 border-border/50 shadow-xl">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Account Settings</CardTitle>
            <CardDescription>Manage your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="flex flex-col items-center gap-4">
                 <button onClick={() => fileInputRef.current?.click()} className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-primary/50">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-muted text-5xl">{username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Edit className="h-10 w-10 text-white"/>
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

            <div className="space-y-2">
              <Label htmlFor="username" className="text-lg">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
        </CardContent>
        <CardFooter>
            <Button type="submit" onClick={handleSave} size="lg" className="w-full">
                <Save className="mr-2"/>
                Save Changes
            </Button>
        </CardFooter>
    </Card>
  );
}
