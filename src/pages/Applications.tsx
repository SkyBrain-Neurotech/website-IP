import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Briefcase, 
  Gamepad2, 
  GraduationCap, 
  Heart, 
  Home, 
  Glasses,
  Monitor,
  Zap,
  Target,
  Activity,
  Clock,
  TrendingUp,
  Shield,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Waves,
  Sparkles
} from 'lucide-react';

const Applications = () => {
  const [activeScenario, setActiveScenario] = useState<string>('productivity');
  const [isSimulating, setIsSimulating] = useState(false);
  const [brainwaveData, setBrainwaveData] = useState({
    focus: 75,
    stress: 30,
    relaxation: 60,
    cognitive_load: 45
  });

  // Simulate real-time brainwave data
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setBrainwaveData(prev => ({
        focus: Math.max(0, Math.min(100, prev.focus + (Math.random() - 0.5) * 10)),
        stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 8)),
        relaxation: Math.max(0, Math.min(100, prev.relaxation + (Math.random() - 0.5) * 6)),
        cognitive_load: Math.max(0, Math.min(100, prev.cognitive_load + (Math.random() - 0.5) * 12))
      }));
    }, 800);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const applications = [
    {
      id: 'productivity',
      title: 'Workplace Productivity',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      description: 'Transform your work performance with real-time cognitive monitoring',
      realWorldBenefit: 'Increase productivity by 40% with optimized focus states',
      useCases: [
        'Deep work session optimization',
        'Meeting fatigue detection',
        'Attention span analytics',
        'Cognitive break suggestions'
      ],
      simulation: {
        title: "You're in a 2-hour coding session...",
        scenario: "Your BCI detects declining focus after 45 minutes and suggests a 5-minute break. Post-break, your focus score increases by 35%.",
        metrics: ['Focus', 'Cognitive Load', 'Mental Fatigue']
      }
    },
    {
      id: 'smart-glasses',
      title: 'Smart Glasses Integration',
      icon: Glasses,
      color: 'from-purple-500 to-pink-500',
      description: 'Seamless BCI integration with AR/VR smart glasses for enhanced experiences',
      realWorldBenefit: 'Hands-free control and enhanced spatial computing',
      useCases: [
        'Mind-controlled AR interface navigation',
        'Stress-adaptive display brightness',
        'Focus-based content filtering',
        'Cognitive load-aware notification management'
      ],
      simulation: {
        title: "Walking through a busy mall with smart glasses...",
        scenario: "Your BCI detects information overload and automatically filters non-essential AR overlays, reducing cognitive stress by 60%.",
        metrics: ['Attention', 'Information Processing', 'Visual Stress']
      }
    },
    {
      id: 'gaming',
      title: 'Gaming & Entertainment',
      icon: Gamepad2,
      color: 'from-green-500 to-emerald-500',
      description: 'Next-generation gaming with mind-machine interfaces',
      realWorldBenefit: 'Immersive experiences beyond traditional controllers',
      useCases: [
        'Thought-controlled gameplay',
        'Emotional state-adaptive storylines',
        'Mental training games',
        'Multiplayer empathy experiences'
      ],
      simulation: {
        title: "Playing a strategy game with BCI controls...",
        scenario: "Your stress levels trigger defensive strategies automatically, while high focus states unlock special abilities in real-time.",
        metrics: ['Engagement', 'Stress Response', 'Flow State']
      }
    },
    {
      id: 'education',
      title: 'Personalized Learning',
      icon: GraduationCap,
      color: 'from-orange-500 to-red-500',
      description: 'Adaptive education based on cognitive states and learning patterns',
      realWorldBenefit: 'Improve learning retention by 65% with personalized pacing',
      useCases: [
        'Optimal learning state detection',
        'Personalized content delivery',
        'Attention tracking during lectures',
        'Memory consolidation optimization'
      ],
      simulation: {
        title: "Studying for an important exam...",
        scenario: "BCI detects your optimal learning windows and adjusts study material difficulty. Memory retention improves by 45% with perfectly timed review sessions.",
        metrics: ['Comprehension', 'Memory Formation', 'Attention Span']
      }
    },
    {
      id: 'healthcare',
      title: 'Mental Wellness',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      description: 'Proactive mental health monitoring and intervention',
      realWorldBenefit: 'Early detection and prevention of mental health issues',
      useCases: [
        'Depression risk assessment',
        'Anxiety level monitoring',
        'Meditation effectiveness tracking',
        'Sleep quality optimization'
      ],
      simulation: {
        title: "Managing work-related stress...",
        scenario: "Your BCI detects early signs of burnout and recommends personalized interventions. Stress levels decrease by 50% with guided breathing exercises.",
        metrics: ['Stress Levels', 'Emotional State', 'Recovery Rate']
      }
    },
    {
      id: 'smart-home',
      title: 'Smart Home Control',
      icon: Home,
      color: 'from-indigo-500 to-purple-500',
      description: 'Seamless home automation through neural interfaces',
      realWorldBenefit: 'Effortless control without physical interaction',
      useCases: [
        'Thought-controlled lighting',
        'Mood-based environment adjustment',
        'Sleep pattern optimization',
        'Accessibility for mobility impaired'
      ],
      simulation: {
        title: "Returning home after a long day...",
        scenario: "Your BCI detects fatigue and automatically dims lights, plays calming music, and adjusts temperature for optimal relaxation.",
        metrics: ['Comfort Level', 'Energy State', 'Relaxation Index']
      }
    }
  ];

  const activeApp = applications.find(app => app.id === activeScenario);

  return (
    <PageLayout>
      <div className="min-h-screen pt-24 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
              <Brain className="h-5 w-5 text-neural-blue animate-pulse" />
              <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase">
                Experience the Future
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="text-ghost-white">Live</span>{' '}
              <span className="neural-gradient bg-clip-text text-transparent font-orbitron">
                BCI Applications
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-12">
              Step into immersive scenarios and experience how Brain-Computer Interface technology 
              transforms every aspect of human life - from work to wellness, entertainment to education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setIsSimulating(!isSimulating)}
                className="cyber-button text-deep-space font-bold px-8 py-4 text-lg rounded-xl group"
              >
                {isSimulating ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Pause Simulation
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Start Live Simulation
                  </>
                )}
              </Button>
              
              {isSimulating && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                  <Activity className="mr-2 h-4 w-4 animate-pulse" />
                  Live Brainwave Data
                </Badge>
              )}
            </div>
          </div>

          {/* Live Brainwave Visualization */}
          {isSimulating && (
            <div className="glass-card rounded-2xl p-8 mb-16 border border-neural-blue/30">
              <h3 className="text-2xl font-bold text-ghost-white mb-6 font-orbitron text-center">
                Real-Time Neural Activity
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(brainwaveData).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="relative h-24 w-24 mx-auto mb-3">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-neural-gray/20"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${value * 2.51} 251`}
                          className="text-neural-blue transition-all duration-500"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-ghost-white">
                          {Math.round(value)}%
                        </span>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-neural-blue capitalize mb-1">
                      {key.replace('_', ' ')}
                    </h4>
                    <div className="h-1 bg-neural-gray/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-neural-blue to-mind-purple transition-all duration-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Application Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {applications.map((app) => {
              const IconComponent = app.icon;
              const isActive = activeScenario === app.id;
              
              return (
                <Card
                  key={app.id}
                  className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isActive ? 'border-neural-blue/50 bg-neural-blue/10' : 'border-neural-blue/20'
                  }`}
                  onClick={() => setActiveScenario(app.id)}
                >
                  <CardContent className="p-8">
                    <div className={`p-4 bg-gradient-to-r ${app.color} bg-opacity-20 rounded-xl w-fit mb-6`}>
                      <IconComponent className="h-8 w-8 text-neural-blue" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                      {app.title}
                    </h3>
                    
                    <p className="text-neural-gray mb-4 leading-relaxed">
                      {app.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-neural-blue font-semibold mb-4">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {app.realWorldBenefit}
                    </div>
                    
                    <Button
                      variant={isActive ? 'default' : 'outline'}
                      className={`w-full ${isActive ? 'cyber-button' : 'glass-card border-neural-blue/30'}`}
                    >
                      {isActive ? 'Experiencing' : 'Experience Now'}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Active Scenario Details */}
          {activeApp && (
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-neural-blue/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Scenario Description */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className={`p-4 bg-gradient-to-r ${activeApp.color} bg-opacity-20 rounded-xl mr-4`}>
                      <activeApp.icon className="h-10 w-10 text-neural-blue" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-ghost-white font-orbitron">
                        {activeApp.title}
                      </h2>
                      <p className="text-neural-blue font-semibold">
                        Live Experience Simulation
                      </p>
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-6 mb-8 bg-gradient-to-br from-neural-blue/10 to-mind-purple/10">
                    <h3 className="text-lg font-bold text-neural-blue mb-3">
                      {activeApp.simulation.title}
                    </h3>
                    <p className="text-ghost-white leading-relaxed text-lg">
                      {activeApp.simulation.scenario}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-ghost-white mb-4 font-orbitron">
                      Key Use Cases
                    </h4>
                    <div className="space-y-3">
                      {activeApp.useCases.map((useCase, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
                          <span className="text-neural-gray">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Metrics & Controls */}
                <div>
                  <h4 className="text-lg font-bold text-ghost-white mb-6 font-orbitron">
                    Neural Metrics Monitor
                  </h4>
                  
                  <div className="space-y-6 mb-8">
                    {activeApp.simulation.metrics.map((metric, index) => {
                      const value = Object.values(brainwaveData)[index] || Math.random() * 100;
                      return (
                        <div key={metric} className="glass-card rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-neural-blue font-semibold">{metric}</span>
                            <span className="text-ghost-white font-bold">{Math.round(value)}%</span>
                          </div>
                          <div className="h-2 bg-neural-gray/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-neural-blue to-mind-purple transition-all duration-1000"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="glass-card rounded-lg p-4 text-center">
                      <Eye className="h-6 w-6 text-neural-blue mx-auto mb-2" />
                      <div className="text-sm text-neural-gray">Focus State</div>
                      <div className="text-lg font-bold text-ghost-white">Optimal</div>
                    </div>
                    <div className="glass-card rounded-lg p-4 text-center">
                      <Waves className="h-6 w-6 text-neural-blue mx-auto mb-2" />
                      <div className="text-sm text-neural-gray">Brain Waves</div>
                      <div className="text-lg font-bold text-ghost-white">Alpha</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full glass-card border-neural-blue/30 text-neural-blue hover:bg-neural-blue/10"
                      onClick={() => setBrainwaveData({
                        focus: Math.random() * 100,
                        stress: Math.random() * 100,
                        relaxation: Math.random() * 100,
                        cognitive_load: Math.random() * 100
                      })}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Randomize Scenario
                    </Button>
                    
                    <Button className="w-full cyber-button text-deep-space font-bold">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Schedule Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
          <div className="glass-card rounded-3xl p-12 border border-neural-blue/30">
            <h2 className="text-3xl font-bold text-ghost-white mb-6 font-orbitron">
              Ready to Experience BCI Technology?
            </h2>
            <p className="text-xl text-neural-gray mb-8 leading-relaxed">
              Join our beta program and be among the first to experience the future of human-computer interaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="cyber-button text-deep-space font-bold px-8 py-4 text-lg rounded-xl">
                Join Beta Program
              </Button>
              <Button variant="outline" className="glass-card border-neural-blue/30 text-neural-blue px-8 py-4 text-lg rounded-xl">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Applications;