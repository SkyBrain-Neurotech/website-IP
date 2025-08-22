import React, { useState, useEffect } from 'react';
import { Brain, Users, Award, BookOpen, Shield, Stethoscope, GraduationCap, Zap, User, Crown, Star, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  avatar: string;
  bio: string;
  expertise: string[];
  status: 'founder' | 'advisor' | 'team' | 'coming-soon';
  education?: string;
  experience?: string;
}

const TeamSelection = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const teamMembers: TeamMember[] = [
    // Leadership Team (From skybrain.in - to be populated)
    {
      id: 'founder-ceo',
      name: 'Rakesh Jakati',
      role: 'Founder & CEO',
      category: 'Leadership',
      avatar: '/images/team/founder-ceo.png',
      bio: 'Visionary leader driving the future of neurotechnology and mental wellness through Brain-Computer Interface innovations. Leading breakthrough R&D in BCI applications and cognitive enhancement systems.',
      expertise: ['Neurotechnology', 'R&D', 'Strategy', 'Leadership', 'Blockchain'],
      status: 'founder',
      education: 'Specialization in Neurotechnology & Healthcare',
      experience: '7+ years in neurotechnology and BCI research'
    },
    {
      id: 'ai-advisor',
      name: 'Dr. Bhaskar Tripathi',
      role: 'AI Advisor',
      category: 'Advisory',
      avatar: '/images/team/ai-advisor.png',
      bio: 'Leading AI expert guiding our AI initiatives and neural pattern recognition systems. Pioneer in deep learning applications for brain-computer interfaces.',
      expertise: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks', 'Deep Learning', 'Pattern Recognition'],
      status: 'advisor',
      education: 'Ph.D. in Computational and Mathematical Finance',
      experience: '15+ years in AI research and development'
    },
    {
      id: 'neurotech-advisor',
      name: 'Dr. Ganesh R Naik',
      role: 'Neurotech Advisor',
      category: 'Advisory',
      avatar: '/images/team/neurotech-advisor.png',
      bio: 'Top 2% of researchers worldwide in Biomedical Engineering. Neurotechnology pioneer with decades of BCI experience and groundbreaking research in neural interfaces.',
      expertise: ['Wearables & Algorithims', 'Neuroscience', 'Signal Processing', 'Sleep Research', 'Biomedical Devices'],
      status: 'advisor',
      education: 'Ph.D. in Eletrical & Eletronics Engineering.',
      experience: '17+ years in neurotechnology and medical devices'
    },
    // Research Team
    {
      id: 'research-scientist-1',
      name: 'Aranyak Banerjee',
      role: 'Research Scientist',
      category: 'Research',
      avatar: '/images/team/research-scientist-1.png',
      bio: 'Advanced research in neural signal processing and cognitive enhancement methodologies. Leading our EEG analysis and real-time processing initiatives.',
      expertise: ['Neuroscience', 'Signal Processing', 'Cognitive Science', 'EEG Analysis', 'Data Science'],
      status: 'team',
      education: 'Ph.D. Scholar Brain Computer Interfaces',
      experience: '5+ years in neural signal processing'
    },
    {
      id: 'research-scientist-2',
      name: '?',
      role: 'Research Scientist',
      category: 'Research',
      avatar: '/images/team/research-scientist-2.png',
      bio: 'Specializing in real-time neural data analysis and pattern recognition algorithms. Expert in machine learning applications for BCI systems.',
      expertise: ['Data Analysis', 'Pattern Recognition', 'Neural Networks', 'Real-time Processing', 'Algorithm Development'],
      status: 'coming-soon',
      education: 'Ph.D. in ',
      experience: '5+ years'
    },
    // Technology Team
    {
      id: 'blockchain-expert',
      name: '?',
      role: 'Research Scientist',
      category: 'Research',
      avatar: '/images/team/blockchain-expert.png',
      bio: 'Ensuring secure, decentralized neural data management and privacy-preserving BCI systems. Expert in cryptographic protocols for healthcare data.',
      expertise: ['Blockchain', 'Cryptography', 'Security', 'Decentralized Systems', 'Data Privacy'],
      status: 'coming-soon',
      education: 'Ph.D. in',
      experience: '5+ years'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Leadership': return Crown;
      case 'Advisory': return Star;
      case 'Research': return BookOpen;
      case 'Technology': return Shield;
      case 'Medical': return Stethoscope;
      case 'Academia': return GraduationCap;
      default: return User;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'founder': return 'from-yellow-500 to-orange-500';
      case 'advisor': return 'from-neural-blue to-mind-purple';
      case 'team': return 'from-green-500 to-blue-500';
      case 'coming-soon': return 'from-neural-gray to-neural-blue';
      default: return 'from-neural-gray to-neural-blue';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'founder': return '👑 FOUNDER';
      case 'advisor': return '⭐ ADVISOR';
      case 'team': return '💎 ACTIVE';
      case 'coming-soon': return '🚀 JOINING';
      default: return 'TEAM';
    }
  };

  return (
    <section className="pt-24 md:pt-32 pb-20 relative overflow-hidden min-h-screen">
      {/* Epic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-shadow-black to-neural-blue/5"></div>
        
        {/* Removed neural network grid background */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Epic Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 glass-card px-8 py-4 mb-8 rounded-full border border-neural-blue/30">
            <Users className="h-6 w-6 text-neural-blue" />
            <span className="text-base font-bold text-neural-blue tracking-wide font-orbitron uppercase">
              Our Expert Team
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">Meet Our</span>{' '}
            <span className="neural-gradient bg-clip-text text-transparent font-orbitron">
              Expert Team
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-8">
            Leading neuroscientists, AI researchers, and medical professionals pioneering the future of brain-computer interfaces.
          </p>
          
          <div className="text-neural-blue font-semibold">
            Click on any team member to learn more about their expertise
          </div>
        </div>

        {/* Team Grid - Professional Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-16 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => {
            const IconComponent = getCategoryIcon(member.category);
            const isHovered = hoveredMember === member.id;
            
            return (
              <div
                key={member.id}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  isHovered ? 'scale-110 z-20' : 'scale-100 hover:scale-105'
                }`}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => {
                  setSelectedMember(member);
                  setShowModal(true);
                }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Professional Team Card */}
                <div className={`glass-card p-6 md:p-8 lg:p-10 rounded-2xl border-2 transition-all duration-300 ${
                  isHovered 
                    ? 'border-neural-blue shadow-lg shadow-neural-blue/30' 
                    : member.status === 'coming-soon' 
                    ? 'border-neural-gray/30' 
                    : 'border-neural-blue/20 hover:border-neural-blue/50'
                } relative overflow-hidden h-full`}>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${
                    getStatusColor(member.status)
                  } text-white`}>
                    {getStatusBadge(member.status)}
                  </div>
                  
                  {/* Professional Photo */}
                  <div className="relative mb-6">
                    <div className={`w-48 h-48 mx-auto rounded-2xl border-4 transition-all duration-300 ${
                      member.status === 'coming-soon' 
                        ? 'border-neural-gray/50' 
                        : 'border-neural-blue hover:border-neural-blue/80'
                    } relative overflow-hidden group-hover:shadow-lg group-hover:shadow-neural-blue/30 bg-gradient-to-br from-neural-blue/10 to-mind-purple/10`}>
                      
                      {/* Photo Container */}
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isHovered ? 'scale-105' : 'scale-100'
                        } ${member.status === 'coming-soon' ? 'grayscale opacity-60' : ''}`}
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const iconDiv = target.nextElementSibling as HTMLElement;
                          if (iconDiv) iconDiv.style.display = 'flex';
                        }}
                      />
                      
                      {/* Fallback Icon (hidden by default) */}
                      <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 flex items-center justify-center" style={{ display: 'none' }}>
                        <IconComponent className={`h-16 w-16 transition-all duration-300 ${
                          member.status === 'coming-soon' 
                            ? 'text-neural-gray' 
                            : 'text-neural-blue'
                        }`} />
                      </div>
                      
                      {/* Coming Soon Overlay */}
                      {member.status === 'coming-soon' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-shadow-black/60 to-transparent flex items-center justify-center">
                          <div className="text-sm text-ghost-white font-bold bg-neural-gray/80 px-3 py-1 rounded-full">JOINING SOON</div>
                        </div>
                      )}
                      
                      {/* Professional Glow Effect */}
                      {isHovered && member.status !== 'coming-soon' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Professional Info */}
                  <div className="text-center">
                    <h3 className={`font-bold font-orbitron mb-2 transition-all duration-300 text-lg ${
                      member.status === 'coming-soon' 
                        ? 'text-neural-gray' 
                        : isHovered 
                        ? 'text-neural-blue' 
                        : 'text-ghost-white'
                    }`}>
                      {member.name}
                    </h3>
                    
                    <p className={`text-sm mb-3 font-semibold ${
                      member.status === 'coming-soon' ? 'text-neural-gray/70' : 'text-neural-blue'
                    }`}>
                      {member.role}
                    </p>
                    
                    {/* Education */}
                    {member.education && (
                      <div className={`text-xs mb-2 ${
                        member.status === 'coming-soon' 
                          ? 'text-neural-gray/50' 
                          : 'text-neural-gray'
                      }`}>
                        {member.education}
                      </div>
                    )}
                    
                    {/* Experience */}
                    {member.experience && (
                      <div className={`text-xs font-medium ${
                        member.status === 'coming-soon' 
                          ? 'text-neural-gray/50' 
                          : 'text-neural-blue/80'
                      }`}>
                        {member.experience}
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Glow Effect */}
                  {isHovered && member.status !== 'coming-soon' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/10 to-mind-purple/10 rounded-2xl pointer-events-none"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Character Details Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-modal p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button - Better positioned */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowModal(false)}
                className="glass-card px-4 py-2 rounded-xl text-neural-gray hover:text-neural-blue transition-all duration-300 border border-neural-gray/30 hover:border-neural-blue/50 flex items-center space-x-2"
              >
                <span className="text-sm font-semibold">Close</span>
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Professional Profile */}
            <div className="text-center mb-8">
              <div className={`w-48 h-48 mx-auto rounded-2xl border-4 border-neural-blue bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 relative overflow-hidden mb-6`}>
                <img 
                  src={selectedMember.avatar} 
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const iconDiv = target.nextElementSibling as HTMLElement;
                    if (iconDiv) iconDiv.style.display = 'flex';
                  }}
                />
                {/* Fallback Icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 flex items-center justify-center" style={{ display: 'none' }}>
                  {React.createElement(getCategoryIcon(selectedMember.category), { 
                    className: "h-20 w-20 text-neural-blue" 
                  })}
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-ghost-white font-orbitron mb-3">
                {selectedMember.name}
              </h2>
              <p className="text-neural-blue font-semibold text-lg mb-3">{selectedMember.role}</p>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${
                getStatusColor(selectedMember.status)
              } text-white mb-4`}>
                {getStatusBadge(selectedMember.status)}
              </div>
            </div>
            
            {/* Bio & Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-ghost-white mb-2">Bio</h3>
                <p className="text-neural-gray">{selectedMember.bio}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-ghost-white mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.expertise.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-neural-blue/20 text-neural-blue rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedMember.education && (
                <div>
                  <h3 className="text-lg font-bold text-ghost-white mb-2">Education</h3>
                  <p className="text-neural-gray">{selectedMember.education}</p>
                </div>
              )}
              
              {selectedMember.experience && (
                <div>
                  <h3 className="text-lg font-bold text-ghost-white mb-2">Experience</h3>
                  <p className="text-neural-blue font-semibold">{selectedMember.experience}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSelection;