import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  energy: number;
  trail: { x: number; y: number; opacity: number }[];
}

interface EnergyWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  intensity: number;
  age: number;
  maxAge: number;
}

const InteractiveParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const energyWavesRef = useRef<EnergyWave[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const createParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(150, Math.floor((width * height) / 8000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7,
        hue: 180 + Math.random() * 100, // Blue to purple range
        energy: Math.random(),
        trail: []
      });
    }

    return particles;
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setMousePos({ x, y });
    setIsInteracting(true);

    // Create energy wave on movement
    if (Math.random() < 0.3) {
      energyWavesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 80 + Math.random() * 40,
        intensity: 0.8,
        age: 0,
        maxAge: 1000
      });
    }

    // Affect nearby particles
    particlesRef.current.forEach(particle => {
      const distance = Math.hypot(particle.x - x, particle.y - y);
      if (distance < 150) {
        const force = (1 - distance / 150) * 0.02;
        const angle = Math.atan2(particle.y - y, particle.x - x);
        particle.vx += Math.cos(angle) * force;
        particle.vy += Math.sin(angle) * force;
        particle.energy = Math.min(1, particle.energy + force * 2);
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsInteracting(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      particlesRef.current = createParticles(window.innerWidth, window.innerHeight);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and render energy waves
      energyWavesRef.current = energyWavesRef.current.filter(wave => {
        wave.age += 16;
        wave.radius += (wave.maxRadius - wave.radius) * 0.1;
        
        if (wave.age >= wave.maxAge) return false;

        const alpha = (1 - wave.age / wave.maxAge) * wave.intensity;
        
        // Wave ring
        ctx.strokeStyle = `hsla(200, 100%, 60%, ${alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Wave fill
        const gradient = ctx.createRadialGradient(
          wave.x, wave.y, 0,
          wave.x, wave.y, wave.radius
        );
        gradient.addColorStop(0, `hsla(200, 100%, 60%, ${alpha * 0.1})`);
        gradient.addColorStop(1, `hsla(200, 100%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Update and render particles
      particlesRef.current.forEach(particle => {
        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.energy });
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Decay energy
        particle.energy *= 0.995;

        // Boundary conditions
        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -0.8;
        
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));

        // Render trail
        particle.trail.forEach((point, index) => {
          const trailOpacity = (index / particle.trail.length) * particle.energy * 0.3;
          const trailSize = particle.size * (index / particle.trail.length);
          
          ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${trailOpacity})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fill();
        });

        // Render particle
        const currentOpacity = particle.opacity * (0.5 + particle.energy * 0.5);
        const currentSize = particle.size * (1 + particle.energy);

        // Particle glow
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize * 3
        );
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${currentOpacity * 0.8})`);
        glowGradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 80%, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mouse interaction visualization
      if (isInteracting) {
        const time = performance.now() * 0.005;
        const pulseRadius = 30 + Math.sin(time) * 10;
        
        const mouseGradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, pulseRadius
        );
        mouseGradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
        mouseGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        ctx.fillStyle = mouseGradient;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [createParticles, handleMouseMove, handleMouseLeave, isInteracting]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-5"
      style={{
        opacity: 0.6,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default InteractiveParticleField;