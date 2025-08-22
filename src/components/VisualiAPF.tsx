import React, { useState, useEffect } from 'react';
import { Brain, Zap, Activity, Target, Users, Shield, Waves, TrendingUp, Eye, Heart } from 'lucide-react';

const VisualiAPF = () => {
  const [activeFreq, setActiveFreq] = useState(10.2);
  const [pulseIntensity, setPulseIntensity] = useState(0.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFreq(prev => 9.8 + Math.sin(Date.now() / 2000) * 0.6);
      setPulseIntensity(prev => 0.6 + Math.sin(Date.now() / 1500) * 0.3);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Primary gradient - more translucent */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-space/80 via-shadow-black/70 to-neural-blue/10"></div>
        
        {/* Animated neural network background - very subtle */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="neural-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1" fill="#00D4FF" opacity="0.6">
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="40" cy="40" r="20" stroke="#00D4FF" strokeWidth="0.5" fill="none" opacity="0.2" />
              </pattern>
              <radialGradient id="brain-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-grid)" />
            <ellipse cx="50%" cy="50%" rx="300" ry="200" fill="url(#brain-glow)" />
          </svg>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neural-blue rounded-full animate-float"
              style={{
                left: `${15 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-20 relative">
          {/* Very subtle background brain with minimal opacity */}
          <div className="absolute inset-0 flex justify-center items-center opacity-1">
            <div className="relative">
              <Brain className="h-80 w-80 text-neural-blue/20 animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-0 bg-neural-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
            </div>
          </div>
          
          <div className="relative z-10 glass-card p-12 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
            {/* Enhanced badge */}
            <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-8 rounded-full border border-neural-blue/40 backdrop-blur-md">
              <div className="relative">
                <Brain className="h-5 w-5 text-neural-blue" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-neural-blue rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-bold text-neural-blue tracking-wide font-orbitron uppercase">
                Neural Frequency Mapping
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              <span className="text-white drop-shadow-2xl">Meet</span>{' '}
              <span className="text-neural-blue font-orbitron neural-glow text-7xl md:text-8xl block relative drop-shadow-2xl">
                iAPF
                <div className="absolute inset-0 bg-neural-blue/20 blur-xl rounded-2xl animate-pulse"></div>
              </span>
            </h1>
            
            {/* Enhanced definition with modern layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="glass-card p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/20 hover:bg-white/10 hover:border-neural-blue/40 transition-all shadow-lg">
                <div className="text-2xl font-bold text-neural-blue mb-1 drop-shadow-lg">i</div>
                <div className="text-sm text-white/80">ndividual</div>
              </div>
              <div className="glass-card p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/20 hover:bg-white/10 hover:border-neural-blue/40 transition-all shadow-lg">
                <div className="text-2xl font-bold text-neural-blue mb-1 drop-shadow-lg">A</div>
                <div className="text-sm text-white/80">lpha</div>
              </div>
              <div className="glass-card p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/20 hover:bg-white/10 hover:border-neural-blue/40 transition-all shadow-lg">
                <div className="text-2xl font-bold text-neural-blue mb-1 drop-shadow-lg">P</div>
                <div className="text-sm text-white/80">eak</div>
              </div>
              <div className="glass-card p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/20 hover:bg-white/10 hover:border-neural-blue/40 transition-all shadow-lg">
                <div className="text-2xl font-bold text-neural-blue mb-1 drop-shadow-lg">F</div>
                <div className="text-sm text-white/80">requency</div>
              </div>
            </div>
            
            <p className="text-xl text-neural-gray mb-12 max-w-3xl mx-auto leading-relaxed">
              Your brain's unique neural signature - the key to personalized neurofeedback and optimal cognitive performance
            </p>
          </div>
        </div>

        {/* Enhanced Feature Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-ghost-white font-orbitron">
            How iAPF Revolutionizes Mental Wellness
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl hover:border-neural-blue/40 transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-neural-blue/20 rounded-xl group-hover:bg-neural-blue/30 transition-colors">
                  <Users className="h-8 w-8 text-neural-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                    Uniquely Yours
                  </h3>
                  <p className="text-neural-gray leading-relaxed">
                    Every brain has its own neural fingerprint. iAPF maps your individual patterns for truly personalized mental wellness.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:border-neural-blue/40 transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-mind-purple/20 rounded-xl group-hover:bg-mind-purple/30 transition-colors">
                  <Zap className="h-8 w-8 text-mind-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                    Real-Time Adaptation
                  </h3>
                  <p className="text-neural-gray leading-relaxed">
                    Dynamic monitoring adjusts to your changing mental states, providing support exactly when you need it.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:border-neural-blue/40 transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-neural-blue/20 rounded-xl group-hover:bg-neural-blue/30 transition-colors">
                  <Shield className="h-8 w-8 text-neural-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                    Preventive Care
                  </h3>
                  <p className="text-neural-gray leading-relaxed">
                    Detect early warning signs before they become problems, maintaining optimal mental health proactively.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:border-neural-blue/40 transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-mind-purple/20 rounded-xl group-hover:bg-mind-purple/30 transition-colors">
                  <Target className="h-8 w-8 text-mind-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                    Precision Training
                  </h3>
                  <p className="text-neural-gray leading-relaxed">
                    Neurofeedback protocols precisely calibrated to your brain's optimal frequency for maximum effectiveness.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:border-neural-blue/40 transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-neural-blue/20 rounded-xl group-hover:bg-neural-blue/30 transition-colors">
                  <TrendingUp className="h-8 w-8 text-neural-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                    Measurable Progress
                  </h3>
                  <p className="text-neural-gray leading-relaxed">
                    Track your cognitive improvements with objective neural metrics, not just subjective feelings.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:border-neural-blue/40 transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-mind-purple/20 rounded-xl group-hover:bg-mind-purple/30 transition-colors">
                  <Heart className="h-8 w-8 text-mind-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                    Holistic Wellness
                  </h3>
                  <p className="text-neural-gray leading-relaxed">
                    Integrates with your lifestyle, sleep patterns, and daily rhythms for comprehensive mental health support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Process Flow */}
        <div className="glass-card rounded-3xl p-12 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/5 to-mind-purple/5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-ghost-white font-orbitron">
              The iAPF Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { 
                  icon: Eye, 
                  title: 'Scan', 
                  desc: 'Advanced EEG sensors safely read your brainwaves with Research-grade precision',
                  color: 'neural-blue'
                },
                { 
                  icon: Brain, 
                  title: 'Analyze', 
                  desc: 'AI algorithms identify your unique neural patterns and optimal frequency range',
                  color: 'mind-purple'
                },
                { 
                  icon: Target, 
                  title: 'Calibrate', 
                  desc: 'System learns your personal baseline and creates your individual neural map',
                  color: 'neural-blue'
                },
                { 
                  icon: Zap, 
                  title: 'Optimize', 
                  desc: 'Real-time neurofeedback trains your brain to maintain peak performance states',
                  color: 'mind-purple'
                }
              ].map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.title} className="text-center group">
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 bg-${step.color}/20 rounded-full flex items-center justify-center mx-auto border-2 border-${step.color}/30 group-hover:border-${step.color}/50 transition-all`}>
                        <IconComponent className={`h-10 w-10 text-${step.color}`} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-neural-blue to-mind-purple rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">
                      {step.title}
                    </h3>
                    <p className="text-neural-gray leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualiAPF;