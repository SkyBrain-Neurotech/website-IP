import React, { useState, useEffect } from 'react';
import NewsletterSignup from './NewsletterSignup';
import { trackButtonClick } from '@/lib/analytics';
import { showComingSoonNotification } from '@/lib/notifications';
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
  ChevronRight
} from 'lucide-react';

interface RoadmapPhase {
  id: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
  timeline: string;
  icon: React.ElementType;
  color: string;
  milestones: {
    title: string;
    status: 'done' | 'active' | 'pending';
    visual: React.ElementType;
  }[];
}

const VisualRoadmap = () => {
  const [activePhase, setActivePhase] = useState<string>('foundation');
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  const phases: RoadmapPhase[] = [
    {
      id: 'foundation',
      title: 'Foundation',
      subtitle: 'Core BCI Technology',
      status: 'in-progress',
      progress: 85,
      timeline: 'Q1 2025',
      icon: Brain,
      color: 'blue',
      milestones: [
        { title: 'EEG Signal Processing', status: 'done', visual: Zap },
        { title: 'Commercial Hardware Integration', status: 'done', visual: Cpu },
        { title: 'Pattern Recognition', status: 'active', visual: Target },
        { title: 'Real-time Processing', status: 'active', visual: Clock },
        { title: 'Signal Optimization', status: 'pending', visual: Zap }
      ],
    },
    {
      id: 'research',
      title: 'Research',
      subtitle: 'Advanced Neural Studies',
      status: 'in-progress',
      progress: 60,
      timeline: 'Q2-Q3 2025',
      icon: Award,
      color: 'green',
      milestones: [
        { title: 'Cognitive Load Mapping', status: 'done', visual: Brain },
        { title: 'Stress Pattern Analysis', status: 'done', visual: Heart },
        { title: 'Focus Enhancement Protocols', status: 'active', visual: Target },
        { title: 'Memory Optimization', status: 'pending', visual: Lightbulb },
        { title: 'Sleep Quality Tracking', status: 'pending', visual: Users }
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy',
      subtitle: 'Data Security & Protection',
      status: 'in-progress',
      progress: 40,
      timeline: 'Q3 2025',
      icon: Shield,
      color: 'purple',
      milestones: [
        { title: 'End-to-End Encryption', status: 'done', visual: Shield },
        { title: 'Privacy by Design', status: 'active', visual: Users },
        { title: 'Data Anonymization', status: 'active', visual: Target },
        { title: 'Secure Cloud Storage', status: 'pending', visual: Globe },
        { title: 'GDPR Compliance', status: 'pending', visual: Award }
      ],
    },
    {
      id: 'intelligence',
      title: 'Intelligence',
      subtitle: 'iAPF AI Framework',
      status: 'pending',
      progress: 25,
      timeline: 'Q4 2025 - Q1 2026',
      icon: Lightbulb,
      color: 'purple',
      milestones: [
        { title: 'AI Model Architecture', status: 'active', visual: Brain },
        { title: 'Personal Learning Engine', status: 'pending', visual: Users },
        { title: 'Adaptive Responses', status: 'pending', visual: Zap },
        { title: 'Real-time Optimization', status: 'pending', visual: Target },
        { title: 'Predictive Analytics', status: 'pending', visual: Cpu }
      ],
    },
    {
      id: 'applications',
      title: 'Applications',
      subtitle: 'Real-world Use Cases',
      status: 'pending',
      progress: 15,
      timeline: 'Q1-Q2 2026',
      icon: Target,
      color: 'blue',
      milestones: [
        { title: 'Workplace Integration', status: 'pending', visual: Users },
        { title: 'Gaming Applications', status: 'pending', visual: Zap },
        { title: 'Healthcare Solutions', status: 'pending', visual: Heart },
        { title: 'Education Tools', status: 'pending', visual: Award },
        { title: 'Smart Home Control', status: 'pending', visual: Globe }
      ],
    },
    {
      id: 'validation',
      title: 'Validation',
      subtitle: 'Clinical Trials & Testing',
      status: 'planned',
      progress: 0,
      timeline: 'Q2-Q3 2026',
      icon: Users,
      color: 'orange',
      milestones: [
        { title: 'India & UAE Market Approvals', status: 'pending', visual: Award },
        { title: 'Trial Design', status: 'pending', visual: Target },
        { title: 'Participant Recruitment', status: 'pending', visual: Users },
        { title: 'Data Collection', status: 'pending', visual: Brain },
        { title: 'Statistical Analysis', status: 'pending', visual: Cpu },
        { title: 'Peer Review Publication', status: 'pending', visual: Globe }
      ],
    },
    {
      id: 'partnerships',
      title: 'Partnerships',
      subtitle: 'Strategic Collaborations',
      status: 'planned',
      progress: 10,
      timeline: 'Q3-Q4 2026',
      icon: Heart,
      color: 'green',
      milestones: [
        { title: 'Healthcare Providers', status: 'pending', visual: Heart },
        { title: 'Tech Companies', status: 'pending', visual: Cpu },
        { title: 'Research Institutions', status: 'pending', visual: Award },
        { title: 'Government Agencies', status: 'pending', visual: Shield },
        { title: 'Global Distribution', status: 'pending', visual: Globe }
      ],
    },
    {
      id: 'launch',
      title: 'Launch',
      subtitle: 'Consumer Product Release',
      status: 'planned',
      progress: 0,
      timeline: 'Q4 2026 - Q1 2027',
      icon: Rocket,
      color: 'cyan',
      milestones: [
        { title: 'Product Design Finalization', status: 'pending', visual: Lightbulb },
        { title: 'Manufacturing Scale-up', status: 'pending', visual: Cpu },
        { title: 'Regulatory Approval', status: 'pending', visual: Award },
        { title: 'Beta Testing Program', status: 'pending', visual: Users },
        { title: 'India & UAE Market Launch', status: 'pending', visual: Globe },
        { title: 'Customer Support Setup', status: 'pending', visual: Heart }
      ],
    },
    {
      id: 'expansion',
      title: 'Expansion',
      subtitle: 'Scale & Innovation',
      status: 'planned',
      progress: 0,
      timeline: 'Q2-Q4 2027',
      icon: Globe,
      color: 'purple',
      milestones: [
        { title: 'Version 2.0 Development', status: 'pending', visual: Rocket },
        { title: 'International Markets', status: 'pending', visual: Globe },
        { title: 'Platform Ecosystem', status: 'pending', visual: Cpu },
        { title: 'Developer API Release', status: 'pending', visual: Target },
        { title: 'Community Building', status: 'pending', visual: Users }
      ],
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400';
      case 'in-progress': return 'text-neural-blue border-neural-blue';
      default: return 'text-neural-gray border-neural-gray';
    }
  };

  const getMilestoneColor = (status: string) => {
    switch (status) {
      case 'done': return 'text-green-400 bg-green-400/20';
      case 'active': return 'text-neural-blue bg-neural-blue/20';
      default: return 'text-neural-gray bg-neural-gray/10';
    }
  };

  // Removed auto-cycling - now manual only

  const activePhaseData = phases.find(p => p.id === activePhase);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Visual Elements */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-10">
            <Brain className="h-64 w-64 text-neural-blue animate-pulse" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-3 glass-badge px-6 py-3 mb-8">
              <Rocket className="h-5 w-5 text-neural-blue animate-pulse" />
              <span className="text-sm font-semibold text-neural-gray tracking-wide font-orbitron uppercase">
                Live Progress • Updated December 2024
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight relative">
              <span className="text-ghost-white">Our</span>{' '}
              <span className="text-neural-blue font-orbitron neural-glow relative">
                Journey
                <div className="absolute -inset-2 bg-neural-blue/20 blur-xl animate-pulse"></div>
              </span>
            </h1>
          </div>
        </div>

        {/* PROMINENT Visual Progress Overview */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isActive = phase.id === activePhase;
              
              return (
                <div
                  key={phase.id}
                  className={`relative cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-110 z-10' : 'scale-100 hover:scale-105'
                  }`}
                  onClick={() => setActivePhase(phase.id)}
                >
                  <div className={`glass-card p-8 min-h-[280px] ${
                    isActive ? 'border-neural-blue/30 bg-neural-blue/10' : ''
                  } transition-all duration-300 hover:bg-white/10`}>
                    
                    {/* Enhanced active phase indicator */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-lg border-2 border-neural-blue/30 animate-pulse bg-gradient-to-br from-neural-blue/5 to-mind-purple/5"></div>
                    )}
                    
                    <div className="relative z-10 text-center h-full flex flex-col justify-between">
                      {/* Large Icon */}
                      <div>
                        <div className={`p-4 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center ${
                          isActive ? 'bg-neural-blue/30' : 'bg-neural-blue/20'
                        }`}>
                          <IconComponent className={`h-10 w-10 text-neural-blue ${
                            isActive ? 'animate-pulse' : ''
                          }`} />
                        </div>
                        
                        {/* Title and Timeline */}
                        <h3 className="text-xl font-bold text-ghost-white font-orbitron mb-2">{phase.title}</h3>
                        <p className="text-sm text-neural-gray mb-1">{phase.subtitle}</p>
                        <p className="text-xs text-neural-blue font-semibold mb-4">{phase.timeline}</p>
                      </div>
                      
                      {/* Large Progress Ring */}
                      <div className="relative w-24 h-24 mx-auto">
                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                          <circle
                            cx="48"
                            cy="48"
                            r="42"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            className="text-neural-gray/20"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="42"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${phase.progress * 2.64} 264`}
                            className={getStatusColor(phase.status).split(' ')[0]}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-ghost-white">
                            {phase.progress}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`px-3 py-1 rounded-full text-xs font-bold mt-4 ${
                        phase.status === 'in-progress' ? 'bg-neural-blue/30 text-neural-blue' :
                        phase.status === 'completed' ? 'bg-green-500/30 text-green-400' :
                        'bg-neural-gray/30 text-neural-gray'
                      }`}>
                        {phase.status.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
          
          {/* LARGE Navigation Controls */}
          <div className="flex justify-center items-center space-x-8 mt-16">
            {/* Previous Button */}
            <button
              onClick={() => {
                const currentIndex = phases.findIndex(p => p.id === activePhase);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : phases.length - 1;
                setActivePhase(phases[prevIndex].id);
              }}
              className="glass-button p-6 rounded-full hover:scale-110 transition-all duration-300 group w-16 h-16"
            >
              <ChevronLeft className="h-8 w-8 text-neural-blue group-hover:text-white" />
            </button>

            {/* LARGE Current Phase Display */}
            <div className="glass-container rounded-3xl px-12 py-8 min-w-[500px] text-center">
              <div className="flex items-center justify-center space-x-6">
                {React.createElement(phases.find(p => p.id === activePhase)?.icon || phases[0].icon, { 
                  className: "h-12 w-12 text-neural-blue animate-pulse" 
                })}
                <div>
                  <div className="text-2xl font-bold text-white font-orbitron mb-2">
                    {phases.find(p => p.id === activePhase)?.title || phases[0].title}
                  </div>
                  <div className="text-lg text-white/80">
                    Phase {(phases.findIndex(p => p.id === activePhase) + 1) || 1} of {phases.length} • {phases.find(p => p.id === activePhase)?.progress || 0}% Complete
                  </div>
                  <div className="text-sm text-neural-blue mt-1 font-semibold">
                    {phases.find(p => p.id === activePhase)?.timeline || ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                const currentIndex = phases.findIndex(p => p.id === activePhase);
                const nextIndex = currentIndex < phases.length - 1 ? currentIndex + 1 : 0;
                setActivePhase(phases[nextIndex].id);
              }}
              className="glass-button p-6 rounded-full hover:scale-110 transition-all duration-300 group w-16 h-16"
            >
              <ChevronRight className="h-8 w-8 text-neural-blue group-hover:text-white" />
            </button>
          </div>
          
          {/* LARGE Phase Indicator Dots */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-4">
              {phases.map((phase, index) => (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className={`w-6 h-6 rounded-full transition-all duration-300 border-2 ${
                    phase.id === activePhase
                      ? 'bg-neural-blue border-neural-blue scale-125 shadow-lg shadow-neural-blue/50'
                      : 'bg-transparent border-neural-gray/50 hover:border-neural-blue/70 hover:bg-neural-blue/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* LARGE Active Phase Details */}
        {activePhaseData && (
          <div className="glass-card rounded-3xl p-12 mb-20 border-2 border-neural-blue/20 bg-neural-blue/5 min-h-[400px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Phase Info */}
              <div>
                <div className="flex items-center space-x-6 mb-8">
                  <div className="p-6 bg-neural-blue/15 rounded-3xl border-1 border-neural-blue/20">
                    <activePhaseData.icon className="h-16 w-16 text-neural-blue" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-ghost-white font-orbitron mb-2">
                      {activePhaseData.title}
                    </h2>
                    <p className="text-2xl text-neural-gray mb-2">{activePhaseData.subtitle}</p>
                    <p className="text-lg text-neural-blue font-semibold">
                      {activePhaseData.timeline}
                    </p>
                  </div>
                </div>

                {/* Large Status indicator */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-6 h-6 rounded-full ${
                      activePhaseData.status === 'in-progress' ? 'bg-neural-blue animate-pulse' :
                      activePhaseData.status === 'completed' ? 'bg-green-500' :
                      'bg-neural-gray/50'
                    }`}></div>
                    <span className="text-lg font-bold text-neural-blue capitalize">
                      {activePhaseData.status.replace('-', ' ')}
                    </span>
                    <div className="flex-1 bg-neural-gray/20 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-neural-blue to-mind-purple h-3 rounded-full transition-all duration-500"
                        style={{ width: `${activePhaseData.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-ghost-white">{activePhaseData.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Right: Milestones */}
              <div>
                <h3 className="text-2xl font-bold text-ghost-white mb-8 font-orbitron">
                  Key Milestones ({activePhaseData.milestones.filter(m => m.status === 'done').length}/{activePhaseData.milestones.length} Complete)
                </h3>
                <div className="space-y-6">
                  {activePhaseData.milestones.map((milestone, index) => {
                    const MilestoneIcon = milestone.visual;
                    return (
                      <div
                        key={milestone.title}
                        className={`flex items-center space-x-6 p-6 rounded-2xl transition-all duration-300 glass-container border-2 ${
                          milestone.status === 'done' ? 'border-green-400/30 bg-green-400/10' :
                          milestone.status === 'active' ? 'border-neural-blue/30 bg-neural-blue/10' :
                          'border-neural-gray/20 bg-neural-gray/5'
                        } hover:scale-105 cursor-pointer relative`}
                        onMouseEnter={() => setHoveredMilestone(milestone.title)}
                        onMouseLeave={() => setHoveredMilestone(null)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`p-4 rounded-xl ${
                          milestone.status === 'done' ? 'bg-green-400/20' :
                          milestone.status === 'active' ? 'bg-neural-blue/20' :
                          'bg-neural-gray/20'
                        }`}>
                          <MilestoneIcon className={`h-8 w-8 ${
                            milestone.status === 'done' ? 'text-green-400' :
                            milestone.status === 'active' ? 'text-neural-blue' :
                            'text-neural-gray'
                          }`} />
                        </div>
                        <span className="font-bold flex-1 text-lg text-ghost-white">{milestone.title}</span>
                        {milestone.status === 'done' && (
                          <CheckCircle2 className="h-8 w-8 text-green-400" />
                        )}
                        {milestone.status === 'active' && (
                          <Clock className="h-8 w-8 text-neural-blue animate-pulse" />
                        )}
                        {milestone.status === 'pending' && (
                          <Circle className="h-8 w-8 text-neural-gray" />
                        )}
                        
                        {/* Enhanced Hover effect */}
                        {hoveredMilestone === milestone.title && (
                          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 bg-neural-blue rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Visual Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: CheckCircle2, value: phases.filter(p => p.status === 'completed').length.toString(), label: 'Completed Phases', color: 'text-green-400' },
            { icon: Clock, value: phases.filter(p => p.status === 'in-progress').length.toString(), label: 'In Progress', color: 'text-neural-blue' },
            { icon: Circle, value: phases.filter(p => p.status === 'planned' || p.status === 'pending').length.toString(), label: 'Planned Phases', color: 'text-neural-gray' },
            { icon: Target, value: Math.round(phases.reduce((acc, p) => acc + p.progress, 0) / phases.length) + '%', label: 'Overall Progress', color: 'text-mind-purple' }
          ].map((stat, index) => (
            <div key={stat.label} className="glass-card p-6 text-center group hover:scale-105 transition-all">
              <stat.icon className={`h-12 w-12 mx-auto mb-3 ${stat.color} group-hover:animate-pulse`} />
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-neural-gray font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Detailed Progress Overview */}
        <div className="glass-card rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-ghost-white mb-8 text-center font-orbitron">
            Development Timeline Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <div
                  key={phase.id}
                  className={`glass-container p-6 hover:scale-105 transition-all cursor-pointer ${
                    activePhase === phase.id ? 'border-neural-blue/50' : ''
                  }`}
                  onClick={() => setActivePhase(phase.id)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-xl bg-${phase.color}-500/20`}>
                      <IconComponent className={`h-8 w-8 text-${phase.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ghost-white font-orbitron">{phase.title}</h3>
                      <p className="text-sm text-neural-gray">{phase.timeline}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-neural-gray">Progress</span>
                      <span className="text-sm font-bold text-neural-blue">{phase.progress}%</span>
                    </div>
                    <div className="w-full bg-neural-gray/20 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r from-neural-blue to-mind-purple h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Milestone Count */}
                  <div className="flex justify-between text-sm">
                    <span className="text-neural-gray">
                      {phase.milestones.filter(m => m.status === 'done').length} / {phase.milestones.length} milestones
                    </span>
                    <span className={`font-semibold capitalize ${getStatusColor(phase.status).split(' ')[0]}`}>
                      {phase.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Timeline Visualization */}
        <div className="glass-card rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-ghost-white mb-8 text-center font-orbitron">
            Interactive Development Timeline
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neural-blue via-mind-purple to-neural-blue"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {phases.map((phase, index) => {
                const IconComponent = phase.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div key={phase.id} className="relative">
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                      <div className={`w-16 h-16 rounded-full glass-container border-4 border-neural-blue/50 flex items-center justify-center ${
                        phase.status === 'in-progress' ? 'animate-pulse' : ''
                      }`}>
                        <IconComponent className="h-8 w-8 text-neural-blue" />
                      </div>
                    </div>
                    
                    {/* Timeline Content */}
                    <div className={`flex ${isLeft ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                      <div className={`w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
                        <div className="glass-container p-6 hover:scale-105 transition-all cursor-pointer"
                             onClick={() => setActivePhase(phase.id)}>
                          <div className="flex items-center space-x-3 mb-3">
                            {!isLeft && <IconComponent className="h-6 w-6 text-neural-blue" />}
                            <h3 className="text-xl font-bold text-ghost-white font-orbitron">{phase.title}</h3>
                            {isLeft && <IconComponent className="h-6 w-6 text-neural-blue" />}
                          </div>
                          <p className="text-neural-gray mb-3">{phase.subtitle}</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-neural-blue font-semibold">{phase.timeline}</span>
                            <span className={`text-sm font-bold ${getStatusColor(phase.status).split(' ')[0]}`}>
                              {phase.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-neural-gray/20 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-neural-blue to-mind-purple h-2 rounded-full transition-all duration-500"
                              style={{ width: `${phase.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Key Achievements Section */}
        <div className="glass-card rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-ghost-white mb-8 text-center font-orbitron">
            Key Achievements & Milestones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Patents Filed', value: '12+', icon: Award, color: 'text-yellow-400' },
              { title: 'Research Papers', value: '8', icon: Brain, color: 'text-blue-400' },
              { title: 'Team Members', value: '25+', icon: Users, color: 'text-green-400' },
              { title: 'Funding Raised', value: '$2.5M', icon: Target, color: 'text-purple-400' }
            ].map((achievement, index) => (
              <div key={achievement.title} className="glass-container p-6 text-center hover:scale-105 transition-all">
                <achievement.icon className={`h-12 w-12 mx-auto mb-3 ${achievement.color}`} />
                <div className={`text-2xl font-bold ${achievement.color} mb-2`}>{achievement.value}</div>
                <div className="text-sm text-neural-gray font-semibold">{achievement.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neural-blue rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-ghost-white mb-6 font-orbitron">
                Follow Our Live Progress
              </h2>
              <p className="text-xl text-neural-gray mb-8 max-w-3xl mx-auto">
                We update this roadmap in real-time as we hit milestones. 
                Join our community to get instant notifications!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    trackButtonClick('Join Community', 'roadmap', 'coming_soon');
                    showComingSoonNotification('Community Platform');
                  }}
                  className="cyber-button text-deep-space font-bold px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform font-orbitron group"
                >
                  <Users className="inline h-5 w-5 mr-2 group-hover:animate-pulse" />
                  Join Community
                </button>
                <button 
                  onClick={() => {
                    trackButtonClick('Subscribe to Updates', 'roadmap', 'newsletter_modal');
                    setShowNewsletterModal(true);
                  }}
                  className="glass-card border-neural-blue/40 text-neural-blue hover:bg-neural-blue/10 font-bold px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform font-orbitron"
                >
                  Subscribe to Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <button
              onClick={() => setShowNewsletterModal(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-neural-blue/20 hover:bg-neural-blue/30 rounded-full flex items-center justify-center text-neural-blue hover:text-white transition-colors z-10"
            >
              ×
            </button>
            <NewsletterSignup
              location="roadmap_modal"
              showPreferences={true}
              title="Stay Updated on Our Progress"
              description="Get exclusive updates as we hit each milestone on our roadmap."
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VisualRoadmap;