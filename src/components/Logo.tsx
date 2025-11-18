import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xl font-bold font-headline tracking-wider',
        className
      )}
    >
      <ShieldCheck className="h-7 w-7 text-current" />
      <span>CyberLearn</span>
    </div>
  );
}
