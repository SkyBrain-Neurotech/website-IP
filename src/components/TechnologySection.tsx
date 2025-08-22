
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Activity, Zap, Shield, Cpu, Waves } from 'lucide-react';

const TechnologySection = () => {
  const technologies = [
    {
      icon: Brain,
      title: 'Neural Signal Processing',
      description: 'Advanced algorithms decode complex neural patterns with unprecedented accuracy and speed.',
      features: ['EEG Signal Analysis', 'Pattern Recognition', 'Real-time Processing']
    },
    {
      icon: Activity,
      title: 'Cognitive Monitoring',
      description: 'Track attention levels, stress indicators, and mental fatigue throughout your day.',
      features: ['Attention Tracking', 'Stress Detection', 'Fatigue Analysis']
    },
    {
      icon: Zap,
      title: 'Real-time Feedback',
      description: 'Instant insights into your mental state help you optimize performance when it matters most.',
      features: ['Live Metrics', 'Performance Alerts', 'Optimization Tips']
    },
    {
      icon: Shield,
      title: 'Privacy-First Design',
      description: 'Your neural data stays secure with end-to-end encryption and local processing.',
      features: ['Data Encryption', 'Local Processing', 'Privacy Controls']
    },
    {
      icon: Cpu,
      title: 'Edge Computing',
      description: 'On-device processing ensures minimal latency and maximum data privacy.',
      features: ['Low Latency', 'Offline Capable', 'Edge AI']
    },
    {
      icon: Waves,
      title: 'Adaptive Learning',
      description: 'AI models continuously learn your unique neural patterns for personalized insights.',
      features: ['Personal Models', 'Continuous Learning', 'Adaptive Algorithms']
    }
  ];

  return (
    <section id="technology" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-shadow-black to-deep-space opacity-80"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <Cpu className="h-5 w-5 text-neural-blue neural-pulse" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase font-orbitron">Technology</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">How We Make the</span>{' '}
            <span className="text-neural-blue neural-glow font-orbitron">Impossible,</span>
            <br />
            <span className="text-mind-purple neural-glow font-orbitron">Possible</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Revolutionary neuroscience meets cutting-edge AI to create your personal mental health oracle.
            <br className="hidden md:block" />
            <span className="text-neural-blue font-semibold">Science fiction becomes science fact.</span>
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {technologies.map((tech, index) => (
            <div 
              key={tech.title} 
              className="feature-card p-8 group h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-2xl mr-4 flex-shrink-0">
                    <tech.icon className="h-8 w-8 text-neural-blue group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-ghost-white mb-4 group-hover:text-neural-blue transition-colors font-orbitron">
                    {tech.title}
                  </h3>
                  <p className="text-neural-gray text-lg leading-relaxed mb-6">
                    {tech.description}
                  </p>
                  <ul className="space-y-3">
                    {tech.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-neural-gray group-hover:text-ghost-white transition-colors">
                        <div className="w-2 h-2 bg-neural-blue rounded-full mr-4 neural-pulse"></div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EEG Classification */}
        <div className="glass-card rounded-3xl p-8 md:p-12 holographic mb-16">
          <div className="flex items-center mb-8">
            <Activity className="h-8 w-8 text-neural-blue mr-4" />
            <h3 className="text-3xl font-bold text-ghost-white font-orbitron">
              EEG Classification
            </h3>
          </div>
          <p className="text-xl text-neural-blue mb-8 italic font-orbitron">
            Reading Your Mind's Language
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-neural-gray text-lg leading-relaxed mb-6">
                Real-time monitoring of focus, stress, relaxation, and distraction through advanced brainwave analysis.
              </p>
              
              <div className="space-y-4">
                <div className="bg-neural-blue/10 border-l-4 border-neural-blue p-4 rounded-r-lg">
                  <p className="text-neural-blue font-semibold">
                    <span className="text-ghost-white">Real-time State Detection:</span> Emotional State Detection in real-time
                  </p>
                </div>
                <div className="bg-neural-blue/10 border-l-4 border-neural-blue p-4 rounded-r-lg">
                  <p className="text-neural-blue font-semibold">
                    <span className="text-ghost-white">Brainwave Analysis:</span> Alpha, Beta, Delta, Theta pattern analysis
                  </p>
                </div>
                <div className="bg-neural-blue/10 border-l-4 border-neural-blue p-4 rounded-r-lg">
                  <p className="text-neural-blue font-semibold">
                    <span className="text-ghost-white">Pattern Recognition:</span> Learning your unique neural signatures
                  </p>
                </div>
                <div className="bg-neural-blue/10 border-l-4 border-neural-blue p-4 rounded-r-lg">
                  <p className="text-neural-blue font-semibold">
                    <span className="text-ghost-white">Predictive Modeling:</span> Anticipating mental state changes
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-neural-blue/10 to-mind-purple/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">
                Technical Specifications
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neural-gray">Accuracy</span>
                  <span className="text-neural-blue font-bold">98.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neural-gray">Channels</span>
                  <span className="text-neural-blue font-bold">32-64</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neural-gray">Frequency</span>
                  <span className="text-neural-blue font-bold">1000Hz</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-shadow-black/50 rounded-lg">
                <p className="text-neural-gray text-sm leading-relaxed">
                  Real-time neural pattern analysis and AI processing visualization
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IAPF Analysis */}
        <div className="glass-card rounded-3xl p-8 md:p-12 holographic">
          <div className="flex items-center mb-8">
            <Waves className="h-8 w-8 text-mind-purple mr-4" />
            <h3 className="text-3xl font-bold text-ghost-white font-orbitron">
              IAPF Analysis
            </h3>
          </div>
          <p className="text-xl text-mind-purple mb-8 italic font-orbitron">
            Your Brain's Optimal Frequency
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-neural-gray text-lg leading-relaxed mb-6">
                Individual Alpha Peak Frequency analysis reveals your brain's unique optimal operating state.
              </p>
              
              <div className="space-y-4">
                <div className="bg-mind-purple/10 border-l-4 border-mind-purple p-4 rounded-r-lg">
                  <p className="text-mind-purple font-semibold">
                    <span className="text-ghost-white">Frequency Discovery:</span> Finding your brain's unique optimal frequency
                  </p>
                </div>
                <div className="bg-mind-purple/10 border-l-4 border-mind-purple p-4 rounded-r-lg">
                  <p className="text-mind-purple font-semibold">
                    <span className="text-ghost-white">Cognitive Performance:</span> Cognitive Performance Indicator analysis
                  </p>
                </div>
                <div className="bg-mind-purple/10 border-l-4 border-mind-purple p-4 rounded-r-lg">
                  <p className="text-mind-purple font-semibold">
                    <span className="text-ghost-white">Neural Optimization:</span> Personalized Neural Optimization protocols
                  </p>
                </div>
                <div className="bg-mind-purple/10 border-l-4 border-mind-purple p-4 rounded-r-lg">
                  <p className="text-mind-purple font-semibold">
                    <span className="text-ghost-white">Performance Prediction:</span> Based on IAPF patterns
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-mind-purple/10 to-neural-blue/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">
                Technical Specifications
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neural-gray">Precision</span>
                  <span className="text-mind-purple font-bold">0.1Hz</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neural-gray">Range</span>
                  <span className="text-mind-purple font-bold">8-13Hz</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neural-gray">Personalization</span>
                  <span className="text-mind-purple font-bold">100%</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-shadow-black/50 rounded-lg">
                <p className="text-neural-gray text-sm leading-relaxed">
                  Real-time neural pattern analysis and AI processing visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
