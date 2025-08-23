import React, { useEffect, useRef, useState, useCallback } from 'react';

interface NeuralFiring {
  x: number;
  y: number;
  intensity: number;
  size: number;
  lifetime: number;
  age: number;
  pulseSpeed: number;
  color: string;
}

interface ElectricalPulse {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  intensity: number;
  id: number;
}

const BrainNeuralFiring = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const neuronsRef = useRef<NeuralFiring[]>([]);
  const pulsesRef = useRef<ElectricalPulse[]>([]);
  const lastInteractionRef = useRef<number>(0);
  const isTabActiveRef = useRef(true);
  const frameCountRef = useRef(0);

  const createRandomFiring = useCallback((width: number, height: number, isMouseTriggered = false, mouseX = 0, mouseY = 0) => {
    const firingCount = isMouseTriggered ? 8 : 3;
    
    for (let i = 0; i < firingCount; i++) {
      let x, y;
      
      if (isMouseTriggered) {
        // Create firings around mouse position
        const angle = (i / firingCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 150;
        x = mouseX + Math.cos(angle) * distance;
        y = mouseY + Math.sin(angle) * distance;
      } else {
        // Random locations across the brain
        x = Math.random() * width;
        y = Math.random() * height;
      }
      
      const firing: NeuralFiring = {
        x,
        y,
        intensity: 0.8 + Math.random() * 0.4,
        size: 3 + Math.random() * 8,
        lifetime: 800 + Math.random() * 1200,
        age: 0,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        color: Math.random() > 0.7 ? '#6B46FF' : '#00D4FF' // Mind purple or neural blue
      };
      
      neuronsRef.current.push(firing);
      
      // Create electrical pulses that spread from this firing
      const pulseCount = 2 + Math.floor(Math.random() * 4);
      for (let j = 0; j < pulseCount; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 300;
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;
        
        pulsesRef.current.push({
          x,
          y,
          targetX,
          targetY,
          progress: 0,
          speed: 0.015 + Math.random() * 0.025,
          intensity: 0.6 + Math.random() * 0.4,
          id: Date.now() + Math.random()
        });
      }
    }
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setMousePos({ x, y });
    setIsInteracting(true);
    lastInteractionRef.current = performance.now();

    // Create neural firings around mouse
    if (Math.random() < 0.3) { // 30% chance per mouse move
      createRandomFiring(canvas.offsetWidth, canvas.offsetHeight, true, x, y);
    }
  }, [createRandomFiring]);

  const handleMouseLeave = useCallback(() => {
    setIsInteracting(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Visibility API to pause when tab is not active
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      canvas.style.width = canvas.offsetWidth + 'px';
      canvas.style.height = canvas.offsetHeight + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Create initial random firings
    createRandomFiring(canvas.offsetWidth, canvas.offsetHeight);

    const animate = () => {
      // Skip animation if tab is not active
      if (!isTabActiveRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Throttle to 30 FPS (skip every other frame)
      frameCountRef.current++;
      if (frameCountRef.current % 2 !== 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      const now = performance.now();
      
      // Fade interaction state
      if (now - lastInteractionRef.current > 3000) {
        setIsInteracting(false);
      }

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw neural firings
      neuronsRef.current = neuronsRef.current.filter((firing) => {
        firing.age += 16; // Approximate 60fps
        
        if (firing.age >= firing.lifetime) {
          return false;
        }

        const lifeRatio = firing.age / firing.lifetime;
        const intensity = firing.intensity * (1 - lifeRatio);
        
        // Create multiple expanding circles for neural firing effect
        for (let ring = 0; ring < 4; ring++) {
          const ringDelay = ring * 0.2;
          const ringProgress = Math.max(0, lifeRatio - ringDelay);
          
          if (ringProgress > 0) {
            const ringSize = firing.size + (ringProgress * 60);
            const ringOpacity = intensity * (1 - ringProgress) * 0.6;
            
            // Outer glow
            const gradient = ctx.createRadialGradient(
              firing.x, firing.y, 0,
              firing.x, firing.y, ringSize * 2
            );
            gradient.addColorStop(0, `${firing.color}${Math.floor(ringOpacity * 80).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(0.5, `${firing.color}${Math.floor(ringOpacity * 40).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${firing.color}00`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(firing.x, firing.y, ringSize * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner core
            ctx.fillStyle = `${firing.color}${Math.floor(ringOpacity * 255).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.arc(firing.x, firing.y, ringSize * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            // Ring border
            ctx.strokeStyle = `${firing.color}${Math.floor(ringOpacity * 120).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(firing.x, firing.y, ringSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        
        return true;
      });

      // Update and draw electrical pulses
      pulsesRef.current = pulsesRef.current.filter((pulse) => {
        pulse.progress += pulse.speed;
        
        if (pulse.progress >= 1) {
          // Create new firing at target location
          if (Math.random() < 0.3) {
            createRandomFiring(canvas.offsetWidth, canvas.offsetHeight, false, pulse.targetX, pulse.targetY);
          }
          return false;
        }

        const currentX = pulse.x + (pulse.targetX - pulse.x) * pulse.progress;
        const currentY = pulse.y + (pulse.targetY - pulse.y) * pulse.progress;
        
        // Draw electrical pulse trail
        const trailLength = 15;
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, pulse.progress - i * 0.04);
          if (trailProgress <= 0) continue;
          
          const trailX = pulse.x + (pulse.targetX - pulse.x) * trailProgress;
          const trailY = pulse.y + (pulse.targetY - pulse.y) * trailProgress;
          const trailOpacity = pulse.intensity * (1 - i / trailLength) * 0.8;
          const trailSize = 4 - i * 0.2;
          
          // Electric spark
          const sparkGradient = ctx.createRadialGradient(
            trailX, trailY, 0,
            trailX, trailY, trailSize * 3
          );
          sparkGradient.addColorStop(0, `#FFFFFF${Math.floor(trailOpacity * 255).toString(16).padStart(2, '0')}`);
          sparkGradient.addColorStop(0.3, `#00D4FF${Math.floor(trailOpacity * 200).toString(16).padStart(2, '0')}`);
          sparkGradient.addColorStop(1, `#6B46FF${Math.floor(trailOpacity * 100).toString(16).padStart(2, '0')}`);
          
          ctx.fillStyle = sparkGradient;
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailSize * 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Core spark
          ctx.fillStyle = `#FFFFFF${Math.floor(trailOpacity * 255).toString(16).padStart(2, '0')}`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }
        
        return true;
      });

      // Randomly create new firings (brain's natural activity)
      if (Math.random() < 0.02) {
        createRandomFiring(canvas.offsetWidth, canvas.offsetHeight);
      }

      // Draw mouse interaction indicator
      if (isInteracting) {
        const pulseRadius = 40 + Math.sin(now * 0.008) * 15;
        const mouseGradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, pulseRadius
        );
        mouseGradient.addColorStop(0, '#00D4FF40');
        mouseGradient.addColorStop(0.7, '#6B46FF20');
        mouseGradient.addColorStop(1, '#00D4FF00');
        
        ctx.fillStyle = mouseGradient;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Mouse cursor ring
        ctx.strokeStyle = '#00D4FF80';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Clear arrays to free memory
      neuronsRef.current = [];
      pulsesRef.current = [];
    };
  }, [createRandomFiring, handleMouseMove, handleMouseLeave]);

  // Don't render on low-power devices
  if (!shouldEnableAnimations(deviceInfo)) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-none"
      style={{ 
        background: 'transparent',
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: deviceInfo.isMobile ? 0.2 : 0.3
      }}
    />
  );
};

export default BrainNeuralFiring;