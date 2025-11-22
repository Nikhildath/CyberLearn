'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, LayoutDashboard, Bot, TestTube2, User, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const tutorialSteps = [
  {
    icon: LayoutDashboard,
    title: 'Welcome to CyberLearn!',
    description: 'This quick tour will guide you through the main features of your dashboard.',
    targetId: null,
  },
  {
    icon: LayoutDashboard,
    title: 'The Dashboard Tab',
    description: 'This is your home base. Here you can see all the lessons and track your overall progress.',
    targetId: 'dashboard-tabs',
    targetValue: 'dashboard'
  },
  {
    icon: Bot,
    title: 'The AI Assistant',
    description: 'Have a cybersecurity question? Ask our AI assistant! You can either type your question or use your voice for a fully interactive experience.',
    targetId: 'dashboard-tabs',
    targetValue: 'assistant'
  },
  {
    icon: TestTube2,
    title: 'The Lab',
    description: 'Put your skills to the test with hands-on exercises like a phishing simulator, a malware challenge, and a password strength tester.',
    targetId: 'dashboard-tabs',
    targetValue: 'test'
  },
  {
    icon: User,
    title: 'Your Account',
    description: "Manage your profile information and your API keys for the AI services here. Let's get started!",
    targetId: 'dashboard-tabs',
    targetValue: 'account'
  },
];

type TargetRect = {
    top: number;
    left: number;
    width: number;
    height: number;
} | null;

export function WelcomeTutorial({ open, onComplete }: { open: boolean, onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const currentStep = tutorialSteps[step];
  const isLastStep = step === tutorialSteps.length - 1;
  const isFirstStep = step === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setStep(prev => prev - 1);
    }
  };

  useEffect(() => {
    if(open) {
        setStep(0);
    }
  }, [open]);

  // Effect to switch tabs and calculate target rect
  useEffect(() => {
    if (!open) return;

    let targetElement: HTMLElement | null = null;
    if (currentStep.targetId && currentStep.targetValue) {
        const parentElement = document.getElementById(currentStep.targetId);
        targetElement = parentElement?.querySelector<HTMLButtonElement>(`[data-value="${currentStep.targetValue}"]`);
        if (targetElement && targetElement.getAttribute('data-state') !== 'active') {
            targetElement.click();
        }
    } else if (currentStep.targetId) {
        targetElement = document.getElementById(currentStep.targetId);
    }
    
    // Give DOM time to update after tab click
    const timeoutId = setTimeout(() => {
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            setTargetRect({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        } else {
            setTargetRect(null);
        }
    }, 100); // A short delay is often needed for tab content to render

    return () => clearTimeout(timeoutId);

  }, [step, open, currentStep]);

  if (!open) {
    return null;
  }
  
  const getDialogPosition = () => {
    if (!targetRect || !dialogContentRef.current) return {};
    
    const dialogHeight = dialogContentRef.current.offsetHeight;
    const spaceBelow = window.innerHeight - targetRect.top - targetRect.height;
    
    if (spaceBelow > dialogHeight + 20) {
        // Position below
        return {
            top: `${targetRect.top + targetRect.height + 10}px`,
            left: `${targetRect.left + targetRect.width / 2}px`,
            transform: 'translateX(-50%)',
        }
    } else {
        // Position above
         return {
            top: `${targetRect.top - dialogHeight - 10}px`,
            left: `${targetRect.left + targetRect.width / 2}px`,
            transform: 'translateX(-50%)',
        }
    }
  }

  const TutorialContent = () => (
     <div ref={dialogContentRef} className={cn("z-[101] w-full sm:max-w-md bg-card border-border shadow-2xl rounded-lg", !targetRect && "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")}>
        <DialogHeader className="items-center text-center p-6">
          <div className="rounded-full bg-primary/10 p-3 border-8 border-primary/5 mb-4">
              <currentStep.icon className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="font-headline text-2xl">{currentStep.title}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground px-4">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row justify-between items-center p-6 pt-2">
            <div className="text-sm text-muted-foreground">
                Step {step + 1} of {tutorialSteps.length}
            </div>
            <div className="flex gap-2">
                {!isFirstStep && (
                    <Button variant="outline" onClick={handlePrev}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                )}
                <Button onClick={handleNext}>
                    {isLastStep ? 'Get Started' : 'Next'}
                    {isLastStep ? <Check className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
            </div>
        </DialogFooter>
      </div>
  );

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onComplete() }}>
       <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
           {targetRect && (
             <div 
                className="fixed transition-all duration-300 ease-in-out pointer-events-none"
                style={{ 
                    top: targetRect.top - 8,
                    left: targetRect.left - 8,
                    width: targetRect.width + 16,
                    height: targetRect.height + 16,
                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
                    borderRadius: 'calc(var(--radius) + 4px)',
                }}
            />
           )}
           <div className="fixed" style={getDialogPosition()}>
              <TutorialContent />
           </div>
       </div>
    </Dialog>
  );
}