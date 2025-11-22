
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PhishingExercise } from './lab/PhishingExercise';
import { MalwareSimulator } from './lab/MalwareSimulator';
import { PasswordStrength } from './lab/PasswordStrength';
import { Fish, Bug, KeyRound, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { IncidentResponseGuide } from './lab/IncidentResponseGuide';

export function Lab() {
  return (
    <Card className="w-full h-full shadow-xl border-border/60">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Cybersecurity Lab</CardTitle>
            <CardDescription>Test your skills and run through practical security scenarios.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg bg-background/50 px-4 shadow-sm">
                <AccordionTrigger className="text-xl font-headline data-[state=open]:text-primary hover:no-underline">
                <div className="flex items-center gap-3">
                    <Fish className="h-6 w-6" />
                    <span>Phishing Simulator</span>
                </div>
                </AccordionTrigger>
                <AccordionContent className="p-1 -mx-1">
                <PhishingExercise />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg bg-background/50 px-4 shadow-sm">
                <AccordionTrigger className="text-xl font-headline data-[state=open]:text-primary hover:no-underline">
                <div className="flex items-center gap-3">
                    <Bug className="h-6 w-6" />
                    <span>Malware Challenge</span>
                </div>
                </AccordionTrigger>
                <AccordionContent className="p-1 -mx-1">
                <MalwareSimulator />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg bg-background/50 px-4 shadow-sm">
                <AccordionTrigger className="text-xl font-headline data-[state=open]:text-primary hover:no-underline">
                <div className="flex items-center gap-3">
                    <KeyRound className="h-6 w-6" />
                    <span>Password Strength Tester</span>
                </div>
                </AccordionTrigger>
                <AccordionContent className="p-1 -mx-1">
                <PasswordStrength />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-2 border-destructive/50 rounded-lg bg-destructive/5 px-4 shadow-lg">
                <AccordionTrigger className="text-xl font-headline text-destructive/90 data-[state=open]:text-destructive hover:no-underline">
                <div className="flex items-center gap-3">
                    <ShieldAlert className="h-6 w-6" />
                    <span>Incident Response Plan</span>
                </div>
                </AccordionTrigger>
                <AccordionContent className="p-1 -mx-1">
                <IncidentResponseGuide />
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
  );
}
