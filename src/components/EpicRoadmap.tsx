import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Zap, 
  Brain, 
  Users, 
  Shield, 
  Rocket,
  Lightbulb,
  Target,
  Cpu,
  Heart,
  Award,
  Globe,
  ChevronLeft,
  ChevronRight,
  Bell
} from 'lucide-react';
import { showComingSoonNotification } from '@/lib/notifications';

interface RoadmapPhase {
  id: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'in-progress' | 'pending' | 'planned';
  timeline: string;
  icon: React.ElementType;
  color: string;
  description: string;
  keyFeatures: string[];
  milestones: {
    title: string;
    description: string;
    status: 'done' | 'in-progress' | 'planned';
    visual: React.ElementType;
    details: string[];
  }[];
}

const EpicRoadmap = () => {
  const [activePhase, setActivePhase] = useState<string>('foundation');
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  // Fixed particles to prevent re-randomization on re-renders
  const [particles] = useState(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 2
    }))
  );

  const phases: RoadmapPhase[] = [
    {
      id: 'foundation',
      title: 'Foundation',
      subtitle: 'Core BCI Technology',
      status: 'in-progress',
      timeline: 'Q1 2025',
      icon: Brain,
      color: 'blue',
      description: 'Building the fundamental brain-computer interface technology that powers all SkyBrain capabilities. This phase establishes our core neural signal processing pipeline, hardware integration, and the foundational algorithms that enable real-time brain activity monitoring and analysis.',
      keyFeatures: [
        'Neural signal acquisition',
        'High-precision monitoring',
        'Real-time processing',
        'Advanced signal enhancement',        'Cross-platform compatibility'
      ],
      milestones: [
        { 
          title: 'Neural Signal Processing', 
          description: 'Advanced algorithms for extracting meaningful neural information with sophisticated enhancement and artifact removal.',
          status: 'done', 
          visual: Zap,
          details: [
            'Digital signal processing',
            'Artifact detection and removal',
            'Pattern analysis',
            'Cloud processing'          ]
        },
        { 
          title: 'Hardware Integration', 
          description: 'Integration with professional-grade monitoring hardware while developing our proprietary devices for future launch.',
          status: 'done', 
          visual: Cpu,
          details: [
            'Professional hardware compatibility',
            'Low-latency data transmission',
            'Robust connection protocols',
            'Proprietary hardware development'          ]
        },
        { 
          title: 'Pattern Recognition', 
          description: 'AI-powered identification of mental states, focus levels, and cognitive patterns from processed neural signals.',
          status: 'done', 
          visual: Target,
          details: [
            'Machine learning models',
            'Mental state classification',
            'Focus, Relaxation level detection',
            'Personal profile extraction'          ]
        }
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy',
      subtitle: 'Data Security & Protection',
      status: 'pending',
      timeline: 'Q2 2025',
      icon: Shield,
      color: 'purple',
      description: 'Implementing robust privacy-first architecture to ensure user neural data remains secure, private, and under complete user control. This phase focuses on building trust through transparency, encryption, and giving users ownership of their most sensitive data.',
      keyFeatures: [
        'Military-grade encryption',
        'Privacy-first processing',
        'Local storage options',
        'GDPR & HIPAA compliance',
        'Secure consent tracking'      ],
      milestones: [
        { 
          title: 'End-to-End Encryption', 
          description: 'Enterprise-grade encryption protocols for all neural data transmission and storage, ensuring complete privacy protection from device to cloud.',
          status: 'done', 
          visual: Shield,
          details: [
            'AES-256 encryption standard',
            'Encrypted data transmission',
            'Secure key management',
            'Zero-trust architecture'
          ]
        },
        { 
          title: 'Privacy by Design', 
          description: 'Comprehensive privacy framework with GDPR & HIPAA compliance, secure data handling, and robust retention policies.',
          status: 'done', 
          visual: Users,
          details: [
            'GDPR & HIPAA compliance',
            'Solid retention & deletion policies',
            'Secure encrypt/decrypt protocols',
            'Anonymized datasets protection'
          ]
        },
        { 
          title: 'Secure Data Ownership', 
          description: 'Advanced system securing data ownership, control, and ethical participation opportunities for users.',          status: 'in-progress', 
          visual: Target,
          details: [
            'Secure data ownership protocols',
            'User-controlled data lifetime',
            'Ethical usage permissions',
            'Participation reward framework'          ]
        }
      ],
    },
    {
      id: 'intelligence',
      title: 'Intelligence',
      subtitle: 'AI Framework',
      status: 'pending',
      timeline: 'Q3 - Q4 2025',
      icon: Lightbulb,
      color: 'purple',
      description: 'Advanced intelligent Adaptive Personal Framework that learns from your unique neural patterns to provide personalized mental wellness optimization. This AI system adapts to individual signatures, delivering increasingly effective interventions tailored to each user.',      keyFeatures: [
        'Personalized AI models',
        'Adaptive learning algorithms',
        'Real-time optimization',
        'Mental state prediction',
        'Behavioral pattern analysis'
      ],
      milestones: [
        { 
          title: 'AI Model Architecture', 
          description: 'Deep learning framework specifically designed for pattern analysis and personalized mental health insights with continuous learning capabilities.',
          status: 'in-progress', 
          visual: Brain,
          details: [
            'Intelligent network architecture',
            'Adaptive learning models',
            'Pattern recognition systems',
            'Continuous learning capabilities'          ]
        },
        { 
          title: 'Personal Learning Engine', 
          description: 'Adaptive AI that learns your unique neural signatures to provide increasingly personalized recommendations and interventions over time.',
          status: 'planned', 
          visual: Users,
          details: [
            'Individual pattern learning',
            'Personalized recommendations',
            'Adaptive feedback loops',
            'User preference modeling'
          ]
        },
        { 
          title: 'Real-time Optimization', 
          description: 'Instant cognitive enhancement recommendations based on current mental state, historical patterns, and environmental context.',
          status: 'planned', 
          visual: Target,
          details: [
            'Real-time analysis engine',
            'Contextual recommendations',
            'Dynamic intervention adjustment',
            'Performance optimization'
          ]
        }
      ],
    },
    {
      id: 'validation',
      title: 'Validation',
      subtitle: 'Clinical Trials & Testing',
      status: 'planned',
      timeline: 'Q1-Q3 2026',
      icon: Users,
      color: 'orange',
      description: 'Rigorous clinical validation and regulatory approval process to demonstrate safety, efficacy, and compliance. This phase secures CDSCO approval for India and UAE regulatory clearances for our target launch markets.',
      keyFeatures: [
        'CDSCO regulatory compliance',
        'MOHAP federal registration',
        'DHA & DoH approvals',
        'Peer-reviewed research',
        'Clinical safety validation'
      ],
      milestones: [
        { 
          title: 'Regulatory Approval Strategy', 
          description: 'Comprehensive regulatory strategy for our target launch markets ensuring full compliance with health authorities and medical device regulations.',
          status: 'in-progress', 
          visual: Award,
          details: [
            'Regional health authority approvals',
            'Federal regulatory compliance',
            'Medical device certifications',
            'Safety and efficacy validation'          ]
        },
        { 
          title: 'Trial Design', 
          description: 'Scientifically rigorous study protocols designed to validate safety and efficacy across diverse populations with measurable outcomes.',
          status: 'planned', 
          visual: Target,
          details: [
            'Clinical protocol development',
            'Outcome measurement design',
            'Statistical analysis planning',
            'Multi-site coordination'
          ]
        },
        { 
          title: 'Data Collection', 
          description: 'Systematic collection and analysis of clinical trial data to demonstrate platform efficacy, safety, and real-world effectiveness.',
          status: 'planned', 
          visual: Brain,
          details: [
            'Participant data collection',
            'Efficacy measurement',
            'Safety monitoring',
            'Statistical analysis'
          ]
        }
      ],
    },
    {
      id: 'launch',
      title: 'Launch',
      subtitle: 'Consumer Product Release',
      status: 'planned',
      timeline: 'Q4 2026',
      icon: Rocket,
      color: 'cyan',
      description: 'Global launch of SkyBrain consumer platform, bringing validated neurotechnology and mental wellness optimization to users worldwide. This marks the transition from research to real-world impact, democratizing access to advanced brain-computer interface technology.',
      keyFeatures: [
        'Consumer-ready hardware',
        'Intuitive mobile apps',
        'Global distribution',
        '24/7 customer support',
        'Continuous updates'
      ],
      milestones: [
        { 
          title: 'Product Design', 
          description: 'Final consumer product design with user-friendly interface, professional-grade neuromonitoring capabilities, and seamless user experience.',
          status: 'in-progress', 
          visual: Lightbulb,
          details: [
            'Industrial design finalization',
            'User interface optimization',
            'Ergonomic testing',
            'Aesthetic refinement'
          ]
        },
        { 
          title: 'Manufacturing', 
          description: 'Scaled manufacturing processes to produce high-quality, reliable neurotechnology devices for global distribution at consumer-friendly pricing.',
          status: 'planned', 
          visual: Cpu,
          details: [
            'Production line setup',
            'Quality assurance systems',
            'Supply chain optimization',
            'Cost efficiency measures'
          ]
        },
        { 
          title: 'Strategic Market Launch', 
          description: 'Targeted launch in key international markets with full regulatory compliance and region-specific strategies.',
          status: 'planned', 
          visual: Globe,
          details: [
            'International market entry',
            'Health authority compliance',
            'Regional regulatory alignment',
            'Strategic market expansion'          ]
        }
      ],
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 border-green-500';
      case 'in-progress': return 'text-neural-blue border-neural-blue';
      case 'pending': return 'text-neural-gray border-neural-gray';
      default: return 'text-neural-gray border-neural-gray';
    }
  };

  // Removed auto-cycling - now manual only

  const activePhaseData = phases.find(p => p.id === activePhase);

  return (
    <section className="pt-24 md:pt-32 pb-20 relative overflow-hidden">
      {/* Epic Background with Animated Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-shadow-black to-neural-blue/5"></div>
        
        {/* Removed animated grid background */}
        
        {/* Floating Neural Particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-neural-blue/20 rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Epic Header */}
        <div className="text-center mb-24 relative">
          {/* Central Brain Visualization */}
          <div className="absolute inset-0 flex justify-center items-center opacity-5">
            <div className="relative">
              <Brain className="h-80 w-80 text-neural-blue/50 animate-pulse" />
              {/* Orbiting Elements */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-neural-blue/30 rounded-full roadmap-orbital-sync"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translateX(${Math.cos((i * 45) * Math.PI / 180) * 200}px) translateY(${Math.sin((i * 45) * Math.PI / 180) * 200 - 50}px)`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            {/* Live Status Badge */}
            <div className="inline-flex items-center space-x-3 glass-card px-8 py-4 mb-12 rounded-full border border-neural-blue/30 shadow-md shadow-neural-blue/10">
              <div className="relative">
                <Rocket className="h-6 w-6 text-neural-blue" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400/70 rounded-full animate-pulse"></div>
              </div>
              <span className="text-base font-bold text-neural-blue tracking-wide font-orbitron uppercase">
                Live Progress • Active Development
              </span>
              <div className="w-3 h-3 bg-neural-blue/70 rounded-full animate-pulse"></div>
            </div>

            {/* Epic Main Title */}
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight relative">
              <span className="text-ghost-white">Our</span>{' '}
              <span className="neural-gradient bg-clip-text text-transparent font-orbitron">
                Journey
              </span>
            </h1>
            
            {/* Inspiring Subtitle */}
            <div className="text-2xl md:text-3xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-12">
              <div className="mb-4 text-ghost-white font-semibold">
                Building the Future of Mental Wellness
              </div>
              <div className="text-lg text-neural-blue font-semibold">
                From breakthrough research to life-changing technology
              </div>
            </div>
            
            {/* Timeline Badge */}
            <div className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-full border border-mind-purple/30 mb-8">
              <Clock className="h-5 w-5 text-mind-purple" />
              <span className="text-mind-purple font-bold font-orbitron">2025 - 2026 Roadmap</span>
            </div>

          </div>
        </div>

        {/* Epic Timeline Visualization - Mobile Vertical, Desktop Horizontal */}
        <div className="mb-16">
          {/* Desktop Horizontal Timeline */}
          <div className="hidden md:block">
            {/* Timeline Path */}
            <div className="relative flex justify-center items-center mb-32 px-4">
              
              {/* Phase Nodes */}
              <div className="relative flex justify-between items-center w-full max-w-4xl z-10">
                {phases.map((phase, index) => {
                  const isActive = phase.id === activePhase;
                  const isPast = phases.findIndex(p => p.id === activePhase) > index;
                  const IconComponent = phase.icon;
                  
                  return (
                    <button
                      key={phase.id}
                      onClick={() => setActivePhase(phase.id)}
                      className={`relative group transition-all duration-500 z-20 ${
                        isActive ? 'scale-125' : 'scale-100 hover:scale-110'
                      }`}
                    >
                      {/* Node Circle */}
                      <div className={`w-20 h-20 rounded-full border-4 transition-all duration-300 ${
                        isActive 
                          ? 'bg-neural-blue border-neural-blue shadow-lg shadow-neural-blue/50' 
                          : isPast 
                          ? 'bg-green-500 border-green-500' 
                          : 'bg-neural-gray/20 border-neural-gray/30 group-hover:border-neural-blue/50'
                      } flex items-center justify-center relative overflow-hidden`}>
                        
                        {/* Icon */}
                        <IconComponent className={`h-8 w-8 transition-all duration-300 ${
                          isActive 
                            ? 'text-white animate-pulse' 
                            : isPast 
                            ? 'text-white' 
                            : 'text-neural-gray group-hover:text-neural-blue'
                        }`} />
                        
                        {/* Active Pulse Ring */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-full border-4 border-neural-blue animate-ping opacity-75"></div>
                        )}
                        
                        {/* Completion Check */}
                        {isPast && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Phase Label */}
                      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center min-w-max z-10">
                        <div className={`font-bold font-orbitron transition-all duration-300 text-base ${
                          isActive 
                            ? 'text-neural-blue text-lg' 
                            : isPast 
                            ? 'text-green-400' 
                            : 'text-neural-gray group-hover:text-ghost-white'
                        }`}>
                          {phase.title}
                        </div>
                        <div className="text-xs text-neural-gray mt-1">
                          {phase.timeline}
                        </div>
                      </div>
                      
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="md:hidden px-4">
            <div className="relative max-w-md mx-auto">
              
              {/* Vertical Phase Nodes */}
              <div className="space-y-16">
                {phases.map((phase, index) => {
                  const isActive = phase.id === activePhase;
                  const isPast = phases.findIndex(p => p.id === activePhase) > index;
                  const IconComponent = phase.icon;
                  
                  return (
                    <button
                      key={phase.id}
                      onClick={() => setActivePhase(phase.id)}
                      className="flex items-start space-x-6 w-full text-left group relative"
                    >
                      {/* Node Circle - Higher z-index to appear above line */}
                      <div className="relative z-20">
                        <div className={`w-16 h-16 rounded-full border-4 transition-all duration-300 flex-shrink-0 ${
                          isActive 
                            ? 'bg-neural-blue border-neural-blue shadow-lg shadow-neural-blue/50' 
                            : isPast 
                            ? 'bg-green-500 border-green-500' 
                            : 'bg-neural-gray/20 border-neural-gray/30 group-hover:border-neural-blue/50'
                        } flex items-center justify-center relative overflow-hidden`}>
                          
                          {/* Icon */}
                          <IconComponent className={`h-6 w-6 transition-all duration-300 ${
                            isActive 
                              ? 'text-white animate-pulse' 
                              : isPast 
                              ? 'text-white' 
                              : 'text-neural-gray group-hover:text-neural-blue'
                          }`} />
                          
                          {/* Active Pulse Ring */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-full border-4 border-neural-blue animate-ping opacity-75"></div>
                          )}
                          
                          {/* Completion Check */}
                          {isPast && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Phase Info - Higher z-index and better aligned */}
                      <div className="flex-1 pt-2 relative z-10">
                        <div className={`font-bold font-orbitron transition-all duration-300 text-xl mb-2 ${
                          isActive 
                            ? 'text-neural-blue' 
                            : isPast 
                            ? 'text-green-400' 
                            : 'text-neural-gray group-hover:text-ghost-white'
                        }`}>
                          {phase.title}
                        </div>
                        <div className="text-base text-neural-gray mb-1 leading-relaxed">
                          {phase.subtitle}
                        </div>
                        <div className="text-sm text-neural-gray/80">
                          {phase.timeline}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Phase Navigation & Milestones - Mobile Responsive */}
        <div className="mt-32 mb-16 max-w-6xl mx-auto space-y-8 px-4">
          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4 md:space-x-6">
            <button
              onClick={() => {
                const currentIndex = phases.findIndex(p => p.id === activePhase);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : phases.length - 1;
                setActivePhase(phases[prevIndex].id);
              }}
              className="glass-card p-2 md:p-3 rounded-full hover:bg-neural-blue/10 transition-all duration-300 group border border-neural-blue/30 hover:border-neural-blue"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-neural-blue group-hover:text-ghost-white" />
            </button>

            <div className="glass-card rounded-xl px-4 py-2 md:px-6 md:py-3 text-center border border-neural-blue/30 min-w-[240px] md:min-w-[280px]">
              <div className="flex items-center justify-center space-x-2 md:space-x-3">
                {activePhaseData && React.createElement(activePhaseData.icon, { 
                  className: "h-5 w-5 md:h-6 md:w-6 text-neural-blue" 
                })}
                <div>
                  <div className="text-base md:text-lg font-bold text-neural-blue font-orbitron">
                    {activePhaseData?.title}
                  </div>
                  <div className="text-xs text-neural-gray">
                    Phase {(phases.findIndex(p => p.id === activePhase) + 1)} of {phases.length} • {activePhaseData?.timeline}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const currentIndex = phases.findIndex(p => p.id === activePhase);
                const nextIndex = currentIndex < phases.length - 1 ? currentIndex + 1 : 0;
                setActivePhase(phases[nextIndex].id);
              }}
              className="glass-card p-2 md:p-3 rounded-full hover:bg-neural-blue/10 transition-all duration-300 group border border-neural-blue/30 hover:border-neural-blue"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-neural-blue group-hover:text-ghost-white" />
            </button>
          </div>

          {/* Enhanced Phase Details */}
          {activePhaseData && (
            <div className="space-y-8">
              {/* Phase Description */}
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-lg text-neural-gray leading-relaxed mb-6">
                  {activePhaseData.description}
                </p>
                
                {/* Key Features */}
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                  {activePhaseData.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="glass-card px-3 py-2 rounded-lg border border-neural-blue/20">
                      <span className="text-sm text-neural-blue font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Legend */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-lg border border-green-500/30 bg-green-500/10">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-green-400 font-semibold text-sm">Completed</span>
                </div>
                <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-lg border border-neural-blue/30 bg-neural-blue/10">
                  <span className="text-neural-blue text-lg animate-pulse">⏳</span>
                  <span className="text-neural-blue font-semibold text-sm">In Progress</span>
                </div>
                <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-lg border border-orange-500/30 bg-orange-500/10">
                  <span className="text-orange-500 text-lg">📋</span>
                  <span className="text-orange-400 font-semibold text-sm">Planned</span>
                </div>
              </div>

              {/* Enhanced Milestones */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {activePhaseData.milestones.map((milestone, idx) => (
                  <div
                    key={milestone.title}
                    className={`glass-card p-4 md:p-6 rounded-xl border transition-all duration-300 hover:scale-105
                      ${milestone.status === 'done' ? 'border-green-500/40 bg-green-500/10' : 
                        milestone.status === 'in-progress' ? 'border-neural-blue/40 bg-neural-blue/10' : 
                        'border-orange-500/30 bg-orange-500/5'}
                    `}
                    onMouseEnter={() => setHoveredMilestone(milestone.title)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                  >
                    {/* Milestone Header */}
                    <div className="flex items-start space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        milestone.status === 'done' ? 'bg-green-500/20' : 
                        milestone.status === 'in-progress' ? 'bg-neural-blue/20' : 
                        'bg-orange-500/20'
                      }`}>
                        <milestone.visual className={`h-5 w-5 ${
                          milestone.status === 'done' ? 'text-green-500' :
                          milestone.status === 'in-progress' ? 'text-neural-blue animate-pulse' : 
                          'text-orange-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold font-orbitron mb-1 ${
                          milestone.status === 'done' ? 'text-green-400' :
                          milestone.status === 'in-progress' ? 'text-neural-blue' : 
                          'text-orange-400'
                        }`}>
                          {milestone.title}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-1">
                        {milestone.status === 'done' && <span className="text-green-500 text-lg">✓</span>}
                        {milestone.status === 'in-progress' && <span className="text-neural-blue animate-pulse text-lg">⏳</span>}
                        {milestone.status === 'planned' && <span className="text-orange-500 text-lg">📋</span>}
                      </div>
                    </div>
                    
                    {/* Milestone Description */}
                    <p className="text-sm text-neural-gray leading-relaxed mb-4">
                      {milestone.description}
                    </p>
                    
                    {/* Milestone Details */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-semibold text-ghost-white uppercase tracking-wide">Key Components</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {milestone.details.map((detail, detailIdx) => (
                          <div key={detailIdx} className="flex items-center space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              milestone.status === 'done' ? 'bg-green-500' :
                              milestone.status === 'in-progress' ? 'bg-neural-blue' : 
                              'bg-orange-500'
                            }`}></div>
                            <span className="text-xs text-neural-gray">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    {hoveredMilestone === milestone.title && (
                      <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/10 to-mind-purple/10 rounded-xl pointer-events-none"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action - Mobile Responsive */}
        <div className="glass-card rounded-2xl p-6 md:p-8 text-center border border-neural-blue/30 max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-ghost-white mb-4 font-orbitron">
            Follow Our Live Progress
          </h2>
          <p className="text-base md:text-lg text-neural-gray mb-8 max-w-xl mx-auto leading-relaxed">
            Real-time updates as we hit milestones. Join our community for instant notifications.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <button 
              onClick={() => showComingSoonNotification('Community Platform')}
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neural-blue to-mind-purple text-white font-bold rounded-xl group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-neural-blue/30"
            >
              <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Join Community
            </button>
            
            <button 
              onClick={() => showComingSoonNotification('Update Notifications')}
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 glass-card border border-neural-blue/40 text-neural-blue hover:bg-neural-blue/10 font-bold rounded-xl group hover:scale-105 transition-all duration-300"
            >
              <Bell className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Get Updates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpicRoadmap;