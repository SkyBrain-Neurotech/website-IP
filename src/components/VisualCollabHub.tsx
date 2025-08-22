import React, { useState, useEffect } from 'react';
import { 
  Code, 
  FlaskConical, 
  Users, 
  PlayCircle, 
  Handshake, 
  Rocket,
  ExternalLink,
  MessageSquare,
  Heart,
  Beaker,
  Lightbulb,
  Target,
  Zap,
  Brain,
  Globe,
  Instagram,
  Twitter
} from 'lucide-react';

const VisualCollabHub = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const collaborationCards = [
    {
      icon: Code,
      title: 'Developers',
      emoji: '👨‍💻',
      color: 'neural-blue',
      count: '500+',
      opportunities: ['Open Source', 'Mobile Apps', 'AI Models', 'Web Platform']
    },
    {
      icon: FlaskConical,
      title: 'Researchers',
      emoji: '🧪',
      color: 'mind-purple',
      count: '15',
      opportunities: ['Research Papers', 'Clinical Trials', 'Neural Analysis', 'Validation']
    },
    {
      icon: Handshake,
      title: 'Partners',
      emoji: '🤝',
      color: 'neural-blue',
      count: '8',
      opportunities: ['Healthcare', 'Clinics', 'Licensing', 'Distribution']
    },
    {
      icon: PlayCircle,
      title: 'Demos',
      emoji: '🎮',
      color: 'mind-purple',
      count: 'Live',
      opportunities: ['Signal Viz', 'AI Patterns', 'Real-time', 'Recommendations']
    },
    {
      icon: Heart,
      title: 'Beta Users',
      emoji: '❤️',
      color: 'neural-blue',
      count: '1.2k',
      opportunities: ['Testing', 'Feedback', 'Studies', 'Features']
    },
    {
      icon: Rocket,
      title: 'Launch Support',
      emoji: '🚀',
      color: 'mind-purple',
      count: '12k',
      opportunities: ['Early Adopters', 'Regional', 'Training', 'Outreach']
    }
  ];

  const communityStats = [
    { icon: Users, label: 'Contributors', value: '500+', emoji: '👥', growth: '+23%' },
    { icon: ExternalLink, label: 'Linktree Links', value: '8', emoji: '🌐', growth: '+2' },
    { icon: MessageSquare, label: 'Community', value: '12k', emoji: '💬', growth: '+1.2k' },
    { icon: Globe, label: 'Countries', value: '47', emoji: '🌍', growth: '+5' }
  ];

  // Auto-rotate active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % collaborationCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [collaborationCards.length]);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          {/* Background Brain Network */}
          <div className="absolute inset-0 flex justify-center items-center opacity-5">
            <div className="relative">
              <Brain className="h-64 w-64 text-neural-blue" />
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-neural-blue rounded-full animate-pulse"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-8 rounded-full">
              <Users className="h-5 w-5 text-neural-blue animate-pulse" />
              <span className="text-sm font-semibold text-neural-gray tracking-wide font-orbitron uppercase">
                Join The Mission
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
              <span className="text-ghost-white">Build the Future</span>{' '}
              <span className="text-neural-blue font-orbitron neural-glow block">
                Together 🤝
              </span>
            </h1>
            
            <p className="text-xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-12">
              Mental health technology should be built by everyone, for everyone
            </p>
          </div>
        </div>

        {/* Live Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {communityStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredStat === stat.label;
            
            return (
              <div
                key={stat.label}
                className={`glass-card p-6 text-center transition-all duration-300 cursor-pointer ${
                  isHovered ? 'scale-110 border-neural-blue/30' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setHoveredStat(stat.label)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className="relative mb-4">
                  <IconComponent className={`h-12 w-12 mx-auto text-neural-blue transition-all duration-300 ${
                    isHovered ? 'animate-pulse' : ''
                  }`} />
                  <div className="absolute -top-2 -right-2 text-2xl">
                    {stat.emoji}
                  </div>
                </div>
                
                <div className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                  isHovered ? 'text-neural-blue' : 'text-ghost-white'
                }`}>
                  {stat.value}
                </div>
                
                <div className="text-sm text-neural-gray font-semibold mb-1">
                  {stat.label}
                </div>
                
                <div className="text-xs text-green-400 font-bold">
                  {stat.growth} this month
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Collaboration Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-ghost-white font-orbitron">
            How You Can Contribute
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborationCards.map((card, index) => {
              const IconComponent = card.icon;
              const isActive = index === activeCard;
              
              return (
                <div
                  key={card.title}
                  className={`glass-card p-8 transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? `scale-110 border-${card.color}/50 bg-${card.color}/10 shadow-xl shadow-${card.color}/20` 
                      : 'hover:scale-105 hover:border-neural-blue/30'
                  }`}
                  onClick={() => setActiveCard(index)}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isActive ? `bg-${card.color}/30` : `bg-${card.color}/20`
                      }`}>
                        <IconComponent className={`h-8 w-8 text-${card.color} ${
                          isActive ? 'animate-pulse' : ''
                        }`} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold font-orbitron transition-all duration-300 ${
                          isActive ? `text-${card.color}` : 'text-ghost-white'
                        }`}>
                          {card.title}
                        </h3>
                        <div className="text-sm text-neural-gray">{card.count} active</div>
                      </div>
                    </div>
                    <div className="text-3xl">{card.emoji}</div>
                  </div>

                  {/* Opportunities */}
                  <div className="space-y-3">
                    {card.opportunities.map((opportunity, opIndex) => (
                      <div 
                        key={opportunity}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                          isActive ? `bg-${card.color}/10` : 'bg-neural-gray/5'
                        }`}
                        style={{ animationDelay: `${opIndex * 0.1}s` }}
                      >
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? `bg-${card.color} animate-pulse` : 'bg-neural-gray'
                        }`}></div>
                        <span className={`text-sm font-semibold transition-all duration-300 ${
                          isActive ? `text-${card.color}` : 'text-neural-gray'
                        }`}>
                          {opportunity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className={`w-full mt-6 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                    isActive 
                      ? `neural-gradient text-white hover:scale-105` 
                      : 'glass-card text-neural-blue hover:bg-neural-blue/10'
                  } font-orbitron`}>
                    {isActive ? 'Join Now' : 'Learn More'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Follow Our Research */}
        <div className="glass-card rounded-3xl p-12 mb-20 relative overflow-hidden">
          <div className="flex items-center space-x-4 mb-12">
            <Brain className="h-8 w-8 text-neural-blue" />
            <h2 className="text-3xl font-bold text-ghost-white font-orbitron">
              Follow Our Research
            </h2>
            <div className="text-2xl">🧪</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Linktree', emoji: '🌐', icon: ExternalLink, followers: '2.1k', description: 'All our links', status: 'Active' },
              { name: 'Instagram', emoji: '📸', icon: Instagram, followers: '890', description: 'Behind the scenes', status: 'Live' },
              { name: 'Twitter X', emoji: '🐦', icon: Twitter, followers: '1.3k', description: 'Latest updates', status: 'Daily' }
            ].map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <div key={platform.name} className="glass-card p-6 hover:border-neural-blue/30 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl">{platform.emoji}</div>
                      <h3 className="text-lg font-bold text-ghost-white font-orbitron group-hover:text-neural-blue transition-colors">
                        {platform.name}
                      </h3>
                    </div>
                    <IconComponent className="h-6 w-6 text-neural-blue group-hover:animate-pulse" />
                  </div>
                  
                  <p className="text-neural-gray text-sm mb-3">{platform.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-mind-purple font-semibold">{platform.followers} followers</span>
                    <span className="text-xs text-neural-gray bg-neural-blue/10 px-2 py-1 rounded-full">
                      {platform.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: MessageSquare, title: 'Discord', emoji: '💬', members: '12k+', description: 'Real-time chat' },
            { icon: Beaker, title: 'Research', emoji: '🧪', members: '500+', description: 'Scientific collaboration' },
            { icon: Lightbulb, title: 'Innovation', emoji: '💡', members: '2k+', description: 'Idea sharing' }
          ].map((channel, index) => {
            const IconComponent = channel.icon;
            
            return (
              <div key={channel.title} className="glass-card p-8 text-center hover:border-neural-blue/30 transition-all group">
                <div className="relative mb-6">
                  <IconComponent className="h-16 w-16 text-neural-blue mx-auto group-hover:animate-pulse" />
                  <div className="absolute -top-2 -right-2 text-3xl">{channel.emoji}</div>
                </div>
                
                <h3 className="text-2xl font-bold text-ghost-white mb-2 font-orbitron group-hover:text-neural-blue transition-colors">
                  {channel.title}
                </h3>
                <p className="text-neural-gray mb-4">{channel.description}</p>
                <div className="text-lg font-bold text-neural-blue">{channel.members}</div>
                
                <button className="mt-6 neural-gradient text-white font-bold px-6 py-3 rounded-xl font-orbitron hover:scale-105 transition-transform">
                  Join Channel
                </button>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 50 }).map((_, i) => (
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
              <div className="text-6xl mb-6">🚀🧠✨</div>
              <h2 className="text-3xl font-bold text-ghost-white mb-6 font-orbitron">
                Ready to Change Mental Health Forever?
              </h2>
              <p className="text-xl text-neural-gray mb-8 max-w-3xl mx-auto">
                Every contribution matters. Whether you code, research, or just believe in our mission.
              </p>
              <button className="neural-gradient text-white font-bold px-12 py-4 text-xl rounded-xl hover:scale-105 transition-transform font-orbitron group">
                <Rocket className="inline h-6 w-6 mr-3 group-hover:animate-bounce" />
                Start Contributing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualCollabHub;