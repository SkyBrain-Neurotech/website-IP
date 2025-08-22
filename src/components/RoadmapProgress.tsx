import React from 'react';
import { CheckCircle2, Circle, Clock, Zap, Brain, Users, Shield, Rocket } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  phase: string;
  timeline: string;
  progress?: number;
  updates?: string[];
  icon: React.ElementType;
}

const RoadmapProgress = () => {
  const lastUpdated = "December 2024";
  
  const roadmapItems: RoadmapItem[] = [
    {
      id: "foundation",
      title: "Core BCI Technology",
      description: "Develop the fundamental brain-computer interface hardware and signal processing algorithms",
      status: "completed",
      phase: "Foundation",
      timeline: "Q1 2024",
      progress: 100,
      updates: [
        "✅ EEG signal acquisition system completed",
        "✅ Real-time neural signal processing pipeline operational",
        "✅ Basic pattern recognition algorithms tested"
      ],
      icon: Brain
    },
    {
      id: "iapf-core",
      title: "iAPF AI Framework",
      description: "Build the intelligent Adaptive Personal Framework that learns individual neural patterns",
      status: "in-progress",
      phase: "Intelligence",
      timeline: "Q3-Q4 2024",
      progress: 75,
      updates: [
        "✅ Machine learning model architecture designed",
        "✅ Personal pattern recognition algorithms implemented",
        "🔄 Adaptive response system in testing",
        "⏳ Real-time personalization engine being optimized"
      ],
      icon: Zap
    },
    {
      id: "safety-validation",
      title: "Safety & Privacy Systems",
      description: "Implement comprehensive safety protocols and privacy protection measures",
      status: "in-progress",
      phase: "Safety First",
      timeline: "Q4 2024",
      progress: 60,
      updates: [
        "✅ Data encryption protocols established",
        "✅ Non-invasive sensor safety testing completed",
        "🔄 Privacy compliance framework being implemented",
        "⏳ Third-party security audits scheduled"
      ],
      icon: Shield
    },
    {
      id: "clinical-trials",
      title: "Clinical Validation",
      description: "Conduct clinical trials to validate effectiveness and safety in real-world conditions",
      status: "planned",
      phase: "Validation",
      timeline: "Q1-Q2 2025",
      progress: 15,
      updates: [
        "🔄 IRB approval process initiated",
        "⏳ Clinical trial protocols being designed",
        "⏳ Research partnerships being established"
      ],
      icon: Users
    },
    {
      id: "product-launch",
      title: "Consumer Product Launch",
      description: "Launch the first consumer-ready mental wellness BCI device with iAPF technology",
      status: "planned",
      phase: "Launch",
      timeline: "Q3-Q4 2025",
      progress: 5,
      updates: [
        "⏳ Product design and manufacturing partnerships being explored",
        "⏳ Regulatory approval pathways being mapped",
        "⏳ Go-to-market strategy in development"
      ],
      icon: Rocket
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-6 w-6 text-neural-blue animate-pulse" />;
      default:
        return <Circle className="h-6 w-6 text-neural-gray" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-400/30 bg-green-400/5';
      case 'in-progress':
        return 'border-neural-blue/30 bg-neural-blue/5';
      default:
        return 'border-neural-gray/30 bg-neural-gray/5';
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-8 rounded-full">
            <Rocket className="h-5 w-5 text-neural-blue animate-pulse" />
            <span className="text-sm font-semibold text-neural-gray tracking-wide font-orbitron uppercase">
              Live Updates • Last Updated: {lastUpdated}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-ghost-white">Our</span>{' '}
            <span className="text-neural-blue font-orbitron neural-glow">Journey</span>{' '}
            <span className="text-ghost-white">to Mental Wellness</span>
          </h1>
          
          <p className="text-xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Follow our progress as we build the future of mental health technology. 
            We update this page regularly so you can see exactly where we are and what's coming next.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">1</div>
            <div className="text-lg font-semibold text-ghost-white">Completed</div>
            <div className="text-neural-gray">Major milestones</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-neural-blue mb-2">2</div>
            <div className="text-lg font-semibold text-ghost-white">In Progress</div>
            <div className="text-neural-gray">Active development</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-neural-gray mb-2">2</div>
            <div className="text-lg font-semibold text-ghost-white">Planned</div>
            <div className="text-neural-gray">Coming soon</div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-8">
          {roadmapItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className={`glass-card p-8 ${getStatusColor(item.status)} border-l-4`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="p-3 bg-neural-blue/20 rounded-xl">
                      <IconComponent className="h-8 w-8 text-neural-blue" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(item.status)}
                        <span className="text-sm font-semibold text-neural-blue uppercase tracking-wide">
                          {item.phase}
                        </span>
                        <span className="text-sm text-neural-gray">
                          {item.timeline}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-ghost-white font-orbitron">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  {item.progress !== undefined && (
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-neural-gray/20 rounded-full h-3">
                        <div 
                          className="bg-neural-blue h-3 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-neural-blue">
                        {item.progress}%
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-neural-gray text-lg leading-relaxed mb-6">
                  {item.description}
                </p>

                {item.updates && (
                  <div>
                    <h4 className="text-lg font-semibold text-ghost-white mb-4 font-orbitron">
                      Recent Updates:
                    </h4>
                    <div className="space-y-2">
                      {item.updates.map((update, updateIndex) => (
                        <div key={updateIndex} className="text-neural-gray flex items-start space-x-2">
                          <span className="text-sm">{update}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Steps */}
        <div className="glass-card rounded-3xl p-12 mt-16 text-center">
          <h2 className="text-3xl font-bold text-ghost-white mb-6 font-orbitron">
            Want to Follow Our Progress?
          </h2>
          <p className="text-xl text-neural-gray mb-8 max-w-3xl mx-auto">
            We believe in radical transparency. Check back here regularly for updates, or join our community 
            to get notifications when we hit major milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="neural-gradient text-white font-bold px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform font-orbitron">
              Join Our Community
            </button>
            <button className="glass-card text-neural-blue hover:bg-neural-blue/10 font-bold px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform font-orbitron">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapProgress;