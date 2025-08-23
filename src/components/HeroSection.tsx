
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap, Brain, Activity } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 neural-grid opacity-20"></div>
      <div className="absolute inset-0 neural-network-bg"></div>
      
      {/* Elegant Neural Constellation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Neural Constellation */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>
          
          {/* Central constellation pattern */}
          {[...Array(6)].map((_, ring) => {
            const ringRadius = 80 + ring * 60;
            const nodeCount = 6 + ring * 2;
            return (
              <g key={ring}>
                {[...Array(nodeCount)].map((_, i) => {
                  const angle = (i / nodeCount) * 2 * Math.PI;
                  const x = 50 + (Math.cos(angle) * ringRadius * 0.8) / 10;
                  const y = 50 + (Math.sin(angle) * ringRadius * 0.6) / 10;
                  const size = Math.max(1, 4 - ring * 0.5);
                  
                  return (
                    <g key={i}>
                      {/* Connection lines to center */}
                      {ring === 0 && (
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`${x}%`}
                          y2={`${y}%`}
                          stroke="#00D4FF"
                          strokeWidth="0.5"
                          opacity="0.2"
                          className="animate-pulse"
                        />
                      )}
                      
                      {/* Node */}
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r={size}
                        fill="url(#neuralGlow)"
                        filter="url(#glow)"
                        className="animate-pulse"
                        style={{
                          animationDelay: `${(ring * nodeCount + i) * 0.2}s`,
                          animationDuration: `${3 + ring}s`
                        }}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
          
          {/* Central hub */}
          <circle
            cx="50%"
            cy="50%"
            r="6"
            fill="#00D4FF"
            filter="url(#glow)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Flowing Neural Pathways */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6B46FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Elegant flowing paths */}
          {[...Array(4)].map((_, i) => {
            const startY = 20 + i * 20;
            const endY = 80 - i * 15;
            const midY = startY + (endY - startY) * 0.5 + (i % 2 === 0 ? 10 : -10);
            
            return (
              <path
                key={i}
                d={`M 0,${startY} Q 25,${midY} 50,${(startY + endY) / 2} T 100,${endY}`}
                stroke="url(#pathGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: '4s'
                }}
              />
            );
          })}
        </svg>
        
        {/* Subtle accent dots in golden ratio positions */}
        {[
          { x: '23.6%', y: '38.2%', delay: 0 },
          { x: '76.4%', y: '61.8%', delay: 1.2 },
          { x: '38.2%', y: '23.6%', delay: 2.4 },
          { x: '61.8%', y: '76.4%', delay: 3.6 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neural-blue rounded-full opacity-60 animate-pulse"
            style={{
              left: dot.x,
              top: dot.y,
              animationDelay: `${dot.delay}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Main Content with Enhanced Typography */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Enhanced Badge with Glassmorphism */}
          <div className="inline-flex items-center space-x-3 glass-card rounded-full px-6 py-3 mb-12 holographic">
            <div className="relative">
              <Zap className="h-5 w-5 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 h-5 w-5 bg-primary/30 rounded-full blur-md"></div>
            </div>
            <span className="text-sm font-semibold text-primary neon-text tracking-wide">
              NEXT-GENERATION NEURAL INTERFACE
            </span>
            <div className="w-2 h-2 bg-electric-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading with Dramatic Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-foreground">Unlock Your</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-electric-400 to-purple-400 bg-clip-text text-transparent neon-text animate-pulse-glow">
              Neural Potential
            </span>
          </h1>

          {/* Enhanced Subheading */}
          <p className="text-xl md:text-3xl text-foreground/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Revolutionary <span className="text-primary font-semibold">Brain-Computer Interface</span> technology that 
            monitors neural signals, tracks cognitive performance, and helps you 
            <br className="hidden md:block" />
            <span className="text-electric-400 font-semibold">optimize your mental state</span> in real-time.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-16">
            <Button 
              size="lg" 
              className="cyber-button text-primary-foreground font-bold px-10 py-6 text-xl rounded-xl group transform hover:scale-105 transition-all duration-300"
            >
              <Brain className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Explore Neural Tech
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="glass-card border-primary/40 text-primary hover:bg-primary/10 font-bold px-10 py-6 text-xl rounded-xl group transform hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform" />
              Experience Demo
            </Button>
          </div>

          {/* Enhanced Stats with Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: "99.9%", label: "Neural Accuracy", icon: Activity },
              { value: "<1ms", label: "Response Time", icon: Zap },
              { value: "24/7", label: "Real-time Monitor", icon: Brain }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-card p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-300 holographic"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-4">
                  <stat.icon className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-lg mx-auto"></div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-primary mb-3 neon-text">
                  {stat.value}
                </div>
                <div className="text-foreground/70 font-semibold tracking-wide uppercase text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="glass-card w-8 h-16 rounded-full flex justify-center items-start pt-3 group hover:scale-110 transition-all">
          <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-electric-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
