import React, { useState, useEffect } from 'react';
import { Users, Brain, Zap, Target, PlayCircle, CheckCircle, ArrowRight, Activity, Shield, Heart, Smartphone, Headphones, Settings, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const UserExperienceFlow = () => {
  const [activePhase, setActivePhase] = useState(0);

  // Manual phase navigation
  const handlePhaseClick = (phaseIndex: number) => {
    setActivePhase(phaseIndex);
  };

  // Touch/swipe handling
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      
      // Only handle horizontal swipes (ignore vertical scrolling)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swipe left - next phase
          handlePhaseClick(activePhase < phases.length - 1 ? activePhase + 1 : 0);
        } else {
          // Swipe right - previous phase
          handlePhaseClick(activePhase > 0 ? activePhase - 1 : phases.length - 1);
        }
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activePhase]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePhaseClick(activePhase > 0 ? activePhase - 1 : phases.length - 1);
      } else if (e.key === 'ArrowRight') {
        handlePhaseClick(activePhase < phases.length - 1 ? activePhase + 1 : 0);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activePhase]);

  const phases = [
    {
      id: 'onboarding',
      title: 'Getting Started',
      subtitle: 'Your Journey Begins',
      icon: Users,
      color: 'neural-blue',
      steps: [
        {
          icon: Headphones,
          title: 'Easy Setup',
          description: 'Put on your comfortable EEG headset - no surgery, no implants',
          visual: '🎧',
          duration: '2 minutes'
        },
        {
          icon: Brain,
          title: 'Neural Calibration', 
          description: 'AI learns your unique brainwave patterns and baseline alpha frequency',
          visual: '🧠',
          duration: '5 minutes'
        },
        {
          icon: Settings,
          title: 'Personalization',
          description: 'Set your goals and preferences for mental wellness',
          visual: '⚙️',
          duration: '3 minutes'
        }
      ]
    },
    {
      id: 'training',
      title: 'Learning Your Brain',
      subtitle: 'AI Adaptation Phase',
      icon: Brain,
      color: 'mind-purple',
      steps: [
        {
          icon: Activity,
          title: 'iAPF Detection',
          description: 'System identifies your individual Alpha Peak Frequency (8-13 Hz)',
          visual: '📊',
          duration: '1 week'
        },
        {
          icon: Target,
          title: 'Pattern Recognition',
          description: 'AI learns your stress, focus, and relaxation signatures',
          visual: '🎯',
          duration: '2 weeks'
        },
        {
          icon: TrendingUp,
          title: 'Baseline Establishment',
          description: 'Creates your personal neural performance profile',
          visual: '📈',
          duration: '1 month'
        }
      ]
    },
    {
      id: 'optimization',
      title: 'Real-Time Optimization',
      subtitle: 'Your AI Assistant Active',
      icon: Zap,
      color: 'neural-blue',
      steps: [
        {
          icon: Shield,
          title: 'Predictive Monitoring',
          description: 'Detects stress and cognitive fatigue before you feel it',
          visual: '🛡️',
          duration: 'Continuous'
        },
        {
          icon: Heart,
          title: 'Instant Interventions',
          description: 'Provides personalized neurofeedback at your optimal frequency',
          visual: '💗',
          duration: 'As needed'
        },
        {
          icon: Smartphone,
          title: 'Smart Notifications',
          description: 'Gentle guidance for optimal cognitive performance',
          visual: '📱',
          duration: '24/7'
        }
      ]
    },
    {
      id: 'mastery',
      title: 'Peak Performance',
      subtitle: 'Optimized Living',
      icon: Target,
      color: 'mind-purple',
      steps: [
        {
          icon: Brain,
          title: 'Cognitive Enhancement',
          description: 'Sustained improvements in focus, memory, and mental clarity',
          visual: '✨',
          duration: 'Ongoing'
        },
        {
          icon: TrendingUp,
          title: 'Performance Tracking',
          description: 'Detailed analytics show your cognitive improvement over time',
          visual: '📊',
          duration: 'Monthly reports'
        },
        {
          icon: CheckCircle,
          title: 'Lifestyle Integration',
          description: 'BCI becomes a seamless part of your optimized daily routine',
          visual: '🎯',
          duration: 'Lifetime'
        }
      ]
    }
  ];

  const userTypes = [
    {
      title: 'Busy Professional',
      scenario: 'Sarah, 32, Marketing Executive',
      journey: 'Wants to manage work stress and improve focus during long meetings',
      outcome: '40% reduction in stress, 25% increase in productivity'
    },
    {
      title: 'Student & Learner',
      scenario: 'Alex, 24, Graduate Student',
      journey: 'Needs better concentration for studying and reduced test anxiety',
      outcome: '60% improvement in focus, 50% less anxiety during exams'
    },
    {
      title: 'Wellness Enthusiast',
      scenario: 'Maya, 45, Yoga Instructor',
      journey: 'Wants to deepen meditation practice and help clients achieve flow states',
      outcome: 'Deeper meditation states, enhanced emotional regulation'
    },
    {
      title: 'Performance Athlete',
      scenario: 'David, 28, Professional Athlete',
      journey: 'Seeking mental edge in competition and faster recovery',
      outcome: '30% faster reaction time, improved mental resilience'
    }
  ];

  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      {/* Background neural network */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="neural-network-pattern">
          <defs>
            <pattern id="neural-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#00D4FF" opacity="0.3" />
              <line x1="50" y1="50" x2="100" y2="50" stroke="#00D4FF" strokeWidth="1" opacity="0.2" />
              <line x1="50" y1="50" x2="50" y2="100" stroke="#00D4FF" strokeWidth="1" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-8 rounded-full">
            <PlayCircle className="h-5 w-5 text-neural-blue animate-pulse" />
            <span className="text-sm font-semibold text-neural-gray tracking-wide font-orbitron uppercase">
              Your Complete Journey
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">How</span>{' '}
            <span className="text-neural-blue font-orbitron neural-glow">
              SkyBrain Neurotech
            </span>{' '}
            <span className="text-ghost-white">Works</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-12">
            From your first session to peak cognitive performance
            <br className="hidden md:block" />
            <span className="text-neural-blue font-semibold">Experience the complete transformation</span>
          </p>
          
          {/* Clean Neural Background */}
          <div className="relative mb-12">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100" className="max-w-4xl mx-auto">
                <defs>
                  <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 50 Q 200 30 400 50 T 800 50"
                  stroke="url(#neuralGradient)"
                  strokeWidth="1"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

        </div>

        {/* Phase Navigation - Game-like Controls */}
        <div className="flex justify-center items-center mb-12 space-x-4">
          {/* Previous Button */}
          <button
            onClick={() => handlePhaseClick(activePhase > 0 ? activePhase - 1 : phases.length - 1)}
            className="glass-card p-3 rounded-full hover:bg-neural-blue/10 transition-all duration-300 group"
          >
            <ChevronLeft className="h-5 w-5 text-neural-blue group-hover:text-ghost-white" />
          </button>

          {/* Current Phase Display */}
          <div className="glass-card rounded-full px-6 py-3 min-w-[280px] text-center">
            <div className="flex items-center justify-center space-x-3">
              {React.createElement(phases[activePhase].icon, { className: "h-5 w-5 text-neural-blue animate-pulse" })}
              <div>
                <div className="text-sm font-semibold text-neural-blue font-orbitron">
                  {phases[activePhase].title}
                </div>
                <div className="text-xs text-neural-gray">
                  {activePhase + 1} of {phases.length}
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePhaseClick(activePhase < phases.length - 1 ? activePhase + 1 : 0)}
            className="glass-card p-3 rounded-full hover:bg-neural-blue/10 transition-all duration-300 group"
          >
            <ChevronRight className="h-5 w-5 text-neural-blue group-hover:text-ghost-white" />
          </button>
        </div>

        {/* Phase Indicator Dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {phases.map((_, index) => (
              <button
                key={index}
                onClick={() => handlePhaseClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activePhase
                    ? 'bg-neural-blue scale-125'
                    : 'bg-neural-gray/30 hover:bg-neural-blue/50'
                }`}
              />
            ))}
          </div>
        </div>
        

        {/* Active Phase Content - Fixed Height Container */}
        <div className="mb-16 relative min-h-[600px]">
          {phases.map((phase, phaseIndex) => (
            <div
              key={phase.id}
              className={`transition-all duration-500 ease-in-out ${
                activePhase === phaseIndex 
                  ? 'opacity-100 translate-x-0' 
                  : activePhase > phaseIndex 
                  ? 'opacity-0 -translate-x-full absolute pointer-events-none'
                  : 'opacity-0 translate-x-full absolute pointer-events-none'
              }`}
            >
              <div className="text-center mb-8">
                <div className="inline-flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 mb-6">
                  <div className={`p-3 md:p-4 bg-${phase.color}/20 rounded-2xl transition-all duration-300`}>
                    <phase.icon className={`h-6 w-6 md:h-8 md:w-8 text-${phase.color} animate-pulse`} />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-ghost-white font-orbitron">{phase.title}</h2>
                    <p className={`text-base md:text-lg text-${phase.color} font-semibold`}>{phase.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Fixed Height Card Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {phase.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="glass-card p-4 md:p-6 hover:border-neural-blue/30 transition-all duration-300 group h-80 flex flex-col"
                    style={{ 
                      animationDelay: `${stepIndex * 100}ms`
                    }}
                  >
                    <div className="text-center mb-4 flex-shrink-0">
                      <div className="relative mb-3">
                        <div className={`p-3 md:p-4 bg-${phase.color}/20 rounded-xl mx-auto w-fit group-hover:scale-110 transition-transform`}>
                          <step.icon className={`h-6 w-6 md:h-8 md:w-8 text-${phase.color}`} />
                        </div>
                      </div>
                      
                      <div className={`inline-block px-2 md:px-3 py-1 bg-${phase.color}/10 rounded-full mb-3`}>
                        <span className={`text-xs md:text-sm font-semibold text-${phase.color}`}>{step.duration}</span>
                      </div>
                    </div>

                    <div className="flex-grow flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold text-ghost-white mb-3 font-orbitron group-hover:text-neural-blue transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-neural-gray leading-relaxed group-hover:text-ghost-white transition-colors flex-grow">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Journey Examples */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-ghost-white font-orbitron">
            Real User Journeys
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {userTypes.map((user, index) => (
              <div 
                key={user.title}
                className="glass-card p-4 md:p-8 hover:border-neural-blue/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-neural-blue to-mind-purple rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg font-orbitron">
                    {user.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-ghost-white font-orbitron">{user.title}</h3>
                    <p className="text-sm md:text-base text-neural-blue font-semibold">{user.scenario}</p>
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-neural-gray uppercase tracking-wide mb-2">Challenge</h4>
                    <p className="text-sm md:text-base text-ghost-white">{user.journey}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-neural-gray uppercase tracking-wide mb-2">Results</h4>
                    <p className="text-sm md:text-base text-neural-blue font-semibold">{user.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ghost-white mb-6 md:mb-8 font-orbitron">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-neural-gray mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands who have already unlocked their neural potential with personalized brain-computer interface technology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6">
            <button className="cyber-button bg-neural-blue text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl group transform hover:scale-105 transition-all duration-300 text-sm md:text-base">
              <Brain className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
              Start Your Journey
              <ArrowRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button className="glass-card border-neural-blue/40 text-neural-blue hover:bg-neural-blue/10 font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl group transform hover:scale-105 transition-all duration-300 text-sm md:text-base">
              <PlayCircle className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 group-hover:scale-125 transition-transform" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserExperienceFlow;