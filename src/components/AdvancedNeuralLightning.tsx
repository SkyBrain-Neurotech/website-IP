import React, { useEffect, useRef, useState, useCallback } from 'react';

interface NeuralNode {
  x: number;
  y: number;
  charge: number;
  maxCharge: number;
  isActive: boolean;
  connections: number[];
  lastFired: number;
  region: 'frontal' | 'parietal' | 'temporal' | 'occipital' | 'cerebellum';
  baseX?: number;
  baseY?: number;
  moveSpeed?: number;
  movePhase?: number;
}

interface LightningBolt {
  segments: { x: number; y: number }[];
  intensity: number;
  age: number;
  maxAge: number;
  thickness: number;
  branches: LightningBolt[];
  fromNode: number;
  toNode: number;
  speed: number;
  color: string;
}

interface ElectricalField {
  x: number;
  y: number;
  radius: number;
  intensity: number;
  age: number;
  maxAge: number;
  pulsePhase: number;
}

interface ExplosionEffect {
  x: number;
  y: number;
  particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[];
  age: number;
  maxAge: number;
}

const AdvancedNeuralLightning = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [mobileTouchActive, setMobileTouchActive] = useState(false);
  const nodesRef = useRef<NeuralNode[]>([]);
  const lightningRef = useRef<LightningBolt[]>([]);
  const electricFieldsRef = useRef<ElectricalField[]>([]);
  const explosionsRef = useRef<ExplosionEffect[]>([]);
  const lastInteractionRef = useRef<number>(0);
  const [brainActivity, setBrainActivity] = useState(0.1);
  const brainActivityRef = useRef<number>(0.1);

  // Create realistic brain-like node distribution with full page coverage
  const createBrainNodes = useCallback((width: number, height: number) => {
    const nodes: NeuralNode[] = [];
    // Elegant constellation pattern - much cleaner
    const regions = [
      // Central constellation hub
      { name: 'frontal', center: { x: 0.5, y: 0.3 }, radius: 0.15, density: 8 },
      // Primary orbital nodes
      { name: 'parietal', center: { x: 0.3, y: 0.4 }, radius: 0.08, density: 4 },
      { name: 'parietal', center: { x: 0.7, y: 0.4 }, radius: 0.08, density: 4 },
      { name: 'temporal', center: { x: 0.2, y: 0.6 }, radius: 0.06, density: 3 },
      { name: 'temporal', center: { x: 0.8, y: 0.6 }, radius: 0.06, density: 3 },
      // Corner accent points
      { name: 'occipital', center: { x: 0.15, y: 0.15 }, radius: 0.04, density: 2 },
      { name: 'occipital', center: { x: 0.85, y: 0.15 }, radius: 0.04, density: 2 },
      { name: 'cerebellum', center: { x: 0.15, y: 0.85 }, radius: 0.04, density: 2 },
      { name: 'cerebellum', center: { x: 0.85, y: 0.85 }, radius: 0.04, density: 2 }
    ];

    regions.forEach(region => {
      for (let i = 0; i < region.density; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * region.radius;
        const x = (region.center.x + Math.cos(angle) * distance) * width;
        const y = (region.center.y + Math.sin(angle) * distance) * height;

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          nodes.push({
            x,
            y,
            charge: Math.random() * 0.3,
            maxCharge: 0.8 + Math.random() * 0.4,
            isActive: false,
            connections: [],
            lastFired: 0,
            region: region.name as string
          });
        }
      }
    });

    // Create intelligent connections with long-range connectivity for full page coverage
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
          const maxShortDistance = node.region === otherNode.region ? 150 : 250;
          const maxLongDistance = Math.min(width, height) * 0.8; // Long-range connections
          
          if (distance < maxShortDistance) {
            const connectionProbability = node.region === otherNode.region ? 0.8 : 0.3;
            if (Math.random() < connectionProbability) {
              node.connections.push(j);
            }
          } else if (distance < maxLongDistance) {
            // Selective long-range connections for elegant spanning
            const longRangeProbability = 0.02;
            if (Math.random() < longRangeProbability) {
              node.connections.push(j);
            }
          }
        }
      });
    });

    return nodes;
  }, []);

  // Create explosion effect at connection points
  const createExplosion = useCallback((x: number, y: number, intensity = 1) => {
    const particleCount = 8 + Math.floor(intensity * 4);
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 3 * intensity;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 30 + Math.random() * 20,
        size: 1 + Math.random() * 2 * intensity
      });
    }
    
    explosionsRef.current.push({
      x,
      y,
      particles,
      age: 0,
      maxAge: 60
    });
  }, []);

  // Generate realistic lightning-like path with fractal branching
  const generateLightningPath = useCallback((startX: number, startY: number, endX: number, endY: number, generations = 3): { x: number; y: number }[] => {
    const path = [{ x: startX, y: startY }];
    const distance = Math.hypot(endX - startX, endY - startY);
    const segments = Math.max(6, Math.floor(distance / 30)); // More segments for longer distances
    
    for (let i = 1; i < segments; i++) {
      const progress = i / segments;
      const baseX = startX + (endX - startX) * progress;
      const baseY = startY + (endY - startY) * progress;
      
      // Enhanced lightning randomness with fractal-like behavior
      const maxDeviation = Math.min(40, distance * 0.08) * (1 - Math.abs(progress - 0.5) * 1.5);
      const deviationX = (Math.random() - 0.5) * maxDeviation;
      const deviationY = (Math.random() - 0.5) * maxDeviation;
      
      // Add some perpendicular bias for more realistic lightning
      const perpX = -(endY - startY) / distance;
      const perpY = (endX - startX) / distance;
      const perpStrength = (Math.random() - 0.5) * maxDeviation * 0.7;
      
      path.push({
        x: baseX + deviationX + perpX * perpStrength,
        y: baseY + deviationY + perpY * perpStrength
      });
    }
    
    path.push({ x: endX, y: endY });
    return path;
  }, []);

  // Create lightning bolt with branches
  const createLightningBolt = useCallback((fromIdx: number, toIdx: number, intensity = 1) => {
    const fromNode = nodesRef.current[fromIdx];
    const toNode = nodesRef.current[toIdx];
    if (!fromNode || !toNode) return;

    const mainPath = generateLightningPath(fromNode.x, fromNode.y, toNode.x, toNode.y);
    const color = fromNode.region === 'frontal' ? '#00D4FF' : '#6B46FF';
    
    const bolt: LightningBolt = {
      segments: mainPath,
      intensity: intensity * (0.8 + Math.random() * 0.4),
      age: 0,
      maxAge: 150 + Math.random() * 100,
      thickness: 2 + intensity * 3,
      branches: [],
      fromNode: fromIdx,
      toNode: toIdx,
      speed: 0.06 + Math.random() * 0.04,
      color
    };

    // Create branches (25% chance)
    if (Math.random() < 0.25 && mainPath.length > 4) {
      const branchPoint = Math.floor(mainPath.length * (0.3 + Math.random() * 0.4));
      const branchStart = mainPath[branchPoint];
      
      // Find a random nearby node for branching
      const nearbyNodes = nodesRef.current
        .map((node, idx) => ({ node, idx, distance: Math.hypot(node.x - branchStart.x, node.y - branchStart.y) }))
        .filter(item => item.distance > 30 && item.distance < 150 && item.idx !== fromIdx && item.idx !== toIdx)
        .sort((a, b) => a.distance - b.distance);
      
      if (nearbyNodes.length > 0) {
        const branchTarget = nearbyNodes[Math.floor(Math.random() * Math.min(3, nearbyNodes.length))];
        const branchPath = generateLightningPath(branchStart.x, branchStart.y, branchTarget.node.x, branchTarget.node.y);
        
        bolt.branches.push({
          segments: branchPath,
          intensity: intensity * 0.6,
          age: 0,
          maxAge: 100,
          thickness: 1 + intensity,
          branches: [],
          fromNode: fromIdx,
          toNode: branchTarget.idx,
          speed: 0.08,
          color
        });
      }
    }

    lightningRef.current.push(bolt);

    // Create explosion effect at target node
    createExplosion(toNode.x, toNode.y, intensity);

    // Create enhanced electrical field at the target with better glow
    electricFieldsRef.current.push({
      x: toNode.x,
      y: toNode.y,
      radius: 25 + intensity * 35,
      intensity: intensity,
      age: 0,
      maxAge: 250,
      pulsePhase: 0
    });
  }, [generateLightningPath, createExplosion]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setMousePos({ x, y });
    setIsInteracting(true);
    lastInteractionRef.current = performance.now();

    // More intelligent stimulation with cascading effects
    const stimulationRadius = 120;
    const stimulatedNodes: number[] = [];
    
    nodesRef.current.forEach((node, idx) => {
      const distance = Math.hypot(node.x - x, node.y - y);
      if (distance < stimulationRadius) {
        const stimulation = (1 - distance / stimulationRadius) * 0.08; // Even more subtle
        node.charge = Math.min(node.maxCharge, node.charge + stimulation);
        if (stimulation > 0.05) {
          stimulatedNodes.push(idx);
        }
      }
    });

    // Create cascading lightning occasionally (very reduced frequency)
    if (Math.random() < 0.025 && stimulatedNodes.length > 1) {
      const sourceIdx = stimulatedNodes[Math.floor(Math.random() * stimulatedNodes.length)];
      const targetIdx = stimulatedNodes[Math.floor(Math.random() * stimulatedNodes.length)];
      
      if (sourceIdx !== targetIdx) {
        createLightningBolt(sourceIdx, targetIdx, 0.6);
      }
    }
  }, [createLightningBolt]);

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
      
      nodesRef.current = createBrainNodes(window.innerWidth, window.innerHeight);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      const now = performance.now();
      
      // Fade interaction state
      if (now - lastInteractionRef.current > 1000) {
        setIsInteracting(false);
      }

      // Dynamic brain activity using ref to avoid state updates in animation loop
      const target = isInteracting ? 0.3 : 0.1;
      brainActivityRef.current = brainActivityRef.current + (target - brainActivityRef.current) * 0.05;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and render electrical fields
      electricFieldsRef.current = electricFieldsRef.current.filter(field => {
        field.age += 16;
        field.pulsePhase += 0.1;
        
        if (field.age >= field.maxAge) return false;

        const alpha = (1 - field.age / field.maxAge) * field.intensity;
        const currentRadius = field.radius * (1 + Math.sin(field.pulsePhase) * 0.3);
        
        // Enhanced electrical field glow with multiple layers
        // Outer glow
        const outerGradient = ctx.createRadialGradient(
          field.x, field.y, 0,
          field.x, field.y, currentRadius * 1.5
        );
        outerGradient.addColorStop(0, `rgba(0, 212, 255, ${alpha * 0.4})`);
        outerGradient.addColorStop(0.3, `rgba(107, 70, 255, ${alpha * 0.3})`);
        outerGradient.addColorStop(0.7, `rgba(0, 212, 255, ${alpha * 0.1})`);
        outerGradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
        
        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(field.x, field.y, currentRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        const innerGradient = ctx.createRadialGradient(
          field.x, field.y, 0,
          field.x, field.y, currentRadius * 0.5
        );
        innerGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.6})`);
        innerGradient.addColorStop(0.5, `rgba(0, 212, 255, ${alpha * 0.4})`);
        innerGradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
        
        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.arc(field.x, field.y, currentRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Update and render explosion effects
      explosionsRef.current = explosionsRef.current.filter(explosion => {
        explosion.age += 16;
        if (explosion.age >= explosion.maxAge) return false;

        explosion.particles.forEach(particle => {
          particle.life += 16;
          if (particle.life >= particle.maxLife) return;

          // Update particle position
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.98; // Slight friction
          particle.vy *= 0.98;

          // Render particle
          const particleAlpha = (1 - particle.life / particle.maxLife) * 0.8;
          const particleSize = particle.size * (1 - particle.life / particle.maxLife);
          
          // Particle glow
          const particleGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particleSize * 3
          );
          particleGradient.addColorStop(0, `rgba(255, 255, 255, ${particleAlpha})`);
          particleGradient.addColorStop(0.5, `rgba(0, 212, 255, ${particleAlpha * 0.7})`);
          particleGradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
          
          ctx.fillStyle = particleGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particleSize * 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Bright core
          ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
          ctx.fill();
        });

        return true;
      });

      // Update nodes
      nodesRef.current.forEach((node, idx) => {
        // Natural charge buildup based on brain activity
        node.charge += brainActivityRef.current * (0.015 + Math.random() * 0.025);
        
        // Fire when charged
        if (node.charge >= node.maxCharge && !node.isActive && now - node.lastFired > 200) {
          node.isActive = true;
          node.lastFired = now;
          node.charge = 0;
          
          // Create lightning to connected nodes with intelligent selection
          const connectionCount = Math.min(4, node.connections.length);
          const usedConnections = new Set<number>();
          
          for (let i = 0; i < connectionCount; i++) {
            const availableConnections = node.connections.filter(conn => !usedConnections.has(conn));
            if (availableConnections.length === 0) break;
            
            const targetIdx = availableConnections[Math.floor(Math.random() * availableConnections.length)];
            usedConnections.add(targetIdx);
            
            const distance = Math.hypot(
              node.x - nodesRef.current[targetIdx].x,
              node.y - nodesRef.current[targetIdx].y
            );
            
            // Stronger intensity for longer connections (more dramatic)
            const intensityBonus = distance > 300 ? 0.4 : 0;
            createLightningBolt(idx, targetIdx, 0.7 + Math.random() * 0.6 + intensityBonus);
          }
        }

        // Reset active state
        if (node.isActive && now - node.lastFired > 100) {
          node.isActive = false;
        }

        // Render node with subtlety
        const nodeIntensity = node.isActive ? 1 : node.charge / node.maxCharge;
        if (nodeIntensity > 0.2) { // Higher threshold for cleaner look
          const nodeSize = 1 + nodeIntensity * 2; // Smaller nodes
          const alpha = nodeIntensity * 0.4; // Much more subtle
          
          // Subtle node glow
          const nodeGradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, nodeSize * 2
          );
          nodeGradient.addColorStop(0, `rgba(0, 212, 255, ${alpha * 0.6})`);
          nodeGradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
          
          ctx.fillStyle = nodeGradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Minimal node core
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Update and render lightning bolts
      lightningRef.current = lightningRef.current.filter(bolt => {
        bolt.age += 16;
        if (bolt.age >= bolt.maxAge) return false;

        const renderBolt = (lightning: LightningBolt) => {
          const alpha = (1 - lightning.age / lightning.maxAge) * lightning.intensity;
          
          // Enhanced outer glow
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.15})`;
          ctx.lineWidth = lightning.thickness * 2.5;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 15;
          ctx.shadowColor = lightning.color;
          
          ctx.beginPath();
          lightning.segments.forEach((segment, i) => {
            if (i === 0) {
              ctx.moveTo(segment.x, segment.y);
            } else {
              ctx.lineTo(segment.x, segment.y);
            }
          });
          ctx.stroke();
          
          // Bright lightning core
          ctx.strokeStyle = lightning.color + Math.floor(alpha * 180).toString(16).padStart(2, '0');
          ctx.lineWidth = lightning.thickness * 0.8;
          ctx.shadowBlur = 8;
          ctx.shadowColor = lightning.color;
          
          ctx.beginPath();
          lightning.segments.forEach((segment, i) => {
            if (i === 0) {
              ctx.moveTo(segment.x, segment.y);
            } else {
              ctx.lineTo(segment.x, segment.y);
            }
          });
          ctx.stroke();
          
          // Ultra-bright inner core
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          ctx.lineWidth = lightning.thickness * 0.3;
          ctx.shadowBlur = 2;
          ctx.shadowColor = '#FFFFFF';
          ctx.stroke();
          
          // Reset shadow
          ctx.shadowBlur = 0;
          
          // Render branches
          lightning.branches.forEach(branch => {
            branch.age += 16;
            if (branch.age < branch.maxAge) {
              renderBolt(branch);
            }
          });
        };

        renderBolt(bolt);
        return true;
      });

      // Very subtle brain activity with wave patterns
      if (Math.random() < brainActivityRef.current * 0.3) { // Extremely infrequent firing
        const randomNode = Math.floor(Math.random() * nodesRef.current.length);
        nodesRef.current[randomNode].charge += 0.2;
        
        // Create subtle brain waves - stimulate nearby nodes in sequence
        if (Math.random() < 0.25) { // Much less frequent waves
          const waveCenter = nodesRef.current[randomNode];
          const waveRadius = 200 + Math.random() * 150;
          
          nodesRef.current.forEach((node, idx) => {
            const distance = Math.hypot(node.x - waveCenter.x, node.y - waveCenter.y);
            if (distance < waveRadius && idx !== randomNode) {
              const delay = (distance / waveRadius) * 1000; // Propagation delay
              setTimeout(() => {
                if (nodesRef.current[idx]) {
                  nodesRef.current[idx].charge += 0.15 * (1 - distance / waveRadius);
                }
              }, delay);
            }
          });
        }
      }

      // Mouse interaction indicator
      if (isInteracting) {
        const pulseRadius = 40 + Math.sin(now * 0.03) * 15;
        const gradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, pulseRadius
        );
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
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [createBrainNodes, handleMouseMove, handleMouseLeave, createLightningBolt, isInteracting]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #0A0A23 0%, #1E1E3F 50%, #0A0A23 100%)',
        width: '100vw',
        height: '100vh',
        opacity: 0.15 // Even more subtle overall effect
      }}
    />
  );
};

export default AdvancedNeuralLightning;