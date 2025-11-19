
'use client';
import { useRef, useState } from 'react';
import { useAuth, UserProfile } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Save, Plus, Trash2, KeyRound, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';

function ApiKeyManager() {
  const { apiKey, apiKeys, addApiKey, removeApiKey, setActiveApiKey } = useAuth();
  const [newApiKey, setNewApiKey] = useState('');
  const [showKeys, setShowKeys] = useState(false);
  const { toast } = useToast();

  const handleAddKey = () => {
    if (newApiKey.trim()) {
      addApiKey(newApiKey.trim());
      setNewApiKey('');
      toast({ title: 'API Key Added' });
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-border/50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2"><KeyRound className="h-5 w-5 text-primary" /> API Key Management</h3>
        <Button variant="ghost" size="icon" onClick={() => setShowKeys(!showKeys)}>
          {showKeys ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Add your Gemini API keys here. The app will use the "Active" key for all AI requests.
      </p>
      
      <div className="flex gap-2">
        <Input 
          type="password"
          placeholder="Paste new Gemini API key"
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
        />
        <Button onClick={handleAddKey}><Plus className="mr-2 h-4 w-4" /> Add</Button>
      </div>

      <div className="space-y-2">
        <Label>Active API Key</Label>
        <Select value={apiKey || ''} onValueChange={setActiveApiKey}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="No active key selected" />
          </SelectTrigger>
          <SelectContent>
            {apiKeys.map((key) => (
              <SelectItem key={key} value={key}>
                {showKeys ? key : `${key.slice(0, 4)}...${key.slice(-4)}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {apiKeys.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">All Keys</h4>
          <div className="space-y-2 rounded-md bg-muted/50 p-2">
            {apiKeys.map((key, index) => (
              <div key={index} className="flex items-center justify-between gap-2 bg-background p-2 rounded">
                 <span className={cn("text-sm font-mono", !showKeys && "blur-sm")}>
                    {key}
                </span>
                <Button variant="ghost" size="icon" onClick={() => removeApiKey(key)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export function AccountSettings() {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    <Card className="w-full shadow-xl border-border/60">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Account Settings</CardTitle>
            <CardDescription>Manage your profile and API key settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="font-medium">User Profile</h3>
                    <div className="flex flex-col items-center gap-4">
                        <button onClick={() => fileInputRef.current?.click()} className="relative group">
                            <Avatar className="h-32 w-32 border-4 border-primary/20">
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
                    <Label htmlFor="username" className="text-base">
                        Username
                    </Label>
                    <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-12 text-base"
                    />
                    </div>
                </div>

                <ApiKeyManager />
            </div>
        </CardContent>
        <CardFooter>
            <Button type="submit" onClick={handleSave} size="lg" className="w-full md:w-auto md:ml-auto">
                <Save className="mr-2"/>
                Save Changes
            </Button>
        </CardFooter>
    </Card>
  );
}
