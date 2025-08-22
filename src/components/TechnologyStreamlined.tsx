import React, { useState, useEffect } from 'react';
import { Brain, Zap, Activity, Target, Users, Shield, Waves, TrendingUp, Eye, Heart, MonitorSpeaker, Cpu, ChevronLeft, ChevronRight, Play, Pause, Headphones } from 'lucide-react';

const TechnologyStreamlined = () => {
  const [activeFreq, setActiveFreq] = useState(10.2);
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Comprehensive EEG Mapping Process
  const eegSteps = [
    {
      title: "Neural Signal Capture",
      description: "Research-grade EEG sensors capture your brain's electrical activity across multiple frequency bands.",
      content: "Our advanced 4-channel EEG system records neural oscillations from 0.5-50Hz, capturing everything from deep delta waves to high-frequency gamma activity. This comprehensive data collection ensures we map your complete neural signature.",
      visual: Brain,
      color: "neural-blue"
    },
    {
      title: "Cognitive State Recognition",
      description: "AI algorithms identify distinct patterns for focus, creativity, stress, and relaxation states.",
      content: "Machine learning models trained on thousands of EEG sessions recognize your unique neural signatures for different cognitive states. We identify when you're in flow state, experiencing stress, or achieving deep focus.",
      visual: Eye,
      color: "mind-purple"
    },
    {
      title: "Personal Neural Mapping",
      description: "Extract your unique neural biomarkers and patterns for true personalization.",
      content: "Your individual neural profile serves as your wellness baseline. We create a comprehensive map of your mental patterns, attention markers, and cognitive preferences for optimal support.",
      visual: Activity,
      color: "neural-blue"
    },
    {
      title: "Performance Optimization",
      description: "Real-time neurofeedback guides you toward optimal states for specific tasks and goals.",
      content: "Based on your neural map, we provide targeted interventions: boost alpha waves for creativity, increase SMR for focus, reduce high-beta for stress relief, or enhance theta for deep meditation states.",
      visual: Target,
      color: "mind-purple"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFreq(prev => 9.8 + Math.sin(Date.now() / 2000) * 0.6);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % eegSteps.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, eegSteps.length]);

  const nextStep = () => {
    setActiveStep(prev => (prev + 1) % eegSteps.length);
  };

  const prevStep = () => {
    setActiveStep(prev => prev === 0 ? eegSteps.length - 1 : prev - 1);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-shadow-black to-neural-blue/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 glass-card px-8 py-4 mb-8 rounded-full border border-neural-blue/40 shadow-xl">
              <Brain className="h-6 w-6 text-neural-blue animate-pulse" />
              <span className="text-base font-bold text-neural-blue tracking-wide font-orbitron uppercase">
                Advanced Neurotechnology
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
              <span className="text-ghost-white">EEG Neural</span>{' '}
              <span className="text-neural-blue font-orbitron neural-glow text-4xl md:text-6xl lg:text-7xl block">
                Mapping
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-12">
              We map your complete EEG signature across all cognitive states - from focus and creativity to stress and relaxation. 
              This comprehensive neural profile enables personalized optimization for peak mental performance.
            </p>

            {/* Cognitive States Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
              {[
                { name: 'Focus', desc: 'Attention & Concentration', color: 'neural-blue' },
                { name: 'Creativity', desc: 'Innovation & Flow', color: 'mind-purple' },
                { name: 'Stress', desc: 'Pressure & Anxiety', color: 'neural-blue' },
                { name: 'Relaxation', desc: 'Calm & Recovery', color: 'mind-purple' }
              ].map((state, index) => (
                <div key={index} className="glass-card p-4 rounded-xl border border-neural-blue/30 hover:border-neural-blue/50 transition-all shadow-lg">
                  <div className={`text-2xl font-bold text-${state.color} mb-1`}>{state.name}</div>
                  <div className="text-sm text-neural-gray">{state.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Understanding BCI Section */}
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
                <Shield className="h-8 w-8 text-neural-blue group-hover:rotate-12 transition-transform" />
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
                <Zap className="h-8 w-8 text-mind-purple group-hover:rotate-12 transition-transform" />
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
                <Users className="h-8 w-8 text-neural-blue group-hover:rotate-12 transition-transform" />
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
                <Brain className="h-8 w-8 text-mind-purple group-hover:rotate-12 transition-transform" />
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

      {/* Wearable Devices Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight font-orbitron">
              <span className="text-ghost-white">Our</span>{' '}
              <span className="text-neural-blue neural-glow">Wearable Devices</span>
            </h2>
            <p className="text-lg md:text-xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
              Choose from our range of comfortable, advanced EEG wearables designed for different use cases and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Headband Variant */}
            <div className="glass-card p-8 rounded-2xl border border-neural-blue/30 hover:border-neural-blue/50 transition-all duration-300 group">
              <div className="text-center mb-8">
                <div className="p-6 bg-neural-blue/20 rounded-2xl mx-auto w-fit mb-6 group-hover:bg-neural-blue/30 transition-colors">
                  <Brain className="h-16 w-16 text-neural-blue group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                  Headband Variant
                </h3>
                <p className="text-neural-blue font-semibold mb-4">Professional EEG Headband</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
                  <span className="text-neural-gray">Lightweight, comfortable design for extended wear</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
                  <span className="text-neural-gray">4-channel research-grade EEG sensors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
                  <span className="text-neural-gray">Adjustable fit for all head sizes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
                  <span className="text-neural-gray">Perfect for meditation and focus training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
                  <span className="text-neural-gray">Long battery life (8+ hours)</span>
                </div>
              </div>
            </div>

            {/* Headphone Variant */}
            <div className="glass-card p-8 rounded-2xl border border-mind-purple/30 hover:border-mind-purple/50 transition-all duration-300 group">
              <div className="text-center mb-8">
                <div className="p-6 bg-mind-purple/20 rounded-2xl mx-auto w-fit mb-6 group-hover:bg-mind-purple/30 transition-colors">
                  <Headphones className="h-16 w-16 text-mind-purple group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                  Headphone Variant
                </h3>
                <p className="text-mind-purple font-semibold mb-4">All-in-One Neural Headphones</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-mind-purple rounded-full"></div>
                  <span className="text-neural-gray">Premium audio quality with EEG integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-mind-purple rounded-full"></div>
                  <span className="text-neural-gray">Built-in EEG electrodes on headphones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-mind-purple rounded-full"></div>
                  <span className="text-neural-gray">Active noise cancellation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-mind-purple rounded-full"></div>
                  <span className="text-neural-gray">Real-time binaural audio adaptation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-mind-purple rounded-full"></div>
                  <span className="text-neural-gray">Wireless connectivity and charging case</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-16 text-center">
            <div className="glass-card p-8 rounded-2xl border border-neural-blue/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-ghost-white mb-6 font-orbitron">
                Both Variants Include
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-neural-blue font-bold text-lg mb-2">Real-Time Processing</div>
                  <p className="text-neural-gray text-sm">Instant neural signal analysis</p>
                </div>
                <div className="text-center">
                  <div className="text-mind-purple font-bold text-lg mb-2">Wireless Connectivity</div>
                  <p className="text-neural-gray text-sm">Seamless device pairing</p>
                </div>
                <div className="text-center">
                  <div className="text-neural-blue font-bold text-lg mb-2">App Integration</div>
                  <p className="text-neural-gray text-sm">Complete mobile control</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive EEG Process */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-ghost-white font-orbitron">
              How EEG Technology Works
            </h2>
            <p className="text-lg md:text-xl text-neural-gray max-w-3xl mx-auto">
              Explore our step-by-step process of reading and understanding your brain signals
            </p>
          </div>

          {/* Interactive Process Viewer */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/5 to-mind-purple/5"></div>
            
            <div className="relative z-10">
              {/* Controls */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                <button
                  onClick={prevStep}
                  className="glass-card p-4 rounded-full hover:scale-105 transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-neural-blue" />
                </button>

                <div className="glass-card px-6 py-3 rounded-full">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className="hover:scale-110 transition-transform min-h-[44px] min-w-[44px] flex items-center justify-center p-2"
                    >
                      {isAutoPlay ? (
                        <Pause className="h-5 w-5 text-neural-blue" />
                      ) : (
                        <Play className="h-5 w-5 text-neural-blue" />
                      )}
                    </button>
                    <span className="text-sm font-semibold text-neural-blue font-orbitron">
                      Step {activeStep + 1} of {eegSteps.length}
                    </span>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="glass-card p-4 rounded-full hover:scale-105 transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-neural-blue" />
                </button>
              </div>

              {/* Current Step Display */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[350px] md:min-h-[400px]">
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <div className={`p-4 bg-${eegSteps[activeStep].color}/20 rounded-2xl`}>
                      {React.createElement(eegSteps[activeStep].visual, {
                        className: `h-16 w-16 text-${eegSteps[activeStep].color}`
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-ghost-white mb-4 font-orbitron">
                    {eegSteps[activeStep].title}
                  </h3>
                  
                  <p className="text-base md:text-lg text-neural-blue mb-6 font-semibold">
                    {eegSteps[activeStep].description}
                  </p>
                  
                  <p className="text-neural-gray leading-relaxed text-base md:text-lg">
                    {eegSteps[activeStep].content}
                  </p>
                </div>

                <div className="relative order-1 lg:order-2">
                  <div className="glass-card p-6 md:p-8 rounded-2xl border border-neural-blue/30">
                    {/* Enhanced visualizations for each step */}
                    {activeStep === 0 && (
                      <div className="text-center space-y-6">
                        <div className="relative mx-auto w-32 h-32 mb-6">
                          <div className="absolute inset-0 bg-neural-blue/20 rounded-full animate-pulse"></div>
                          <Brain className="h-32 w-32 text-neural-blue" />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {['0.5-4Hz', '4-8Hz', '8-13Hz', '13-30Hz'].map((freq, i) => (
                            <div key={i} className="glass-card p-2 text-xs text-neural-blue border border-neural-blue/30">
                              {freq}
                            </div>
                          ))}
                        </div>
                        <p className="text-neural-gray">4-channel EEG capture</p>
                      </div>
                    )}
                    
                    {activeStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <Eye className="h-20 w-20 text-mind-purple mx-auto mb-4" />
                          <p className="text-mind-purple font-semibold">Cognitive State Detection</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {['Focus', 'Creativity', 'Stress', 'Relaxation'].map((state, i) => (
                            <div key={i} className="glass-card p-3 text-center border border-mind-purple/30">
                              <div className="text-sm font-semibold text-mind-purple">{state}</div>
                              <div className="w-full bg-mind-purple/20 rounded-full h-2 mt-2">
                                <div 
                                  className="bg-mind-purple h-2 rounded-full animate-pulse" 
                                  style={{ width: `${60 + i * 10}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeStep === 2 && (
                      <div className="text-center space-y-6">
                        <Activity className="h-20 w-20 text-neural-blue mx-auto" />
                        <div className="space-y-3">
                          <div className="glass-card p-3 border border-neural-blue/30">
                            <div className="text-neural-blue font-semibold">Neural Profile: {activeFreq.toFixed(1)} Hz</div>
                            <div className="text-xs text-neural-gray">Personal Baseline</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="glass-card p-2 border border-neural-blue/20">
                              <div className="text-xs text-neural-blue">Attention</div>
                              <div className="text-xs text-neural-gray">Markers</div>
                            </div>
                            <div className="glass-card p-2 border border-neural-blue/20">
                              <div className="text-xs text-neural-blue">Cognitive</div>
                              <div className="text-xs text-neural-gray">Patterns</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeStep === 3 && (
                      <div className="text-center space-y-6">
                        <div className="relative">
                          <Target className="h-20 w-20 text-mind-purple mx-auto" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="glass-card p-3 border border-mind-purple/30">
                            <div className="text-mind-purple font-semibold text-sm">↑ Alpha</div>
                            <div className="text-xs text-neural-gray">Creativity</div>
                          </div>
                          <div className="glass-card p-3 border border-mind-purple/30">
                            <div className="text-mind-purple font-semibold text-sm">↑ SMR</div>
                            <div className="text-xs text-neural-gray">Focus</div>
                          </div>
                          <div className="glass-card p-3 border border-mind-purple/30">
                            <div className="text-mind-purple font-semibold text-sm">↓ Beta</div>
                            <div className="text-xs text-neural-gray">Stress Relief</div>
                          </div>
                          <div className="glass-card p-3 border border-mind-purple/30">
                            <div className="text-mind-purple font-semibold text-sm">↑ Theta</div>
                            <div className="text-xs text-neural-gray">Meditation</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {eegSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeStep
                        ? 'bg-neural-blue scale-125'
                        : 'bg-neural-gray/30 hover:bg-neural-blue/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Neural Mapping Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white font-orbitron drop-shadow-lg">
              How Neural Mapping Revolutionizes Mental Wellness
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Uniquely Yours",
                desc: "Every brain has its own neural fingerprint. Neural mapping creates your individual patterns for truly personalized mental wellness.",
                color: "neural-blue"
              },
              {
                icon: Zap,
                title: "Real-Time Adaptation",
                desc: "Dynamic monitoring adjusts to your changing mental states, providing support exactly when you need it.",
                color: "mind-purple"
              },
              {
                icon: Shield,
                title: "Preventive Care",
                desc: "Detect early warning signs before they become problems, maintaining optimal mental health proactively.",
                color: "neural-blue"
              },
              {
                icon: Target,
                title: "Precision Training",
                desc: "Neurofeedback protocols precisely calibrated to your brain's optimal patterns for maximum effectiveness.",
                color: "mind-purple"
              },
              {
                icon: TrendingUp,
                title: "Measurable Progress",
                desc: "Track your cognitive improvements with objective neural metrics, not just subjective feelings.",
                color: "neural-blue"
              },
              {
                icon: Heart,
                title: "Holistic Wellness",
                desc: "Integrates with your lifestyle, sleep patterns, and daily rhythms for comprehensive mental health support.",
                color: "mind-purple"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="glass-card p-8 rounded-2xl border border-neural-blue/30 hover:border-neural-blue/50 transition-all duration-300 group shadow-xl">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 bg-${feature.color}/20 rounded-xl group-hover:bg-${feature.color}/30 transition-colors border border-${feature.color}/30`}>
                      <IconComponent className={`h-8 w-8 text-${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                        {feature.title}
                      </h3>
                      <p className="text-neural-gray leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden border border-neural-blue/30 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/5 to-mind-purple/5"></div>
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-ghost-white font-orbitron">
                  Complete Neural Optimization Process
                </h2>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { 
                  icon: Eye, 
                  title: 'Scan', 
                  desc: 'Advanced EEG sensors safely read your brainwaves with research-grade precision',
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
                  title: 'Map', 
                  desc: 'System learns your personal baseline and creates your individual neural profile',
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
                      <div className={`w-20 h-20 glass-card border border-neural-blue/30 rounded-full flex items-center justify-center mx-auto group-hover:border-neural-blue/50 transition-all shadow-xl`}>
                        <IconComponent className={`h-10 w-10 text-${step.color}`} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-neural-blue to-mind-purple rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
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
    </div>
  );
};

export default TechnologyStreamlined;