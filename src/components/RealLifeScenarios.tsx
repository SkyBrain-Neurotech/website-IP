
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sunrise, Briefcase, Heart, Brain, Target, Moon } from 'lucide-react';

const RealLifeScenarios = () => {
  const timelineCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = timelineCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Timeline neural signals
    const timelineSignals: Array<{
      x: number;
      y: number;
      targetX: number;
      progress: number;
      speed: number;
      intensity: number;
      trail: Array<{x: number, y: number, opacity: number}>
    }> = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create timeline signals
      if (Math.random() < 0.08) {
        timelineSignals.push({
          x: 0,
          y: canvas.height / 2 + (Math.random() - 0.5) * 60,
          targetX: canvas.width,
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
          intensity: 0.6 + Math.random() * 0.4,
          trail: []
        });
      }

      // Update and draw signals
      timelineSignals.forEach((signal, i) => {
        signal.progress += signal.speed;
        signal.x = signal.progress * signal.targetX;

        if (signal.progress >= 1) {
          timelineSignals.splice(i, 1);
          return;
        }

        // Update trail
        signal.trail.push({
          x: signal.x,
          y: signal.y,
          opacity: signal.intensity
        });

        if (signal.trail.length > 20) {
          signal.trail.shift();
        }

        // Draw neural signal trail
        signal.trail.forEach((point, j) => {
          const trailOpacity = point.opacity * (j / signal.trail.length) * 0.8;
          const size = 2 + (j / signal.trail.length) * 2;

          // Main signal
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 116, 139, ${trailOpacity})`;
          ctx.fill();

          // Electric glow
          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 116, 139, ${trailOpacity * 0.3})`;
          ctx.fill();
        });
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

  const scenarios = [
    {
      icon: Sunrise,
      title: "Morning Optimization",
      time: "6:30 AM",
      steps: [
        {
          action: "Sleep Analysis",
          description: "BCI analyzes sleep quality from neural patterns during REM cycles"
        },
        {
          action: "Cognitive Calibration", 
          description: "Adjusts daily cognitive tasks based on brain frequency states"
        },
        {
          action: "Routine Optimization",
          description: "Suggests optimal timing for your individual alpha peak frequency"
        }
      ]
    },
    {
      icon: Briefcase,
      title: "Peak Performance",
      time: "9:00 AM",
      steps: [
        {
          action: "Focus Monitoring",
          description: "Monitors focus levels through real-time EEG patterns"
        },
        {
          action: "Fatigue Prevention",
          description: "Alerts before cognitive fatigue sets in"
        },
        {
          action: "Schedule Optimization",
          description: "Optimizes schedule around natural brain rhythms"
        }
      ]
    },
    {
      icon: Heart,
      title: "Stress Management",
      time: "14:30",
      steps: [
        {
          action: "Stress Detection",
          description: "Detects stress through brainwave pattern changes"
        },
        {
          action: "Intervention",
          description: "Provides neurofeedback to restore optimal brain states"
        },
        {
          action: "Personalized Response",
          description: "Learns which techniques work for your neural patterns"
        }
      ]
    },
    {
      icon: Brain,
      title: "Cognitive Training",
      time: "18:00",
      steps: [
        {
          action: "Performance Timing",
          description: "Analyzes alpha peak frequency for optimal training windows"
        },
        {
          action: "Brain Training",
          description: "Personalized exercises based on cognitive profile"
        },
        {
          action: "Task Optimization",
          description: "Optimizes mental tasks based on current brain state"
        }
      ]
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <Target className="h-5 w-5 text-neural-blue animate-pulse" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase font-orbitron">Real-Life Scenarios</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">Your</span>{' '}
            <span className="text-neural-blue font-orbitron relative">
              Optimized Day
              <div className="absolute -inset-1 bg-gradient-to-r from-neural-blue/20 to-mind-purple/20 blur-lg opacity-50 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Experience a day with your personal BCI companion guiding every moment.
            <br className="hidden md:block" />
            <span className="text-neural-blue font-semibold">Your mind, optimized from dawn to dusk.</span>
          </p>
        </div>

        {/* Timeline */}
        <div className="glass-card rounded-3xl p-12 mb-20 relative overflow-hidden">
          {/* Neural signals canvas */}
          <canvas
            ref={timelineCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
            style={{ background: 'transparent' }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-8 relative z-10">
            {[
              { time: "6:30", icon: Sunrise, label: "Morning", color: "text-neural-blue" },
              { time: "9:00", icon: Briefcase, label: "Work", color: "text-neural-blue" },
              { time: "14:30", icon: Heart, label: "Stress", color: "text-neural-blue" },
              { time: "18:00", icon: Brain, label: "Training", color: "text-neural-blue" },
              { time: "22:00", icon: Moon, label: "Sleep", color: "text-neural-blue" }
            ].map((moment, index) => (
              <div key={moment.time} className="text-center group cursor-pointer">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <moment.icon className={`h-10 w-10 ${moment.color} relative z-10`} />
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-10 left-20 w-32 h-0.5 bg-gradient-to-r from-neural-blue to-mind-purple opacity-50"></div>
                  )}
                </div>
                <div className="text-3xl font-bold text-neural-blue mb-2 font-orbitron">{moment.time}</div>
                <div className="text-neural-gray font-medium">{moment.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="space-y-16">
          {scenarios.map((scenario, index) => (
            <Card 
              key={scenario.title}
              className="glass-card hover:border-neural-blue/30 transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center mb-12">
                  <div className="flex items-center mb-6 lg:mb-0 lg:mr-12">
                    <div className="p-6 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-2xl mr-6">
                      <scenario.icon className="h-12 w-12 text-neural-blue" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-ghost-white mb-3 font-orbitron">
                        {scenario.title}
                      </h3>
                      <p className="text-2xl text-neural-blue font-semibold font-orbitron">
                        {scenario.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {scenario.steps.map((step, stepIndex) => (
                    <div 
                      key={stepIndex}
                      className="bg-gradient-to-br from-neural-blue/5 to-mind-purple/5 border border-neural-blue/20 rounded-xl p-8 hover:border-neural-blue/40 transition-all group"
                    >
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-neural-blue to-mind-purple rounded-full flex items-center justify-center text-ghost-white font-bold mr-4 font-orbitron text-lg">
                          {stepIndex + 1}
                        </div>
                        <h4 className="text-xl font-semibold text-ghost-white group-hover:text-neural-blue transition-colors font-orbitron">
                          {step.action}
                        </h4>
                      </div>
                      <p className="text-neural-gray leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealLifeScenarios;
