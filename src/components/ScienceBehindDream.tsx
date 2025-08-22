
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, Zap, Target, Cpu, Waves } from 'lucide-react';

const ScienceBehindDream = () => {
  const sciences = [
    {
      icon: Activity,
      title: "EEG Classification",
      subtitle: "Reading Your Mind's Language",
      description: "Real-time monitoring of focus, stress, relaxation, and distraction through advanced brainwave analysis.",
      features: [
        "Emotional State Detection in real-time",
        "Alpha, Beta, Delta, Theta pattern analysis",
        "Pattern Recognition that learns your unique neural signatures",
        "Predictive Modeling that anticipates mental state changes"
      ],
      color: "from-blue-500 to-cyan-500",
      stats: { accuracy: "99.7%", channels: "64ch", frequency: "1000Hz" }
    },
    {
      icon: Waves,
      title: "iAPF Analysis",
      subtitle: "Your Brain's Natural Frequency",
      description: "Individual Alpha Peak Frequency analysis reveals your brain's unique optimal operating state.",
      features: [
        "Discovering your brain's unique optimal frequency",
        "Cognitive Performance Indicator analysis",
        "Personalized Neural Optimization protocols",
        "Performance Prediction based on iAPF patterns"
      ],
      color: "from-purple-500 to-pink-500",
      stats: { precision: "0.1Hz", range: "8-13Hz", personalization: "100%" }
    },
    {
      icon: Brain,
      title: "AI Intelligence",
      subtitle: "Your Personal Mental Health Oracle",
      description: "Advanced neural networks that understand your unique responses and provide personalized care.",
      features: [
        "Pattern Learning from your individual responses",
        "Contextual Awareness of environment and schedule",
        "Adaptive Recommendations that evolve with you",
        "Precision Dosing for optimal intervention timing"
      ],
      color: "from-green-500 to-emerald-500",
      stats: { learning: "24/7", adaptation: "Real-time", accuracy: "98.5%" }
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 neural-network-bg opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <Cpu className="h-5 w-5 text-neural-blue animate-pulse" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase font-orbitron">The Science Behind the Dream</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            <span className="text-ghost-white">How We Make the</span>{' '}
            <span className="neural-gradient bg-clip-text text-transparent neural-glow font-orbitron">
              Impossible, Possible
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Revolutionary neuroscience meets cutting-edge AI to create your personal mental health oracle.
            <br className="hidden md:block" />
            <span className="text-neural-blue font-semibold">Science fiction becomes science fact.</span>
          </p>
        </div>

        {/* Science Categories */}
        <div className="space-y-16">
          {sciences.map((science, index) => (
            <Card 
              key={science.title}
              className="glass-card hover:border-neural-blue/30 transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Column - Main Content */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className={`p-4 bg-gradient-to-br ${science.color} bg-opacity-20 rounded-2xl mr-6`}>
                        <science.icon className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-ghost-white mb-2 font-orbitron">
                          {science.title}
                        </h3>
                        <p className="text-xl text-neural-blue font-semibold italic">
                          {science.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-neural-gray leading-relaxed mb-8">
                      {science.description}
                    </p>

                    <div className="space-y-4">
                      {science.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className="w-3 h-3 bg-gradient-to-r from-neural-blue to-mind-purple rounded-full mr-4 mt-2 animate-pulse"></div>
                          <p className="text-neural-gray font-medium">
                            <span className="text-neural-blue font-semibold">
                              {feature.split(':')[0]}
                            </span>
                            {feature.includes(':') && (
                              <span>: {feature.split(':')[1]}</span>
                            )}
                            {!feature.includes(':') && feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Stats & Visualization */}
                  <div className="space-y-8">
                    <div className="glass-card p-8 rounded-2xl">
                      <h4 className="text-xl font-bold text-ghost-white mb-6 text-center font-orbitron">
                        Technical Specifications
                      </h4>
                      <div className="space-y-6">
                        {Object.entries(science.stats).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-neural-gray capitalize font-medium">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <Badge variant="secondary" className="bg-neural-blue/20 text-neural-blue font-bold text-lg px-4 py-2">
                              {value}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visualization Placeholder */}
                    <div className="glass-card p-8 rounded-2xl text-center">
                      <div className="w-full h-32 bg-gradient-to-r from-neural-blue/20 to-mind-purple/20 rounded-xl flex items-center justify-center mb-4">
                        <div className="text-neural-blue/60 text-sm font-medium">
                          {science.title} Visualization
                        </div>
                      </div>
                      <p className="text-neural-gray/60 text-sm">
                        Real-time neural pattern analysis and AI processing visualization
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Research Validation */}
        <div className="mt-20 glass-card rounded-3xl p-12 holographic">
          <h3 className="text-3xl font-bold text-center mb-12 text-ghost-white neural-glow font-orbitron">
            Research Validation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "21 Hours", label: "EEG Analysis", icon: "🧠" },
              { value: "35+ Reports", label: "Neural Pattern Studies", icon: "📊" },
              { value: "130+ Transactions", label: "Blockchain Verified", icon: "🔒" }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 filter grayscale group-hover:grayscale-0 transition-all">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black text-neural-blue mb-3 font-mono neural-glow group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-neural-gray font-semibold tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceBehindDream;
