import React from 'react';
import { Brain, Users, Heart, Zap, Target, Lightbulb } from 'lucide-react';

const FuturePromise = () => {
  const visionCards = [
    {
      icon: Users,
      title: "Collective Intelligence",
      description: "Anonymous data contributing to mental health breakthroughs",
      promise: "Accelerating research that benefits all humanity"
    },
    {
      icon: Heart,
      title: "Preventive Healthcare",
      description: "Moving from treatment to prediction and prevention",
      promise: "Mental health crises become a thing of the past"
    },
    {
      icon: Target,
      title: "Personalized Medicine",
      description: "Mental health interventions tailored to your neural blueprint",
      promise: "Every treatment perfectly matched to your unique brain"
    },
    {
      icon: Lightbulb,
      title: "Human Potential",
      description: "Unlocking cognitive capabilities we never knew we had",
      promise: "The next evolution of human consciousness"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 neural-network-bg opacity-30"></div>
      <div className="absolute inset-0 neural-grid opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-neural-blue rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase font-orbitron">
              The Future We're Building
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="text-ghost-white">A World Where </span>
            <span className="text-neural-blue font-orbitron">Mental Health is Optimized</span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-4 text-xl md:text-2xl text-neural-gray leading-relaxed">
            <p>We're creating a future where mental wellness is not just treated, but enhanced.</p>
            <p className="text-neural-blue font-semibold">
              Where technology becomes your mind's guardian.
            </p>
          </div>
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {visionCards.map((card, index) => (
            <div 
              key={card.title}
              className="glass-card rounded-2xl p-8 border border-neural-blue/20 hover:border-neural-blue/40 transition-all group hover:scale-105 holographic"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-neural-blue/10 rounded-xl group-hover:bg-neural-blue/20 transition-colors">
                  <card.icon className="h-8 w-8 text-neural-blue group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-ghost-white mb-3 group-hover:text-neural-blue transition-colors font-orbitron">
                    {card.title}
                  </h3>
                  <p className="text-neural-gray mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="border-l-2 border-neural-blue/30 pl-4">
                    <p className="text-neural-blue font-semibold italic">
                      "{card.promise}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="glass-card rounded-3xl p-12 border border-neural-blue/40 bg-gradient-to-br from-neural-blue/5 to-mind-purple/5 text-center holographic">
          <div className="relative mb-8">
            <Brain className="h-20 w-20 text-neural-blue mx-auto animate-pulse floating" />
            <div className="absolute inset-0 h-20 w-20 bg-neural-blue/20 rounded-full blur-2xl mx-auto"></div>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-ghost-white mb-6 font-orbitron">
            The Future Begins Today
          </h3>
          
          <div className="max-w-3xl mx-auto space-y-4 text-lg md:text-xl text-neural-gray leading-relaxed mb-8">
            <p>Every breakthrough in neurotechnology brings us closer to a world where mental suffering is preventable.</p>
            <p className="text-neural-blue font-semibold text-xl">
              Together, we're building tomorrow's mental wellness.
            </p>
          </div>

          {/* Animated Progress Dots */}
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-neural-blue rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturePromise;