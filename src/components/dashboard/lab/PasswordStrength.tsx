'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const criteria = [
    { text: 'At least 8 characters long', regex: /.{8,}/ },
    { text: 'Contains a lowercase letter', regex: /[a-z]/ },
    { text: 'Contains an uppercase letter', regex: /[A-Z]/ },
    { text: 'Contains a number', regex: /[0-9]/ },
    { text: 'Contains a special character', regex: /[^A-Za-z0-9]/ }
];

export function PasswordStrength() {
  const [password, setPassword] = useState('');

  const strength = useMemo(() => {
    let score = 0;
    if (!password) return { score: 0, text: '', color: 'bg-transparent' };

    criteria.forEach(criterion => {
        if (criterion.regex.test(password)) {
            score++;
        }
    });

    if (password.length > 12) score++;

    let text = 'Very Weak';
    let color = 'bg-red-500';
    if (score >= 6) {
        text = 'Very Strong';
        color = 'bg-green-500';
    } else if (score >= 5) {
        text = 'Strong';
        color = 'bg-emerald-500';
    } else if (score >= 4) {
        text = 'Medium';
        color = 'bg-yellow-500';
    } else if (score >= 2) {
        text = 'Weak';
        color = 'bg-orange-500';
    }
    
    return { score, text, color };
  }, [password]);

  const progressValue = (strength.score / 6) * 100;

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Password Strength Tester</CardTitle>
        <CardDescription>Enter a password to see how strong it is. A good password is your first line of defense.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input 
            type="text" 
            placeholder="Type a password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 text-xl bg-background/50"
        />

        {password && (
             <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Password Strength:</p>
                    <p className={cn("text-sm font-bold",
                        strength.color.startsWith('bg-red') && 'text-red-400',
                        strength.color.startsWith('bg-orange') && 'text-orange-400',
                        strength.color.startsWith('bg-yellow') && 'text-yellow-400',
                        strength.color.startsWith('bg-emerald') && 'text-emerald-400',
                        strength.color.startsWith('bg-green') && 'text-green-400',
                    )}>{strength.text}</p>
                </div>
                <Progress value={progressValue} className={cn("h-2 transition-all", strength.color)} indicatorClassName={strength.color} />
             </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {criteria.map((criterion, index) => {
                const met = criterion.regex.test(password);
                return (
                    <div key={index} className={cn("flex items-center gap-2 transition-colors", met ? "text-green-400" : "text-muted-foreground")}>
                        {met ? <Check className="h-4 w-4"/> : <X className="h-4 w-4"/>}
                        <span>{criterion.text}</span>
                    </div>
                )
            })}
        </div>
      </CardContent>
    </Card>
  );
}

declare module '@/components/ui/progress' {
    interface ProgressProps {
        indicatorClassName?: string;
    }
}
