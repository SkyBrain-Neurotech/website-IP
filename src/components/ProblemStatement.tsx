
import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Clock, Users, TrendingDown, Frown, Brain } from 'lucide-react';

const ProblemStatement = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Neural network for problem visualization
    const neurons: Array<{
      x: number;
      y: number;
      charge: number;
      connections: number[];
      isActive: boolean;
      fireTime: number;
    }> = [];

    // Create neurons
    for (let i = 0; i < 25; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        charge: 0,
        connections: [],
        isActive: false,
        fireTime: 0
      });
    }

    // Connect neurons
    neurons.forEach((neuron, i) => {
      neurons.forEach((_, j) => {
        if (i !== j && Math.random() < 0.2) {
          neuron.connections.push(j);
        }
      });
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      neurons.forEach((neuron, i) => {
        // Slow, irregular firing (representing broken system)
        neuron.charge += 0.003 + Math.random() * 0.002;
        
        if (neuron.charge > 1 && !neuron.isActive && Math.random() < 0.3) {
          neuron.isActive = true;
          neuron.fireTime = performance.now();
          neuron.charge = 0;
        }

        if (neuron.isActive && performance.now() - neuron.fireTime > 500) {
          neuron.isActive = false;
        }

        // Draw weak connections (broken system)
        neuron.connections.forEach(targetIndex => {
          const target = neurons[targetIndex];
          const opacity = neuron.isActive ? 0.2 : 0.05;
          
          ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.setLineDash([3, 6]); // Broken lines
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        // Draw neuron (dim and struggling)
        const intensity = neuron.isActive ? 0.6 : neuron.charge * 0.3;
        
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 2 + intensity * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 116, 139, ${0.2 + intensity * 0.4})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const problems = [
    {
      icon: AlertTriangle,
      title: "Reactive, Not Proactive",
      description: "Mental health care only responds after crisis hits",
      impact: "We suffer in silence until it's too late"
    },
    {
      icon: Clock,
      title: "Always Playing Catch-Up",
      description: "Treatment comes after damage is already done",
      impact: "Missing the golden window for prevention"
    },
    {
      icon: Users,
      title: "One-Size-Fits-All",
      description: "Generic wellness solutions ignore individual needs",
      impact: "What works for others may not work for you"
    },
    {
      icon: TrendingDown,
      title: "Disconnected from Reality",
      description: "Mental health tools don't adapt to your daily life",
      impact: "Static solutions for dynamic human needs"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Neural Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        style={{ background: 'transparent' }}
      />
      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <AlertTriangle className="h-5 w-5 text-neural-gray animate-pulse" />
            <span className="text-sm font-semibold text-neural-gray tracking-wide uppercase font-orbitron">The Current Reality</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">Mental Health is</span>{' '}
            <span className="text-neural-gray font-orbitron relative">
              Broken
              <div className="absolute -inset-1 bg-gradient-to-r from-neural-blue/20 to-neural-gray/20 blur-lg opacity-50 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            We're stuck in an outdated model that waits for problems instead of preventing them.
            <br className="hidden md:block" />
            <span className="text-neural-blue font-semibold">It's time for a revolution.</span>
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {problems.map((problem, index) => (
            <div 
              key={problem.title}
              className="glass-card p-8 group h-full relative overflow-hidden hover:border-neural-blue/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-xl">
                    <problem.icon className="h-8 w-8 text-neural-blue group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-ghost-white mb-4 group-hover:text-neural-blue transition-colors font-orbitron">
                    {problem.title}
                  </h3>
                  <p className="text-neural-gray leading-relaxed mb-6 text-lg">
                    {problem.description}
                  </p>
                  <div className="bg-neural-blue/10 border-l-4 border-neural-blue p-4 rounded-r-lg">
                    <p className="text-neural-blue font-semibold italic">
                      "{problem.impact}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProblemStatement;
