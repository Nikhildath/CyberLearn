'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PhishingExercise } from './lab/PhishingExercise';
import { Fish } from 'lucide-react';

export function Lab() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl font-headline data-[state=open]:text-primary">
          <div className="flex items-center gap-3">
            <Fish className="h-6 w-6" />
            <span>Phishing Simulator</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-1">
          <PhishingExercise />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
