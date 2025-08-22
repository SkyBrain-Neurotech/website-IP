
import React from 'react';
import { Shield, Zap, Users, Brain, Activity, Target, Waves } from 'lucide-react';

const BCIExplanation = () => {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* What is BCI Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight font-orbitron">
            <span className="text-ghost-white">Understanding</span>{' '}
            <span className="text-neural-blue neural-glow">Brain-Computer Interfaces</span>
          </h2>
          <p className="text-lg md:text-xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Neurotechnology reads and interprets brain signals to understand your mental state. 
            Brain-Computer Interfaces (BCI) are the safe, non-invasive bridge between your mind and technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="p-4 bg-neural-blue/20 rounded-xl mx-auto w-fit mb-4">
              <Shield className="h-8 w-8 text-neural-blue synced-hover-rotate" />
            </div>
            <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
              Non-Invasive
            </h3>
            <p className="text-neural-gray leading-relaxed">
              Safe external sensors, no surgery or implants required
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="p-4 bg-mind-purple/20 rounded-xl mx-auto w-fit mb-4">
              <Zap className="h-8 w-8 text-mind-purple synced-hover-rotate" />
            </div>
            <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
              Real-Time
            </h3>
            <p className="text-neural-gray leading-relaxed">
              Instant mental state analysis and personalized response
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="p-4 bg-neural-blue/20 rounded-xl mx-auto w-fit mb-4">
              <Users className="h-8 w-8 text-neural-blue synced-hover-rotate" />
            </div>
            <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
              Accessible
            </h3>
            <p className="text-neural-gray leading-relaxed">
              Designed for everyday wellness and cognitive enhancement
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="p-4 bg-mind-purple/20 rounded-xl mx-auto w-fit mb-4">
              <Brain className="h-8 w-8 text-mind-purple synced-hover-rotate" />
            </div>
            <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
              Personal
            </h3>
            <p className="text-neural-gray leading-relaxed">
              Learns your unique neural patterns and preferences
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BCIExplanation;
