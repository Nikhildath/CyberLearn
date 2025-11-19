'use client';

import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
}

const colorsLight = [
  'rgba(20, 158, 202, 0.8)', 
  'rgba(14, 116, 144, 0.8)',
  'rgba(22, 163, 74, 0.7)',
  'rgba(50, 50, 50, 0.6)'
];

const colorsSpeaking = [
    'rgba(255, 255, 255, 0.9)',
    'rgba(250, 250, 250, 0.8)',
    'rgba(230, 230, 230, 0.7)',
];

export const ParticleCanvas = ({ state, amplitude }: { state: 'idle' | 'recording' | 'thinking' | 'speaking', amplitude: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesArray = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, radius: 40 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    const canvasSize = 192;
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.scale(dpr, dpr);
    
    // Fill the background of the canvas
    if (state === 'speaking') {
      const gradient = ctx.createRadialGradient(canvasSize/2, canvasSize/2, 0, canvasSize/2, canvasSize/2, canvasSize/2);
      gradient.addColorStop(0, 'hsl(195, 85%, 35%)');
      gradient.addColorStop(1, 'hsl(195, 85%, 25%)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasSize, canvasSize);
    }


    const init = () => {
      particlesArray.current = [];
      const radius = 60; // radius of the circle
      const numParticles = 150;
      const colors = state === 'speaking' ? colorsSpeaking : colorsLight;

      for (let i = 0; i < numParticles; i++) {
        const angle = (i / numParticles) * Math.PI * 2;
        const x = canvasSize / 2 + Math.cos(angle) * radius;
        const y = canvasSize / 2 + Math.sin(angle) * radius;
        particlesArray.current.push({
          x,
          y,
          size: Math.random() * 2 + 1,
          baseX: x,
          baseY: y,
          density: (Math.random() * 30) + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      if (state === 'speaking') {
        const gradient = ctx.createRadialGradient(canvasSize/2, canvasSize/2, 0, canvasSize/2, canvasSize/2, canvasSize/1.5);
        gradient.addColorStop(0, 'hsl(195, 85%, 40%)');
        gradient.addColorStop(1, 'hsl(195, 85%, 30%)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
      }
      
      for (let i = 0; i < particlesArray.current.length; i++) {
        let p = particlesArray.current[i];
        let dx = mouse.current.x - p.x;
        let dy = mouse.current.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.current.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * p.density;
        let directionY = forceDirectionY * force * p.density;

        if (state === 'recording') {
            const angle = Date.now() / 1000 + i;
            const newRadius = 60 + Math.sin(angle * (i % 5 + 1)) * 10;
            p.x = canvasSize / 2 + Math.cos(Date.now() / 800 + i) * newRadius;
            p.y = canvasSize / 2 + Math.sin(Date.now() / 800 + i) * newRadius;
        } else if (state === 'speaking') {
            const ampFactor = amplitude / 128; // Normalize amplitude
            const angle = (i / particlesArray.current.length) * Math.PI * 2;
            const newRadius = 60 + ampFactor * 30 + Math.sin(Date.now() / 200 + i) * 5;
            p.x = canvasSize / 2 + Math.cos(angle + Date.now()/1000) * newRadius;
            p.y = canvasSize / 2 + Math.sin(angle + Date.now()/1000) * newRadius;
        } else if (state === 'thinking') {
             const angle = Date.now() / 500 + i;
             const radius = 60 + Math.sin(angle * (i % 5 + 1)) * 15;
             p.x = canvasSize / 2 + Math.cos(Date.now() / 1000 + i) * radius;
             p.y = canvasSize / 2 + Math.sin(Date.now() / 1000 + i) * radius;
        }
        else { // idle
             if (distance < mouse.current.radius) {
                p.x -= directionX;
                p.y -= directionY;
             } else {
                 if (p.x !== p.baseX) {
                     let dx = p.x - p.baseX;
                     p.x -= dx / 10;
                 }
                 if (p.y !== p.baseY) {
                     let dy = p.y - p.baseY;
                     p.y -= dy / 10;
                 }
             }
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouse.current.x = (event.clientX - rect.left);
        mouse.current.y = (event.clientY - rect.top);
    };
    
    init();
    animate();

    const canvasElem = canvas;
    canvasElem.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasElem.removeEventListener('mousemove', handleMouseMove);
    };
  }, [state, amplitude]);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 transition-all duration-300", state === 'speaking' && "rounded-full")} />;
};
