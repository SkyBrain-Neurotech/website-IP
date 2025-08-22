
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  ExternalLink,
  Microscope,
  BookOpen,
  Brain
} from 'lucide-react';

const ResearchSection = () => {
  const publications = [
    {
      title: 'Real-time Neural Signal Processing for Brain-Computer Interfaces',
      journal: 'Nature Neuroscience',
      year: '2024',
      category: 'Signal Processing',
      description: 'Novel algorithms for processing neural signals with sub-millisecond latency for non-invasive BCI applications.'
    },
    {
      title: 'Cognitive Load Assessment Using Multi-channel EEG Analysis',
      journal: 'IEEE Transactions on Biomedical Engineering',
      year: '2024',
      category: 'Cognitive Science',
      description: 'Breakthrough method for real-time cognitive load measurement and mental state optimization.'
    },
    {
      title: 'Privacy-Preserving Neural Data Processing in Edge Computing',
      journal: 'Journal of Neural Engineering',
      year: '2023',
      category: 'Privacy & Security',
      description: 'Secure processing techniques that maintain complete neural data privacy while enabling real-time analysis.'
    }
  ];

  const collaborations = [
    {
      name: 'Stanford Neuroscience Institute',
      type: 'Research Partnership',
      focus: 'Non-invasive Neural Signal Processing',
      icon: Microscope
    },
    {
      name: 'MIT Brain & Cognitive Sciences',
      type: 'Joint Research',
      focus: 'Cognitive Enhancement Technology',
      icon: BookOpen
    },
    {
      name: 'Johns Hopkins Medicine',
      type: 'Clinical Studies',
      focus: 'Mental Health Applications',
      icon: Users
    }
  ];

  return (
    <section id="research" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Advancing</span>{' '}
            <span className="text-neural-blue font-orbitron">
              Neurotechnology
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Our research drives innovation in non-invasive brain-computer interfaces, 
            making neurotechnology safe and accessible for everyone.
          </p>
        </div>

        {/* Recent Publications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center">
            <FileText className="h-6 w-6 text-neural-blue mr-3" />
            Recent Publications
          </h3>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <Card key={index} className="glass-card border-neural-blue/20 hover:border-neural-blue/30 transition-all group">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-neural-blue transition-colors pr-4">
                          {pub.title}
                        </h4>
                        <ExternalLink className="h-5 w-5 text-foreground/40 hover:text-neural-blue cursor-pointer flex-shrink-0" />
                      </div>
                      <p className="text-foreground/70 text-sm mb-3">{pub.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-foreground/60">
                        <span className="font-medium">{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <Badge variant="outline" className="border-neural-blue/30 text-neural-blue">
                        {pub.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Collaborations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center">
            <Users className="h-6 w-6 text-neural-blue mr-3" />
            Research Collaborations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collaborations.map((collab, index) => (
              <Card key={index} className="glass-card border-neural-blue/20 hover:border-neural-blue/30 transition-all group hover:scale-105">
                <CardContent className="p-6 text-center">
                  <collab.icon className="h-12 w-12 text-neural-blue mx-auto mb-4 group-hover:animate-pulse" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">{collab.name}</h4>
                  <Badge variant="outline" className="border-neural-blue/30 text-neural-blue mb-3">
                    {collab.type}
                  </Badge>
                  <p className="text-foreground/70 text-sm">{collab.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Research CTA */}
        <div className="glass-card border-neural-blue/20 rounded-2xl p-8 text-center">
          <Brain className="h-12 w-12 text-neural-blue mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Advance Neurotechnology Research
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Join our research community and contribute to the future of non-invasive brain-computer interfaces. 
            Collaborate with leading researchers and access cutting-edge neurotechnology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="cyber-button text-primary-foreground font-semibold px-8">
              Research Partnership
            </Button>
            <Button variant="outline" size="lg" className="glass-card border-neural-blue/30 text-neural-blue hover:bg-neural-blue/10">
              View All Publications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
