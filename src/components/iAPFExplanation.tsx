import React from 'react';
import { Brain, Zap, Activity, Target, Users, Shield } from 'lucide-react';

const iAPFExplanation = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">Meet</span>{' '}
            <span className="text-neural-blue font-orbitron neural-glow">iAPF</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-8">
            <strong className="text-neural-blue">i</strong>ndividual <strong className="text-neural-blue">A</strong>daptive <strong className="text-neural-blue">P</strong>ersonalization <strong className="text-neural-blue">F</strong>ramework
            <br className="hidden md:block" />
            Your brain's unique neural signature that powers truly personalized wellness
          </p>
          
          <div className="glass-card inline-block px-8 py-4 mb-12">
            <div className="text-center">
              <div className="text-neural-blue text-3xl font-mono mb-2">YOUR</div>
              <div className="text-neural-gray text-sm">Personal Neural Profile</div>
              <div className="text-xs text-neural-gray mt-1">Uniquely Yours</div>
            </div>
          </div>

          {/* Simple Visual Explanation */}
          <div className="glass-card rounded-3xl p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="p-6 bg-neural-blue/20 rounded-2xl mb-4 mx-auto w-fit">
                  <Activity className="h-12 w-12 text-neural-blue" />
                </div>
                <h3 className="text-xl font-bold text-ghost-white mb-2 font-orbitron">Your Brain Signals</h3>
                <p className="text-neural-gray">We read your neural patterns safely and non-invasively</p>
              </div>
              
              <div className="text-center">
                <div className="p-6 bg-mind-purple/20 rounded-2xl mb-4 mx-auto w-fit relative">
                  <Brain className="h-12 w-12 text-mind-purple" />
                  <Zap className="h-6 w-6 text-neural-blue absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-ghost-white mb-2 font-orbitron">Neural Analysis</h3>
                <p className="text-neural-gray">AI identifies your unique neural patterns for personalized wellness</p>
              </div>
              
              <div className="text-center">
                <div className="p-6 bg-neural-blue/20 rounded-2xl mb-4 mx-auto w-fit">
                  <Target className="h-12 w-12 text-neural-blue" />
                </div>
                <h3 className="text-xl font-bold text-ghost-white mb-2 font-orbitron">Personal Support</h3>
                <p className="text-neural-gray">Get exactly what you need, when you need it</p>
              </div>
            </div>
          </div>
        </div>

        {/* What Makes iAPF Special */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-ghost-white font-orbitron">
            Why iAPF is a Game-Changer
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 hover:border-neural-blue/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-neural-blue/20 rounded-xl">
                  <Users className="h-8 w-8 text-neural-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                    It Learns YOU
                  </h3>
                  <p className="text-neural-gray text-lg leading-relaxed">
                    Traditional mental health solutions are one-size-fits-all. iAPF studies your unique brain patterns, 
                    sleep cycles, stress responses, and daily rhythms to create a personalized mental health profile 
                    that's as unique as your fingerprint.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 hover:border-neural-blue/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-mind-purple/20 rounded-xl">
                  <Zap className="h-8 w-8 text-mind-purple" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                    Real-Time Adaptation
                  </h3>
                  <p className="text-neural-gray text-lg leading-relaxed">
                    Unlike static wellness apps, iAPF continuously adapts. Had a stressful day? It knows. 
                    Feeling anxious about an upcoming event? It detects the neural signatures and adjusts 
                    your support plan instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 hover:border-neural-blue/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-neural-blue/20 rounded-xl">
                  <Shield className="h-8 w-8 text-neural-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                    Prevention, Not Reaction
                  </h3>
                  <p className="text-neural-gray text-lg leading-relaxed">
                    iAPF doesn't wait for you to have a mental health crisis. It spots the early warning signs 
                    in your neural patterns - like detecting a storm before it hits - and provides proactive 
                    interventions to keep you in optimal mental health.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 hover:border-neural-blue/30 transition-all">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-mind-purple/20 rounded-xl">
                  <Target className="h-8 w-8 text-mind-purple" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                    Precision Mental Health
                  </h3>
                  <p className="text-neural-gray text-lg leading-relaxed">
                    Just like precision medicine revolutionized physical health, iAPF brings precision to mental health. 
                    No more guessing what might work - iAPF knows what will work for your specific brain chemistry and lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works - Simple Terms */}
        <div className="glass-card rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-ghost-white font-orbitron">
            How iAPF Works (In Simple Terms)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-neural-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-neural-blue/30">
                <span className="text-2xl font-bold text-neural-blue font-orbitron">1</span>
              </div>
              <h3 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">Listen</h3>
              <p className="text-neural-gray">
                Safe sensors read your brain's electrical activity - like listening to your brain's conversation with itself
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neural-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-neural-blue/30">
                <span className="text-2xl font-bold text-neural-blue font-orbitron">2</span>
              </div>
              <h3 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">Learn</h3>
              <p className="text-neural-gray">
                AI analyzes your neural patterns to create your unique brain profile - your personal wellness blueprint
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neural-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-neural-blue/30">
                <span className="text-2xl font-bold text-neural-blue font-orbitron">3</span>
              </div>
              <h3 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">Predict</h3>
              <p className="text-neural-gray">
                Monitors changes in your neural activity to predict mental state shifts and wellness needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neural-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-neural-blue/30">
                <span className="text-2xl font-bold text-neural-blue font-orbitron">4</span>
              </div>
              <h3 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">Act</h3>
              <p className="text-neural-gray">
                Delivers personalized interventions optimized for your unique neural profile to enhance wellbeing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default iAPFExplanation;