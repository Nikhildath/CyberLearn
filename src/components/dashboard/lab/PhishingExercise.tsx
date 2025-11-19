'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Send, ShieldCheck, ShieldOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '../../ui/avatar';

const emails = [
  {
    id: 1,
    sender: 'Your Bank',
    senderEmail: 'secure-alert@yourbank.co.com',
    subject: 'Urgent: Security Alert on Your Account',
    body: `
      <p>Dear Customer,</p>
      <p>We have detected suspicious activity on your account. For your protection, we have temporarily suspended it.</p>
      <p>To restore access, you must verify your identity immediately. Please click the link below to log in and confirm your details.</p>
      <a href="http://yourbank.login-portal.net/verify" class="text-blue-500 underline">Click here to secure your account</a>
      <p>Failure to do so within 24 hours will result in permanent account closure.</p>
      <p>Thank you,<br/>Your Bank Security Team</p>
    `,
    isPhishing: true,
    redFlags: [
      "The sender's email 'yourbank.co.com' is a subdomain, a common trick. Real banks use simple domains like 'yourbank.com'.",
      "The link does not go to the official bank website. Hovering would reveal a suspicious URL.",
      "The email creates a false sense of urgency ('Urgent', 'within 24 hours') to rush you into making a mistake."
    ]
  },
  {
    id: 2,
    sender: 'IT Help Desk',
    senderEmail: 'helpdesk@yourcompany.com',
    subject: 'Scheduled System Maintenance',
    body: `
      <p>Hello team,</p>
      <p>This is a reminder that we will be conducting scheduled system maintenance this Saturday from 10 PM to 2 AM.</p>
      <p>No action is required from you, but services may be intermittent during this period. You can view the full maintenance schedule on the intranet.</p>
      <p>Thank you for your cooperation.</p>
      <p>Best,<br/>IT Department</p>
    `,
    isPhishing: false,
    redFlags: []
  },
  {
    id: 3,
    sender: 'Global Shipping Co.',
    senderEmail: 'tracking-noreply@global-ship.biz',
    subject: 'Your Package Delivery has Failed',
    body: `
        <p>Dear customer,</p>
        <p>We were unable to deliver your package today because the address on file is incorrect. The package is being held at our local depot.</p>
        <p>To schedule a redelivery, please download and fill out the attached form to update your address.</p>
        <p><b>Attachment: Delivery_Form.zip</b></p>
        <p>A fee may be required for redelivery.</p>
        <p>Thank you.</p>
    `,
    isPhishing: true,
    redFlags: [
        "Unexpected emails about package deliveries for items you didn't order are a common scam.",
        "The sender domain 'global-ship.biz' is suspicious. Legitimate companies rarely use '.biz' TLDs.",
        "The email pressures you to download and open a ZIP file, which likely contains malware."
    ]
  }
];

export function PhishingExercise() {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'phishing' | 'safe' | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const { toast } = useToast();
  const currentEmail = emails[currentEmailIndex];

  const handleCheck = (answer: 'phishing' | 'safe') => {
    setSelectedAnswer(answer);
    const isCorrect = (currentEmail.isPhishing && answer === 'phishing') || (!currentEmail.isPhishing && answer === 'safe');
    setResult(isCorrect ? 'correct' : 'incorrect');

    toast({
      title: isCorrect ? 'Correct!' : 'Incorrect!',
      description: isCorrect ? 'Great analysis!' : 'Not quite. Let\'s review why.',
      className: isCorrect ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'
    });
  };

  const handleNext = () => {
    setResult(null);
    setSelectedAnswer(null);
    setCurrentEmailIndex((prev) => (prev + 1) % emails.length);
  };
  
  return (
    <Card className="bg-card/50 border-border/50 shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Phishing Identification Exercise</CardTitle>
        <CardDescription>Analyze the email below. Is it a real email or a phishing attempt?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-border/50 rounded-lg bg-background">
          {/* Email Header */}
          <div className="p-4 border-b border-border/50">
             <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback>{currentEmail.sender.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="font-semibold text-foreground">{currentEmail.sender}</p>
                    <p className="text-sm text-muted-foreground">{`<${currentEmail.senderEmail}>`}</p>
                </div>
             </div>
             <h2 className="text-xl font-bold mt-4">{currentEmail.subject}</h2>
          </div>
          {/* Email Body */}
          <div 
            className="p-4 space-y-4 text-foreground/90 prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: currentEmail.body }}
          />
        </div>

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-card border-2 border-border/50">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {result === 'correct' ? <CheckCircle className="text-green-500"/> : <AlertCircle className="text-red-500"/>}
              Analysis
            </h3>
            {currentEmail.isPhishing ? (
              <>
                <p className="mt-2 text-muted-foreground">This email was a <b className="text-red-400">phishing attempt</b>. Here are the red flags:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                  {currentEmail.redFlags.map((flag, i) => <li key={i}>{flag}</li>)}
                </ul>
              </>
            ) : (
              <p className="mt-2 text-muted-foreground">This email was <b className="text-green-400">safe</b>. It was a standard notification with no suspicious links, urgent demands, or unexpected attachments.</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-4 p-4 border-t border-border/50">
        {!result ? (
          <>
            <Button className="w-full sm:w-1/2 h-12 text-base" variant="destructive" onClick={() => handleCheck('phishing')}>
              <ShieldOff className="mr-2" /> Report as Phishing
            </Button>
            <Button className="w-full sm:w-1/2 h-12 text-base" variant="default" onClick={() => handleCheck('safe')}>
              <ShieldCheck className="mr-2" /> Mark as Safe
            </Button>
          </>
        ) : (
          <Button className="w-full h-12 text-base" onClick={handleNext}>
            Next Email <Send className="ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
