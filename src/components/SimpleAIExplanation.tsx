import React from 'react';
import { Brain, Cpu, Heart, Eye, Lightbulb, Shield } from 'lucide-react';

const SimpleAIExplanation = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-8 rounded-full">
            <Cpu className="h-5 w-5 text-mind-purple animate-pulse" />
            <span className="text-sm font-semibold text-neural-gray tracking-wide font-orbitron uppercase">
              AI Made Simple
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-ghost-white">How Our</span>{' '}
            <span className="text-mind-purple font-orbitron neural-glow">AI Brain</span>{' '}
            <span className="text-ghost-white">Works</span>
          </h2>
          
          <p className="text-xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Think of our AI as a really smart friend who never sleeps, learns everything about your mental patterns, 
            and is always looking out for your wellbeing
          </p>
        </div>

        {/* Simple Analogies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="glass-card p-8 text-center hover:border-mind-purple/30 transition-all">
            <div className="p-6 bg-mind-purple/20 rounded-2xl mb-6 mx-auto w-fit">
              <Eye className="h-12 w-12 text-mind-purple" />
            </div>
            <h3 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">Like a Weather Forecast</h3>
            <p className="text-neural-gray leading-relaxed">
              Just like meteorologists predict storms by reading atmospheric patterns, 
              our AI reads your brain patterns to predict mental weather - stress storms, 
              anxiety fronts, or sunny mood days.
            </p>
          </div>

          <div className="glass-card p-8 text-center hover:border-mind-purple/30 transition-all">
            <div className="p-6 bg-neural-blue/20 rounded-2xl mb-6 mx-auto w-fit">
              <Heart className="h-12 w-12 text-neural-blue" />
            </div>
            <h3 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">Like a Fitness Tracker</h3>
            <p className="text-neural-gray leading-relaxed">
              Your fitness tracker counts steps and monitors heart rate. Our AI tracks your mental steps - 
              stress levels, focus quality, emotional balance - giving you insights into your mental fitness.
            </p>
          </div>

          <div className="glass-card p-8 text-center hover:border-mind-purple/30 transition-all">
            <div className="p-6 bg-mind-purple/20 rounded-2xl mb-6 mx-auto w-fit">
              <Lightbulb className="h-12 w-12 text-mind-purple" />
            </div>
            <h3 className="text-xl font-bold text-ghost-white mb-4 font-orbitron">Like a Smart Thermostat</h3>
            <p className="text-neural-gray leading-relaxed">
              A smart thermostat learns your schedule and adjusts temperature automatically. 
              Our AI learns your mental patterns and adjusts your wellness support before you even realize you need it.
            </p>
          </div>
        </div>

        {/* What Makes It Different */}
        <div className="glass-card rounded-3xl p-12 mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-ghost-white font-orbitron">
            What Makes Our AI Different
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-bold text-neural-blue mb-6 font-orbitron flex items-center">
                <Brain className="h-8 w-8 mr-3" />
                Traditional AI
              </h4>
              <ul className="space-y-4 text-neural-gray text-lg">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">❌</span>
                  Generic recommendations for everyone
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">❌</span>
                  Waits for you to input how you feel
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">❌</span>
                  Reacts after problems happen
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">❌</span>
                  Based on surveys and questionnaires
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold text-mind-purple mb-6 font-orbitron flex items-center">
                <Brain className="h-8 w-8 mr-3" />
                SkyBrain Neurotech AI
              </h4>
              <ul className="space-y-4 text-neural-gray text-lg">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  Learns your unique brain patterns
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  Automatically detects your mental state
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  Prevents problems before they start
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  Based on real neural activity
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety & Privacy */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12">
            <div className="p-6 bg-neural-blue/20 rounded-2xl mb-6 mx-auto w-fit">
              <Shield className="h-16 w-16 text-neural-blue" />
            </div>
            <h3 className="text-3xl font-bold text-ghost-white mb-6 font-orbitron">
              Your Privacy & Safety Come First
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h4 className="text-xl font-bold text-neural-blue mb-3 font-orbitron">Non-Invasive</h4>
                <p className="text-neural-gray">
                  No surgery, no implants, no needles. Just comfortable, safe sensors that read your brain's natural electrical activity.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-neural-blue mb-3 font-orbitron">Your Data Stays Yours</h4>
                <p className="text-neural-gray">
                  Your neural patterns are encrypted and stored securely. We never sell your data or share it without your permission.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-neural-blue mb-3 font-orbitron">You're In Control</h4>
                <p className="text-neural-gray">
                  You decide what the AI monitors, when it provides suggestions, and can turn it off anytime. You're the boss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleAIExplanation;