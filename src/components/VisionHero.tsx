
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DemoModal from './DemoModal';
import { trackButtonClick } from '@/lib/analytics';

const VisionHero = () => {
  const [textGlow, setTextGlow] = useState(false);
  const [brainPulse, setBrainPulse] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setTextGlow(prev => !prev);
    }, 800);

    const pulseInterval = setInterval(() => {
      setBrainPulse(prev => (prev + 1) % 3);
    }, 500);

    return () => {
      clearInterval(glowInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
             style={{ background: 'transparent' }}>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in-up">
          {/* Interactive Badge */}
          <div className="inline-flex items-center space-x-3 glass-card rounded-full px-6 py-3 mb-8 hover:scale-105 transition-transform cursor-pointer group holographic">
            <Zap className={`h-5 w-5 text-neural-blue drop-shadow-lg transition-all duration-300 ${brainPulse === 0 ? 'animate-pulse' : brainPulse === 1 ? 'animate-bounce' : 'animate-pulse'}`} />
            <span className="text-xs sm:text-sm font-semibold text-neural-gray tracking-wide font-orbitron uppercase group-hover:text-neural-blue transition-colors drop-shadow-lg">
              Neurotechnology - EEG
            </span>
            <div className="w-2 h-2 bg-neural-blue rounded-full animate-ping drop-shadow-lg"></div>
          </div>

          {/* Dynamic Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight transition-all duration-1000 ${textGlow ? 'scale-105' : 'scale-100'}`}>
            <span className="text-ghost-white hover:text-neural-blue transition-colors cursor-pointer">Mental Wellness & Health</span>
            <br />
            <span className={`text-neural-blue font-orbitron relative transition-all duration-1000 ${textGlow ? 'neural-glow' : ''}`}>
              Through NeuroTech
              <div className={`absolute -inset-1 bg-gradient-to-r from-neural-blue/20 to-mind-purple/20 blur-lg opacity-50 transition-all duration-1000 ${textGlow ? 'animate-pulse scale-110' : 'scale-100'}`}></div>
            </span>
          </h1>

          {/* Dynamic Subheading */}
          <div className="text-lg sm:text-xl md:text-2xl text-neural-gray mb-12 max-w-4xl mx-auto leading-relaxed">
            <div className="mb-4">
              Building the future of mental wellness with Brain-Computer Interface technology
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <Button 
              onClick={() => {
                trackButtonClick('Experience Demo', 'hero', 'demo_modal');
                setShowDemoModal(true);
              }}
              className="neural-gradient text-white font-bold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-xl group transition-all transform hover:scale-110 font-orbitron relative overflow-hidden min-h-[44px] w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Brain className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-neural-blue">Experience Demo</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" />
            </Button>
            <Link to="/roadmap">
              <Button 
                onClick={() => trackButtonClick('See Our Roadmap', 'hero', '/roadmap')}
                variant="outline" 
                className="glass-card border-neural-blue/40 text-neural-blue hover:bg-neural-blue/10 font-bold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-xl group transition-all transform hover:scale-110 font-orbitron relative overflow-hidden min-h-[44px] w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-neural-blue/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="group-hover:text-ghost-white transition-colors duration-300 relative z-10 flex items-center">
                  <Zap className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  See Our Roadmap
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="glass-card w-8 h-16 rounded-full flex justify-center items-start pt-3">
          <div className="w-1.5 h-6 bg-gradient-to-b from-neural-blue via-mind-purple to-neural-blue rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal 
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </section>
  );
};

export default VisionHero;
