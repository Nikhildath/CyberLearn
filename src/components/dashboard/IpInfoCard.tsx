'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight } from 'lucide-react';
import { Lesson } from '@/lib/lessons';

type IpData = {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
};

export function IpInfoCard({ lesson, onComplete }: { lesson: Lesson, onComplete: () => void }) {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch IP information.');
        }
        const data = await response.json();
        setIpData({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          org: data.org,
        });
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  return (
    <Card className="flex h-full flex-col border-border/50 bg-card/50 shadow-xl">
      <CardHeader className="flex flex-row items-start gap-4">
        <lesson.Icon className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
        <div>
          <CardTitle className="font-headline text-3xl text-primary">{lesson.title}</CardTitle>
          <CardDescription>Your Public Internet Footprint</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center text-lg text-foreground/90 p-6">
        {loading && <div className="flex items-center justify-center gap-2"><Loader2 className="h-6 w-6 animate-spin" /><span>Fetching your info...</span></div>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {ipData && (
          <div className="space-y-3">
            <p>{lesson.content[0]}</p>
            <p>{lesson.content[1]}</p>
            <div className="border border-border/50 rounded-lg p-4 bg-background/30 space-y-2 my-4">
              <h4 className="font-semibold text-primary">Your Public IP Information:</h4>
              <p className="text-sm"><strong className="w-24 inline-block">IP Address:</strong> {ipData.ip}</p>
              <p className="text-sm"><strong className="w-24 inline-block">Location:</strong> {ipData.city}, {ipData.region}, {ipData.country}</p>
              <p className="text-sm"><strong className="w-24 inline-block">ISP:</strong> {ipData.org}</p>
            </div>
             <p className="text-base text-muted-foreground">{lesson.content[3]}</p>
          </div>
        )}
      </CardContent>
      {ipData && (
         <div className="p-6 pt-0">
             <Button onClick={onComplete} className="w-full">
                Continue to Quiz <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
         </div>
      )}
    </Card>
  );
}
