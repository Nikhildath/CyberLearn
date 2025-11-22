
'use client';

import { useState, useEffect, useRef } from 'react';
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
    const { targetId, targetValue } = currentStep;

    if (targetId) {
        const parentElement = document.getElementById(targetId);
        if (parentElement && targetValue) {
            targetElement = parentElement.querySelector<HTMLButtonElement>(`[data-value="${targetValue}"]`);
            if (targetElement && targetElement.getAttribute('data-state') !== 'active') {
                targetElement.click();
            }
        } else {
             targetElement = document.getElementById(targetId);
        }
    }
    
    const calculateRect = () => {
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
    };
    
    // Give DOM time to update after tab click
    const timeoutId = setTimeout(calculateRect, 150);

    return () => clearTimeout(timeoutId);

  }, [step, open, currentStep]);

  if (!open) {
    return null;
  }
  
  const getDialogPosition = () => {
    if (!targetRect || !dialogContentRef.current) return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };
    
    const dialogHeight = dialogContentRef.current.offsetHeight;
    const dialogWidth = dialogContentRef.current.offsetWidth;
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;

    let top: number;
    if (spaceBelow > dialogHeight + 20) {
        // Position below
        top = targetRect.bottom + 10;
    } else if (spaceAbove > dialogHeight + 20) {
        // Position above
         top = targetRect.top - dialogHeight - 10;
    } else {
        // Fallback to center vertical
        top = window.innerHeight / 2 - dialogHeight / 2;
    }

    let left = targetRect.left + (targetRect.width / 2) - (dialogWidth / 2);
    // clamp left to be within window bounds
    left = Math.max(10, Math.min(left, window.innerWidth - dialogWidth - 10));

    return {
        top: `${top}px`,
        left: `${left}px`,
        transform: 'none',
    }
  }

  const TutorialContent = () => (
     <div ref={dialogContentRef} className="z-[101] w-full max-w-sm bg-card border-border shadow-2xl rounded-lg flex flex-col">
        <div className="p-6 text-center">
          <div className="mx-auto rounded-full bg-primary/10 p-3 border-8 border-primary/5 mb-4 w-fit">
              <currentStep.icon className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-headline text-2xl text-foreground">{currentStep.title}</h2>
          <p className="text-base text-muted-foreground mt-2">
            {currentStep.description}
          </p>
        </div>
        <div className="flex-row justify-between items-center p-4 border-t border-border/50 bg-muted/30 flex rounded-b-lg">
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
        </div>
      </div>
  );

  return (
    <div className="fixed inset-0 z-[100]">
        <div 
            className="absolute inset-0 bg-black/60 transition-all duration-300"
            style={{
                clipPath: targetRect 
                    ? `path('M0 0 H${window.innerWidth} V${window.innerHeight} H0 Z M${targetRect.left - 8} ${targetRect.top - 8} H${targetRect.right + 8} V${targetRect.bottom + 8} H${targetRect.left - 8} Z')`
                    : 'none',
            }}
        />
        <div className="absolute transition-all duration-300" style={getDialogPosition()}>
            <TutorialContent />
        </div>
    </div>
  );
}

    