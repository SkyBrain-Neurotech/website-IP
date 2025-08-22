import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Neuron {
  x: number;
  y: number;
  size: number;
  charge: number;
  connections: number[];
  fireTime: number;
  isActive: boolean;
  id: number;
  layer: number;
  baseActivity: number;
}

interface Signal {
  fromNeuron: number;
  toNeuron: number;
  progress: number;
  intensity: number;
  speed: number;
  id: number;
}

const InteractiveNeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const neuronsRef = useRef<Neuron[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const lastInteractionRef = useRef<number>(0);

  const createNeuralNetwork = useCallback((width: number, height: number) => {
    const neurons: Neuron[] = [];
    const layers = 4;
    const neuronsPerLayer = [8, 12, 10, 6]; // Different densities per layer
    
    // Create layered network structure
    for (let layer = 0; layer < layers; layer++) {
      const layerNeurons = neuronsPerLayer[layer];
      const layerX = (width / (layers + 1)) * (layer + 1);
      
      for (let i = 0; i < layerNeurons; i++) {
        const angle = (i / layerNeurons) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.15 + Math.random() * 50;
        const centerY = height / 2;
        
        neurons.push({
          x: layerX + Math.cos(angle) * radius * 0.3,
          y: centerY + Math.sin(angle) * radius,
          size: 3 + Math.random() * 6,
          charge: Math.random(),
          connections: [],
          fireTime: 0,
          isActive: false,
          id: neurons.length,
          layer,
          baseActivity: 0.02 + Math.random() * 0.08
        });
      }
    }

    // Create intelligent connections (layer-to-layer + some random)
    neurons.forEach((neuron, i) => {
      neurons.forEach((otherNeuron, j) => {
        if (i !== j) {
          const dx = neuron.x - otherNeuron.x;
          const dy = neuron.y - otherNeuron.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Layer-to-layer connections (forward propagation)
          const isLayerConnection = Math.abs(neuron.layer - otherNeuron.layer) === 1;
          
          // Random local connections
          const isLocalConnection = distance < 120 && Math.random() < 0.4;
          
          if ((isLayerConnection && Math.random() < 0.6) || isLocalConnection) {
            neuron.connections.push(j);
          }
        }
      });
    });

    return neurons;
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

    // Stimulate nearby neurons
    neuronsRef.current.forEach((neuron) => {
      const dx = neuron.x - x;
      const dy = neuron.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        neuron.charge += (100 - distance) / 100 * 0.3;
        if (neuron.charge > 1 && !neuron.isActive) {
          neuron.isActive = true;
          neuron.fireTime = performance.now();
          neuron.charge = 0;
          
          // Create cascading signals
          neuron.connections.forEach(targetIndex => {
            signalsRef.current.push({
              fromNeuron: neuron.id,
              toNeuron: targetIndex,
              progress: 0,
              intensity: 0.8 + Math.random() * 0.4,
              speed: 0.015 + Math.random() * 0.025,
              id: Date.now() + Math.random()
            });
          });
        }
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
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      canvas.style.width = canvas.offsetWidth + 'px';
      canvas.style.height = canvas.offsetHeight + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      neuronsRef.current = createNeuralNetwork(canvas.offsetWidth, canvas.offsetHeight);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      const now = performance.now();
      
      // Fade interaction state
      if (now - lastInteractionRef.current > 2000) {
        setIsInteracting(false);
      }

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update neurons
      neuronsRef.current.forEach((neuron) => {
        // Natural charge buildup
        neuron.charge += neuron.baseActivity;
        
        // Random firing
        if (neuron.charge > 1 && !neuron.isActive && Math.random() < 0.001) {
          neuron.isActive = true;
          neuron.fireTime = now;
          
          neuron.connections.forEach(targetIndex => {
            signalsRef.current.push({
              fromNeuron: neuron.id,
              toNeuron: targetIndex,
              progress: 0,
              intensity: 0.6 + Math.random() * 0.4,
              speed: 0.01 + Math.random() * 0.02,
              id: Date.now() + Math.random()
            });
          });
          
          neuron.charge = 0;
        }

        // Reset firing state
        if (neuron.isActive && now - neuron.fireTime > 400) {
          neuron.isActive = false;
        }

        // Draw connections
        neuron.connections.forEach(targetIndex => {
          const target = neuronsRef.current[targetIndex];
          if (!target) return;
          
          const opacity = neuron.isActive ? 0.6 : 0.15;
          const gradient = ctx.createLinearGradient(neuron.x, neuron.y, target.x, target.y);
          gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity})`);
          gradient.addColorStop(1, `rgba(107, 70, 255, ${opacity * 0.5})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = neuron.isActive ? 2 : 0.8;
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });

        // Draw neuron
        const glowIntensity = neuron.isActive ? 1 : neuron.charge * 0.7;
        const size = neuron.size + (neuron.isActive ? 3 : 0);

        // Glow effect
        const glowGradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, size * 4);
        glowGradient.addColorStop(0, `rgba(0, 212, 255, ${glowIntensity * 0.4})`);
        glowGradient.addColorStop(0.5, `rgba(107, 70, 255, ${glowIntensity * 0.2})`);
        glowGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        const coreGradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, size);
        coreGradient.addColorStop(0, `rgba(0, 212, 255, ${0.8 + glowIntensity * 0.2})`);
        coreGradient.addColorStop(1, `rgba(107, 70, 255, ${0.4 + glowIntensity * 0.4})`);
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Pulse ring for active neurons
        if (neuron.isActive) {
          const pulseSize = size + Math.sin((now - neuron.fireTime) * 0.01) * 6;
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.8 - (now - neuron.fireTime) / 400})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, pulseSize, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Update and draw signals
      signalsRef.current.forEach((signal, i) => {
        signal.progress += signal.speed;

        if (signal.progress >= 1) {
          const targetNeuron = neuronsRef.current[signal.toNeuron];
          if (targetNeuron) {
            targetNeuron.charge += 0.4;
          }
          signalsRef.current.splice(i, 1);
          return;
        }

        const fromNeuron = neuronsRef.current[signal.fromNeuron];
        const toNeuron = neuronsRef.current[signal.toNeuron];
        
        if (!fromNeuron || !toNeuron) return;

        const currentX = fromNeuron.x + (toNeuron.x - fromNeuron.x) * signal.progress;
        const currentY = fromNeuron.y + (toNeuron.y - fromNeuron.y) * signal.progress;

        // Draw signal trail
        const trailLength = 20;
        for (let j = 0; j < trailLength; j++) {
          const trailProgress = Math.max(0, signal.progress - j * 0.025);
          if (trailProgress <= 0) continue;

          const trailX = fromNeuron.x + (toNeuron.x - fromNeuron.x) * trailProgress;
          const trailY = fromNeuron.y + (toNeuron.y - fromNeuron.y) * trailProgress;
          const trailOpacity = signal.intensity * (1 - j / trailLength) * 0.9;
          const trailSize = 4 - j * 0.15;

          const signalGradient = ctx.createRadialGradient(trailX, trailY, 0, trailX, trailY, trailSize * 2);
          signalGradient.addColorStop(0, `rgba(255, 255, 255, ${trailOpacity})`);
          signalGradient.addColorStop(0.5, `rgba(0, 212, 255, ${trailOpacity * 0.8})`);
          signalGradient.addColorStop(1, `rgba(107, 70, 255, ${trailOpacity * 0.3})`);

          ctx.fillStyle = signalGradient;
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw interaction indicator
      if (isInteracting) {
        const pulseRadius = 30 + Math.sin(now * 0.005) * 10;
        const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, pulseRadius);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [createNeuralNetwork, handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-none"
      style={{ 
        background: 'transparent',
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default InteractiveNeuralNetwork;