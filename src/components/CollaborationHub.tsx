import React from 'react';
import { 
  Code, 
  FlaskConical, 
  Users, 
  PlayCircle, 
  Handshake, 
  Rocket,
  Github,
  MessageSquare,
  Heart,
  Beaker,
  Lightbulb,
  Target
} from 'lucide-react';

const CollaborationHub = () => {
  const collaborationTypes = [
    {
      icon: Code,
      title: "Developers & Programmers",
      description: "Help us build the future of mental health technology",
      opportunities: [
        "Open source BCI signal processing libraries",
        "Mobile app development for real-time monitoring",
        "AI/ML model development and optimization",
        "Web platform and dashboard creation"
      ],
      ctaText: "Join Dev Community",
      color: "neural-blue",
      bgGradient: "from-neural-blue/20 to-mind-purple/10"
    },
    {
      icon: FlaskConical,
      title: "Researchers & Scientists",
      description: "Advance the science of brain-computer interfaces",
      opportunities: [
        "Collaborative research papers and publications",
        "Clinical trial design and execution",
        "Neural pattern analysis and interpretation",
        "Mental health outcome validation studies"
      ],
      ctaText: "Research Partnership",
      color: "mind-purple",
      bgGradient: "from-mind-purple/20 to-neural-blue/10"
    },
    {
      icon: Handshake,
      title: "Industry Partners",
      description: "Scale BCI technology for global mental health impact",
      opportunities: [
        "Healthcare system integration partnerships",
        "Mental health clinic pilot programs",
        "Technology licensing and deployment",
        "Manufacturing and distribution alliances"
      ],
      ctaText: "Partner With Us",
      color: "neural-blue",
      bgGradient: "from-neural-blue/20 to-mind-purple/10"
    },
    {
      icon: PlayCircle,
      title: "Interactive Demos",
      description: "Experience our technology firsthand",
      opportunities: [
        "Live BCI signal visualization demos",
        "iAPF AI pattern recognition showcase",
        "Real-time mental state monitoring",
        "Personalized wellness recommendation engine"
      ],
      ctaText: "Try Demo",
      color: "mind-purple",
      bgGradient: "from-mind-purple/20 to-neural-blue/10"
    },
    {
      icon: Heart,
      title: "Wellness Validation",
      description: "Help validate our mental wellness products",
      opportunities: [
        "Beta testing programs for new features",
        "User experience research and feedback",
        "Mental health outcome tracking studies",
        "Community-driven feature development"
      ],
      ctaText: "Join Beta Program",
      color: "neural-blue",
      bgGradient: "from-neural-blue/20 to-mind-purple/10"
    },
    {
      icon: Rocket,
      title: "Deployment Support",
      description: "Help us launch BCI technology worldwide",
      opportunities: [
        "Early adopter and pilot site programs",
        "Regional deployment and support networks",
        "Training and education program development",
        "Community outreach and awareness campaigns"
      ],
      ctaText: "Support Launch",
      color: "mind-purple",
      bgGradient: "from-mind-purple/20 to-neural-blue/10"
    }
  ];

  const openSourceProjects = [
    {
      name: "Neural Signal Processor",
      description: "Real-time EEG signal processing and analysis library",
      language: "Python",
      stars: "2.1k",
      status: "Active Development"
    },
    {
      name: "BCI Pattern Recognition",
      description: "Machine learning models for neural pattern classification",
      language: "TensorFlow",
      stars: "890",
      status: "Beta Release"
    },
    {
      name: "Mental Wellness API",
      description: "RESTful API for mental health data integration",
      language: "Node.js",
      stars: "1.3k",
      status: "Production Ready"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-8 rounded-full">
            <Users className="h-5 w-5 text-neural-blue animate-pulse" />
            <span className="text-sm font-semibold text-neural-gray tracking-wide font-orbitron uppercase">
              Join The Mission
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-ghost-white">Collaborate With</span>{' '}
            <span className="text-neural-blue font-orbitron neural-glow">SkyBrain Neurotech</span>
          </h1>
          
          <p className="text-xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-12">
            We believe the future of mental health technology should be built together. 
            Whether you're a developer, researcher, partner, or just passionate about mental wellness, 
            there's a place for you in our mission.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-neural-blue mb-2">500+</div>
              <div className="text-sm text-neural-gray">Contributors</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-mind-purple mb-2">15</div>
              <div className="text-sm text-neural-gray">Research Partners</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-neural-blue mb-2">8</div>
              <div className="text-sm text-neural-gray">Open Source Projects</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-mind-purple mb-2">12k+</div>
              <div className="text-sm text-neural-gray">Community Members</div>
            </div>
          </div>
        </div>

        {/* Collaboration Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {collaborationTypes.map((collab, index) => {
            const IconComponent = collab.icon;
            return (
              <div 
                key={collab.title}
                className={`glass-card p-8 hover:border-${collab.color}/30 transition-all duration-300 bg-gradient-to-br ${collab.bgGradient}`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`p-4 bg-${collab.color}/20 rounded-xl`}>
                    <IconComponent className={`h-8 w-8 text-${collab.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-ghost-white mb-3 font-orbitron">
                      {collab.title}
                    </h3>
                    <p className="text-neural-gray leading-relaxed mb-6">
                      {collab.description}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-ghost-white mb-4 font-orbitron">
                    Opportunities:
                  </h4>
                  <ul className="space-y-2">
                    {collab.opportunities.map((opportunity, idx) => (
                      <li key={idx} className="text-neural-gray flex items-start space-x-2">
                        <span className={`text-${collab.color} mt-1.5`}>•</span>
                        <span>{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`w-full neural-gradient text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform font-orbitron`}>
                  {collab.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Open Source Projects */}
        <div className="glass-card rounded-3xl p-12 mb-20">
          <div className="flex items-center space-x-4 mb-12">
            <Github className="h-8 w-8 text-neural-blue" />
            <h2 className="text-3xl font-bold text-ghost-white font-orbitron">
              Open Source Projects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {openSourceProjects.map((project, index) => (
              <div key={project.name} className="glass-card p-6 hover:border-neural-blue/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-ghost-white font-orbitron">
                    {project.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-neural-blue">
                    <span className="text-sm">⭐</span>
                    <span className="text-sm font-semibold">{project.stars}</span>
                  </div>
                </div>
                
                <p className="text-neural-gray mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mind-purple font-semibold">
                    {project.language}
                  </span>
                  <span className="text-xs text-neural-gray bg-neural-blue/10 px-2 py-1 rounded-full">
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="glass-card text-neural-blue hover:bg-neural-blue/10 font-bold px-8 py-4 text-lg rounded-xl transition-all font-orbitron">
              View All Projects on GitHub
            </button>
          </div>
        </div>

        {/* Community Engagement */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-ghost-white mb-12 font-orbitron">
            Join Our Growing Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-8 text-center">
              <MessageSquare className="h-12 w-12 text-neural-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">Discord Community</h3>
              <p className="text-neural-gray mb-6">
                Join real-time discussions with developers, researchers, and mental health advocates
              </p>
              <button className="neural-gradient text-white font-bold px-6 py-3 rounded-xl font-orbitron">
                Join Discord
              </button>
            </div>
            
            <div className="glass-card p-8 text-center">
              <Beaker className="h-12 w-12 text-mind-purple mx-auto mb-4" />
              <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">Research Network</h3>
              <p className="text-neural-gray mb-6">
                Connect with researchers working on BCI and mental health applications
              </p>
              <button className="glass-card text-mind-purple hover:bg-mind-purple/10 font-bold px-6 py-3 rounded-xl font-orbitron">
                Join Network
              </button>
            </div>
            
            <div className="glass-card p-8 text-center">
              <Lightbulb className="h-12 w-12 text-neural-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">Innovation Lab</h3>
              <p className="text-neural-gray mb-6">
                Contribute ideas and collaborate on breakthrough mental health technologies
              </p>
              <button className="neural-gradient text-white font-bold px-6 py-3 rounded-xl font-orbitron">
                Get Involved
              </button>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
              Ready to Make a Difference?
            </h3>
            <p className="text-xl text-neural-gray mb-6 max-w-3xl mx-auto">
              The future of mental health depends on collaboration. Whether you have 5 minutes or 5 hours, 
              your contribution can help transform how we approach mental wellness worldwide.
            </p>
            <button className="neural-gradient text-white font-bold px-12 py-4 text-xl rounded-xl hover:scale-105 transition-transform font-orbitron">
              Start Contributing Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationHub;