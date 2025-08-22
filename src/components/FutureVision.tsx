
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Users, Heart, Zap, Target, ArrowRight, Sparkles, Globe } from 'lucide-react';

const FutureVision = () => {
  const futureElements = [
    {
      icon: Brain,
      title: "Collective Intelligence",
      description: "Anonymous data contributing to mental health breakthroughs",
      impact: "Accelerating research that benefits all humanity"
    },
    {
      icon: Heart,
      title: "Preventive Healthcare",
      description: "Moving from treatment to prediction and prevention",
      impact: "Mental health crises become a thing of the past"
    },
    {
      icon: Target,
      title: "Personalized Medicine",
      description: "Mental health interventions tailored to your neural blueprint",
      impact: "Every treatment perfectly matched to your unique brain"
    },
    {
      icon: Zap,
      title: "Human Potential",
      description: "Unlocking cognitive capabilities we never knew we had",
      impact: "The next evolution of human consciousness"
    }
  ];

  return (
    <section className="py-32 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <Globe className="h-5 w-5 text-neural-blue neural-pulse" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase font-orbitron">The Future We're Building</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">A World Where</span>{' '}
            <span className="text-neural-blue neural-glow font-orbitron">Mental Health is Optimized</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            We're creating a future where mental wellness is not just treated, but enhanced.
            <br className="hidden md:block" />
            <span className="text-neural-blue font-semibold">Where technology becomes your mind's guardian.</span>
          </p>
        </div>

        {/* Future Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {futureElements.map((element, index) => (
            <Card 
              key={element.title}
              className="glass-card hover:border-neural-blue/30 transition-all duration-500 group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-2xl mr-6">
                    <element.icon className="h-8 w-8 text-neural-blue group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ghost-white group-hover:text-neural-blue transition-colors font-orbitron">
                      {element.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-neural-gray text-lg leading-relaxed mb-4">
                  {element.description}
                </p>
                
                <div className="bg-neural-blue/10 border-l-4 border-neural-blue p-4 rounded-r-lg">
                  <p className="text-neural-blue font-semibold italic">
                    "{element.impact}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Final Vision Statement */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-16">
            <div className="relative mb-8">
              <Brain className="h-20 w-20 text-neural-blue mx-auto neural-pulse floating" />
              <div className="absolute inset-0 h-20 w-20 bg-neural-blue/20 rounded-full blur-xl mx-auto"></div>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-ghost-white neural-glow font-orbitron">
              The Future Begins Today
            </h3>
            
            <p className="text-xl md:text-2xl text-neural-gray mb-8 max-w-3xl mx-auto leading-relaxed">
              Every breakthrough in neurotechnology brings us closer to a world where mental suffering is preventable.
              <br className="hidden md:block" />
              <span className="text-neural-blue font-semibold">Together, we're building tomorrow's mental wellness.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
