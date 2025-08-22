import React, { useState, useEffect } from 'react';
import { Brain, Zap, Activity, Target, Users, Shield, Waves, TrendingUp, Eye, Heart, MonitorSpeaker, Cpu, ChevronLeft, ChevronRight, Play, Pause, Headphones } from 'lucide-react';

const TechnologyStreamlined = () => {
  const [activeFreq, setActiveFreq] = useState(10.2);
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Neural Wellness Process
  const eegSteps = [
    {
      title: "Neural Signal Capture",
      description: "Professional-grade sensors safely monitor your brain's natural electrical activity.",
      content: "Our advanced monitoring system captures your neural patterns with clinical precision. This comprehensive approach ensures we understand your complete mental wellness profile safely and non-invasively.",
      visual: Brain,
      color: "neural-blue"
    },
    {
      title: "Cognitive State Recognition",
      description: "AI algorithms identify patterns for focus, creativity, stress, and relaxation states.",
      content: "Intelligent systems trained on extensive research recognize your unique mental state signatures. We identify when you're in optimal flow states, experiencing stress, or achieving deep focus.",
      visual: Eye,
      color: "mind-purple"
    },
    {
      title: "Personal Profile Analysis",
      description: "Extract your unique neural biomarkers and patterns for true personalization.",
      content: "Your individual neural profile serves as your wellness baseline. We create a comprehensive map of your mental patterns, attention markers, and cognitive preferences for optimal support.",
      visual: Activity,
      color: "neural-blue"
    },
    {
      title: "Targeted Intervention",
      description: "Custom recommendations and wellness protocols designed specifically for you.",
      content: "Based on your unique neural signature, we provide personalized interventions. These include meditation protocols, attention training, and cognitive enhancement techniques tailored to your specific brain patterns.",
      visual: Target,
      color: "mind-purple"
    }
  ];

  // Safe Technology Features
  const features = [
    {
      icon: Shield,
      title: "Complete Safety",
      description: "Non-invasive monitoring with clinical-grade safety standards",
      gradient: "from-neural-blue to-mind-purple"
    },
    {
      icon: Users,
      title: "Personal Wellness",
      description: "Individual mental health optimization and support",
      gradient: "from-mind-purple to-neural-blue"
    },
    {
      icon: Brain,
      title: "Research-Based",
      description: "Founded on years of neuroscience research and validation",
      gradient: "from-neural-blue to-mind-purple"
    }
  ];

  const frequencies = [
    { name: "Delta", range: "0.5-4 Hz", state: "Deep Sleep", color: "bg-purple-500" },
    { name: "Theta", range: "4-8 Hz", state: "Creativity", color: "bg-blue-500" },
    { name: "Alpha", range: "8-13 Hz", state: "Relaxation", color: "bg-green-500" },
    { name: "Beta", range: "13-30 Hz", state: "Focus", color: "bg-yellow-500" },
    { name: "Gamma", range: "30-50 Hz", state: "Awareness", color: "bg-red-500" }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % eegSteps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, eegSteps.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFreq(prev => {
        const variation = (Math.random() - 0.5) * 0.4;
        return Math.max(8, Math.min(12, prev + variation));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % eegSteps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + eegSteps.length) % eegSteps.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-space via-shadow-black to-deep-space relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(107,70,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neural-blue via-mind-purple to-neural-blue bg-clip-text text-transparent">
              Neural Wellness
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Safe, non-invasive brain monitoring for personal mental health optimization
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div className="bg-shadow-black/50 backdrop-blur-sm rounded-2xl p-8 border border-neural-blue/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-ghost-white">EEG Monitoring Process</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="p-2 rounded-lg bg-neural-blue/20 hover:bg-neural-blue/30 transition-colors"
                  >
                    {isAutoPlay ? <Pause className="w-5 h-5 text-neural-blue" /> : <Play className="w-5 h-5 text-neural-blue" />}
                  </button>
                  <button onClick={prevStep} className="p-2 rounded-lg bg-neural-blue/20 hover:bg-neural-blue/30 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-neural-blue" />
                  </button>
                  <button onClick={nextStep} className="p-2 rounded-lg bg-neural-blue/20 hover:bg-neural-blue/30 transition-colors">
                    <ChevronRight className="w-5 h-5 text-neural-blue" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {eegSteps.map((step, index) => {
                  const IconComponent = step.visual;
                  const isActive = activeStep === index;
                  
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border transition-all duration-500 cursor-pointer ${
                        isActive 
                          ? `border-${step.color}/50 bg-${step.color}/10 shadow-lg shadow-${step.color}/20` 
                          : 'border-neural-gray/20 bg-shadow-black/30 hover:border-neural-blue/30'
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${isActive ? `bg-${step.color}/20` : 'bg-neural-gray/20'} transition-colors`}>
                          <IconComponent className={`w-6 h-6 ${isActive ? `text-${step.color}` : 'text-neural-gray'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-lg font-semibold mb-2 ${isActive ? 'text-ghost-white' : 'text-neural-gray'}`}>
                            {step.title}
                          </h4>
                          <p className={`text-sm mb-3 ${isActive ? 'text-neural-gray' : 'text-neural-gray/70'}`}>
                            {step.description}
                          </p>
                          {isActive && (
                            <p className="text-ghost-white/90 text-sm leading-relaxed animate-fade-in-up">
                              {step.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-shadow-black/50 backdrop-blur-sm rounded-2xl p-8 border border-neural-blue/20">
              <div className="flex items-center space-x-3 mb-6">
                <Waves className="w-6 h-6 text-neural-blue" />
                <h3 className="text-2xl font-bold text-ghost-white">Live Neural Activity</h3>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-neural-blue mb-2">{activeFreq.toFixed(1)} Hz</div>
                  <p className="text-neural-gray">Current Alpha Frequency</p>
                </div>
                
                <div className="space-y-4">
                  {frequencies.map((freq, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-deep-space/30 rounded-lg">
                      <div>
                        <div className="font-semibold text-ghost-white">{freq.name}</div>
                        <div className="text-sm text-neural-gray">{freq.range}</div>
                      </div>
                      <div className="text-right">
                        <div className={`w-3 h-3 rounded-full ${freq.color} animate-pulse`}></div>
                        <div className="text-sm text-neural-gray mt-1">{freq.state}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-shadow-black/50 backdrop-blur-sm rounded-xl p-6 border border-neural-blue/20 hover:border-neural-blue/40 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient}`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-ghost-white mb-1">{feature.title}</h4>
                        <p className="text-neural-gray text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-neural-blue/20 rounded-full border border-neural-blue/30">
            <Headphones className="w-5 h-5 text-neural-blue" />
            <span className="text-neural-blue font-medium">Safe • Non-invasive • Personalized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyStreamlined;