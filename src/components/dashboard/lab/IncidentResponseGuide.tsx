
'use client';

import {
  AlertTriangle,
  WifiOff,
  KeyRound,
  ShieldCheck,
  Bell,
  Trash2,
  Undo2,
  Scan,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

const steps = [
  {
    icon: WifiOff,
    title: '1. Disconnect Immediately',
    description: 'Unplug the ethernet cable or turn off Wi-Fi on the compromised device to prevent the attacker from causing more damage or spreading malware to other devices on your network.',
  },
  {
    icon: KeyRound,
    title: '2. Secure Your Key Accounts',
    description: 'From a different, trusted device, change the passwords for your most critical accounts (email, banking, password manager). Prioritize accounts that were open or used on the hacked device.',
  },
  {
    icon: Scan,
    title: '3. Scan for Malware',
    description: 'Run a full, deep scan using reputable antivirus and anti-malware software. Let it quarantine or remove any threats it finds. Do this before reconnecting to the internet.',
  },
  {
    icon: Bell,
    title: '4. Notify Relevant Parties',
    description: 'If it\'s a work device, notify your IT department immediately. For financial breaches, contact your bank or credit card company. This can help them prevent fraudulent charges.',
  },
  {
    icon: Undo2,
    title: '5. Restore from Backup',
    description: 'If your files were encrypted by ransomware or corrupted, the safest way to recover is to restore them from a recent backup that you know is clean.',
  },
  {
    icon: Trash2,
    title: '6. Consider Wiping the Device',
    description: 'For severe infections, the only way to be 100% sure the malware is gone is to completely wipe the device and reinstall the operating system from scratch. It\'s a drastic but effective step.',
  },
];

export function IncidentResponseGuide() {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-destructive">What To Do If You're Hacked</CardTitle>
        <CardDescription>Follow these steps immediately if you suspect a security breach.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive flex-shrink-0">
              <step.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
