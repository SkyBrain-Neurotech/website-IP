
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Gamepad2, 
  Target, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ApplicationsSection = () => {
  const applications = [
    {
      icon: Briefcase,
      title: 'Workplace Performance',
      description: 'Optimize your productivity and maintain peak mental performance during work hours.',
      benefits: [
        'Track focus levels during meetings',
        'Detect mental fatigue before burnout',
        'Optimize break timing for maximum efficiency',
        'Monitor stress levels throughout the day'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: GraduationCap,
      title: 'Learning & Education',
      description: 'Enhance your learning capacity and retention through neural feedback.',
      benefits: [
        'Identify optimal learning states',
        'Track information retention rates',
        'Personalize study schedules',
        'Improve memory consolidation'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Monitor your mental health and maintain cognitive well-being.',
      benefits: [
        'Early stress detection',
        'Sleep quality assessment',
        'Meditation effectiveness tracking',
        'Cognitive health monitoring'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Peak Performance',
      description: 'Achieve flow states and maintain optimal performance in any activity.',
      benefits: [
        'Flow state detection and training',
        'Performance optimization alerts',
        'Attention training programs',
        'Mental endurance building'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Gamepad2,
      title: 'Gaming & Esports',
      description: 'Gain competitive advantage through cognitive enhancement and training.',
      benefits: [
        'Reaction time optimization',
        'Concentration improvement',
        'Performance analytics',
        'Training effectiveness metrics'
      ],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Enhance team dynamics and collaborative performance.',
      benefits: [
        'Team synchronization metrics',
        'Collective focus tracking',
        'Communication effectiveness',
        'Group performance insights'
      ],
      color: 'from-teal-500 to-blue-500'
    }
  ];

  return (
    <section id="applications" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 neural-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Real-World</span>{' '}
            <span className="bg-gradient-to-r from-primary to-electric-400 bg-clip-text text-transparent">
              Applications
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Discover how BCI technology can transform every aspect of your daily life, 
            from work and learning to health and entertainment.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {applications.map((app, index) => (
            <Card 
              key={app.title}
              className="bg-card/50 border-border hover:border-primary/30 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${app.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                    <app.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4 text-foreground group-hover:text-primary transition-colors">
                    {app.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {app.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3 mb-6">
                  {app.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <Button 
                  variant="outline" 
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 group-hover:border-primary transition-all"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Use Cases Highlight */}
        <div className="bg-gradient-to-r from-primary/10 to-electric-400/10 border border-primary/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Ready to Transform Your Daily Life?
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already using BCI technology to optimize their 
            cognitive performance, enhance their well-being, and achieve their goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
