
import React from 'react';
import { Brain, Zap, Target, Shield } from 'lucide-react';

const PersonalizedBCI = () => {
  const features = [
    {
      icon: Brain,
      title: "Your Unique Neural Signature",
      description: "Every brain is different, your BCI learns YOUR patterns",
      timing: "Real-time analysis of your individual brainwave patterns"
    },
    {
      icon: Zap,
      title: "Moment-to-Moment Awareness",
      description: "Real-time understanding of your mental state",
      timing: "Updates every 250ms with current cognitive state"
    },
    {
      icon: Target,
      title: "Predictive Intelligence",
      description: "AI that knows when you need support before you do",
      timing: "Predicts mental state changes 5-15 minutes in advance"
    },
    {
      icon: Shield,
      title: "Adaptive Recommendations",
      description: "Interventions that evolve with your changing needs",
      timing: "Personalized suggestions updated every session"
    }
  ];

  return (
    <section className="py-20 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <Brain className="h-5 w-5 text-neural-blue neural-pulse" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase font-orbitron">Personalized BCI</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">Your Brain,</span>
            <br />
            <span className="neural-gradient bg-clip-text text-transparent neural-glow font-orbitron">
              Decoded & Optimized
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            BCI technology that adapts to your unique neural patterns and provides
            <br className="hidden md:block" />
            <span className="text-neural-blue font-semibold">personalized mental health guidance in real-time.</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="feature-card p-8 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start mb-6">
                <div className="p-4 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-2xl mr-6 flex-shrink-0">
                  <feature.icon className="h-8 w-8 text-neural-blue group-hover:rotate-12 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-ghost-white mb-3 group-hover:text-neural-blue transition-colors font-orbitron">
                    {feature.title}
                  </h3>
                  <p className="text-neural-gray text-lg leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="bg-neural-blue/10 border border-neural-blue/30 p-4 rounded-lg">
                    <p className="text-neural-blue font-semibold text-sm font-orbitron">
                      ⚡ {feature.timing}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Intelligent Care System */}
        <div className="glass-card rounded-3xl p-8 md:p-12 holographic">
          <h3 className="text-3xl font-bold mb-8 text-center text-ghost-white font-orbitron">
            The Intelligent Care System
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Stress Detection",
                description: "BCI notices changes in brainwave patterns indicating mental fatigue at 2:47 PM"
              },
              {
                step: "02", 
                title: "Proactive Intervention",
                description: "Suggests neurofeedback session specific to your individual alpha peak frequency"
              },
              {
                step: "03",
                title: "Optimized Timing",
                description: "Recommends exact moment when your brain is most receptive to training"
              },
              {
                step: "04",
                title: "Personalized Dosage",
                description: "Provides precisely calibrated brain stimulation optimized for your neural patterns"
              }
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-neural-blue rounded-full flex items-center justify-center mx-auto mb-4 font-orbitron font-bold text-deep-space">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-neural-blue mb-3 font-orbitron">
                  {item.title}
                </h4>
                <p className="text-neural-gray text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedBCI;
