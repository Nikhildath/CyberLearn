'use client';

import { useState, useEffect } from 'react';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

export function WelcomeTutorial({ open, onComplete }: { open: boolean, onComplete: () => void }) {
  const [step, setStep] = useState(0);

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

  // Effect to switch tabs
  useEffect(() => {
    if (open && currentStep.targetId && currentStep.targetValue) {
      const targetElement = document.getElementById(currentStep.targetId)?.querySelector<HTMLButtonElement>(`[data-value="${currentStep.targetValue}"]`);
      if (targetElement && targetElement.getAttribute('data-state') !== 'active') {
        targetElement.click();
      }
    }
  }, [step, open, currentStep]);


  if (!open) {
    return null;
  }
  
  const TutorialContent = () => (
     <DialogContent className="sm:max-w-md bg-card border-border shadow-2xl">
        <DialogHeader className="items-center text-center">
          <div className="rounded-full bg-primary/10 p-3 border-8 border-primary/5 mb-4">
              <currentStep.icon className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="font-headline text-2xl">{currentStep.title}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground px-4">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row justify-between items-center pt-4">
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
      </DialogContent>
  );

  if (!currentStep.targetId) {
    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onComplete() }}>
            <TutorialContent />
        </Dialog>
    )
  }

  const targetElement = document.getElementById(currentStep.targetId)?.querySelector(`[data-value="${currentStep.targetValue}"]`);
  
  if (!targetElement) {
     return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onComplete() }}>
            <TutorialContent />
        </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onComplete() }}>
       <TooltipProvider>
            <Tooltip open={true}>
                <TooltipTrigger asChild>
                    <div 
                        className="fixed inset-0"
                        style={{
                            top: targetElement?.getBoundingClientRect().top,
                            left: targetElement?.getBoundingClientRect().left,
                            width: targetElement?.getBoundingClientRect().width,
                            height: targetElement?.getBoundingClientRect().height,
                            pointerEvents: 'none',
                            zIndex: 100,
                            boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                            borderRadius: 'var(--radius)',
                        }}
                    />
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center" className="p-0 border-none bg-transparent shadow-none w-[448px] z-[101]">
                    <TutorialContent />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </Dialog>
  );
}
