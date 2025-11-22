
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const packets = [
  { no: 1, time: '0.000000', source: '192.168.1.101', dest: '8.8.8.8', protocol: 'DNS', info: 'Standard query 0x1a7a A www.google.com' },
  { no: 2, time: '0.025134', source: '8.8.8.8', dest: '192.168.1.101', protocol: 'DNS', info: 'Standard query response 0x1a7a A 142.250.191.196' },
  { no: 3, time: '0.025501', source: '192.168.1.101', dest: '142.250.191.196', protocol: 'TCP', info: '8080 > 443 [SYN]' },
  { no: 4, time: '0.050211', source: '142.250.191.196', dest: '192.168.1.101', protocol: 'TCP', info: '443 > 8080 [SYN, ACK]' },
  { no: 5, time: '0.050245', source: '192.168.1.101', dest: '142.250.191.196', protocol: 'TCP', info: '8080 > 443 [ACK]' },
  { no: 6, time: '0.051345', source: '192.168.1.101', dest: '142.250.191.196', protocol: 'TLSv1.2', info: 'Client Hello' },
  { no: 7, time: '1.234567', source: '10.0.0.5', dest: '192.168.1.101', protocol: 'FTP', info: 'Request: USER anonymous', isMalicious: false },
  { no: 8, time: '1.543210', source: '192.168.1.101', dest: '10.0.0.5', protocol: 'FTP', info: 'Response: 331 Please specify the password.' },
  { no: 9, time: '2.345678', source: '172.16.31.10', dest: '192.168.1.101', protocol: 'HTTP', info: 'GET /login.php?user=admin&pass=admin', isMalicious: true },
  { no: 10, time: '3.123456', source: '192.168.1.101', dest: '172.16.31.10', protocol: 'HTTP', info: 'HTTP/1.1 200 OK' }
];

const correctPacketNo = 9;

export function WiresharkChallenge() {
  const [selectedPacket, setSelectedPacket] = useState<number | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const { toast } = useToast();

  const handleSelectPacket = (packetNo: number) => {
    if (result) return;
    setSelectedPacket(packetNo);
  };
  
  const handleCheck = () => {
    if (!selectedPacket) {
        toast({ title: 'Please select a packet to investigate.', variant: 'destructive' });
        return;
    }
    const isCorrect = selectedPacket === correctPacketNo;
    setResult(isCorrect ? 'correct' : 'incorrect');

     toast({
      title: isCorrect ? 'Threat Identified!' : 'Incorrect.',
      description: isCorrect ? 'You correctly found the suspicious packet.' : 'That packet seems normal. Try again.',
      className: isCorrect ? 'text-green-800 bg-green-50 border-green-200' : 'text-red-800 bg-red-50 border-red-200'
    });
  };

  const handleReset = () => {
    setResult(null);
    setSelectedPacket(null);
  };
  
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Network Traffic Analysis</CardTitle>
        <CardDescription>You are a security analyst monitoring network traffic. Inspect the packets below and identify the one that contains a potential threat.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg overflow-hidden bg-background">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="w-[50px]">No.</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Protocol</TableHead>
                        <TableHead>Info</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {packets.map((packet) => (
                        <TableRow 
                            key={packet.no} 
                            onClick={() => handleSelectPacket(packet.no)}
                            className={cn(
                                !result && "cursor-pointer",
                                selectedPacket === packet.no && !result && "bg-primary/10",
                                result && packet.no === correctPacketNo && "bg-green-500/10",
                                result && selectedPacket === packet.no && packet.no !== correctPacketNo && "bg-red-500/10"
                            )}
                        >
                            <TableCell>{packet.no}</TableCell>
                            <TableCell className="font-mono text-xs">{packet.source}</TableCell>
                            <TableCell className="font-mono text-xs">{packet.dest}</TableCell>
                            <TableCell><Badge variant={packet.protocol === 'HTTP' || packet.protocol === 'FTP' ? 'destructive' : 'secondary'}>{packet.protocol}</Badge></TableCell>
                            <TableCell className="font-mono text-xs">{packet.info}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        
        {result && (
          <div className="mt-4 p-4 rounded-lg bg-card border border-border/50">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {result === 'correct' ? <CheckCircle className="text-green-500"/> : <AlertTriangle className="text-red-500"/>}
              Analysis
            </h3>
            {result === 'correct' ? (
                <p className="mt-2 text-muted-foreground">
                    Correct! Packet #9 is highly suspicious. It's an unencrypted HTTP GET request that contains a username and password ('admin'/'admin') directly in the URL. This is called credential stuffing or a brute-force login attempt and is a major security risk.
                </p>
            ) : (
                 <p className="mt-2 text-muted-foreground">
                    Not quite. The packet you selected appears to be part of a normal network communication. The real threat was in packet #9, which showed an unencrypted login attempt over HTTP. Always be suspicious of credentials sent in cleartext.
                </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
         {!result ? (
          <Button className="w-full h-12 text-base" onClick={handleCheck} disabled={!selectedPacket}>
            Investigate Selected Packet
          </Button>
        ) : (
          <Button className="w-full h-12 text-base" onClick={handleReset} variant="secondary">
            <RefreshCw className="mr-2 h-4 w-4"/> Start New Simulation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
