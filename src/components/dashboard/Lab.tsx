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
import { Fish, Bug, KeyRound } from 'lucide-react';

export function Lab() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
      <AccordionItem value="item-1" className="border rounded-lg bg-card px-4 shadow-sm">
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
      <AccordionItem value="item-2" className="border rounded-lg bg-card px-4 shadow-sm">
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
      <AccordionItem value="item-3" className="border rounded-lg bg-card px-4 shadow-sm">
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
    </Accordion>
  );
}
