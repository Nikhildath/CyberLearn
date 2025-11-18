'use client';

import React, { useRef, useEffect } from 'react';
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

const colors = [
  'rgba(59, 130, 246, 0.8)', // blue-500
  'rgba(37, 99, 235, 0.8)', // blue-600
  'rgba(29, 78, 216, 0.8)', // blue-700
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
    canvas.width = 192;
    canvas.height = 192;

    const init = () => {
      particlesArray.current = [];
      const radius = 60; // radius of the circle
      const numParticles = 100;
      for (let i = 0; i < numParticles; i++) {
        const angle = (i / numParticles) * Math.PI * 2;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;
        particlesArray.current.push({
          x,
          y,
          size: Math.random() * 1.5 + 1,
          baseX: x,
          baseY: y,
          density: (Math.random() * 30) + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            p.x = p.baseX + Math.cos(angle) * 10;
            p.y = p.baseY + Math.sin(angle) * 10;
        } else if (state === 'speaking') {
            const ampFactor = amplitude / 128; // Normalize amplitude
            const angle = (i / particlesArray.current.length) * Math.PI * 2;
            const newRadius = 60 + ampFactor * 20 + Math.sin(Date.now() / 200 + i) * 5;
            p.x = canvas.width / 2 + Math.cos(angle) * newRadius;
            p.y = canvas.height / 2 + Math.sin(angle) * newRadius;
        } else if (state === 'thinking') {
             const angle = Date.now() / 500 + i;
             const radius = 60 + Math.sin(angle * (i % 5 + 1)) * 10;
             p.x = canvas.width / 2 + Math.cos(Date.now() / 1000 + i) * radius;
             p.y = canvas.height / 2 + Math.sin(Date.now() / 1000 + i) * radius;
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
        const rect = canvas.getBoundingClientRect();
        mouse.current.x = event.clientX - rect.left;
        mouse.current.y = event.clientY - rect.top;
    };
    
    init();
    animate();

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [state, amplitude]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};
