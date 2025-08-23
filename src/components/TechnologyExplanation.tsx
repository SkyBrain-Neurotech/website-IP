import React from 'react';
import { Brain, Zap, Waves, Activity, MonitorSpeaker, Cpu, Microscope, Target } from 'lucide-react';

const TechnologyExplanation = () => {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* Epic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-shadow-black to-neural-blue/5"></div>
        
        {/* Neural Network Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="tech-neural" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="2" fill="#00D4FF" opacity="0.4">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
                </circle>
                <line x1="60" y1="0" x2="60" y2="120" stroke="#00D4FF" strokeWidth="0.5" opacity="0.2" />
                <line x1="0" y1="60" x2="120" y2="60" stroke="#00D4FF" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-neural)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 glass-card px-8 py-4 mb-8 rounded-full border border-neural-blue/30">
            <Brain className="h-6 w-6 text-neural-blue animate-pulse" />
            <span className="text-base font-bold text-neural-blue tracking-wide font-orbitron uppercase">
              🧠 Advanced Neurotechnology
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">EEG & Neurotech</span>{' '}
            <span className="neural-gradient bg-clip-text text-transparent font-orbitron">
              Fundamentals
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed mb-8">
            Understanding the science behind brain-computer interfaces, EEG signal processing, 
            and how we map your neural baseline for optimal mental wellness.
          </p>
        </div>

        {/* EEG Technology Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center leading-tight tracking-tight font-orbitron">
            <span className="text-ghost-white">What is</span>{' '}
            <span className="text-neural-blue neural-glow">EEG Technology?</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                  Electroencephalography (EEG)
                </h3>
                <p className="text-neural-gray leading-relaxed mb-4">
                  EEG is a non-invasive method of recording electrical activity in the brain. 
                  It measures voltage fluctuations resulting from ionic current within the neurons 
                  of the brain, captured through electrodes placed on the scalp.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-neural-blue" />
                    <span className="text-sm text-neural-gray">Real-time brain wave monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-mind-purple" />
                    <span className="text-sm text-neural-gray">Millisecond-level temporal resolution</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MonitorSpeaker className="h-5 w-5 text-neural-blue" />
                    <span className="text-sm text-neural-gray">Multiple frequency band analysis</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* EEG Wave Visualization - Mobile Optimized */}
              <div className="glass-card p-4 sm:p-8 rounded-2xl border border-neural-blue/30 backdrop-blur-lg bg-white/5 shadow-lg">
                <h4 className="text-lg font-bold text-white mb-6 text-center font-orbitron drop-shadow-lg">
                  Brain Wave Frequencies
                </h4>
                
                {/* Mobile-first responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {[
                    { name: 'Delta', freq: '0.5-4 Hz', color: '#6B46FF', desc: 'Deep sleep' },
                    { name: 'Theta', freq: '4-8 Hz', color: '#8B5CF6', desc: 'Meditation, creativity' },
                    { name: 'Alpha', freq: '8-13 Hz', color: '#00D4FF', desc: 'Relaxed awareness' },
                    { name: 'Beta', freq: '13-30 Hz', color: '#06B6D4', desc: 'Active thinking' },
                    { name: 'Gamma', freq: '30-100 Hz', color: '#10B981', desc: 'High-level cognition' }
                  ].map((wave, index) => (
                    <div key={wave.name} className="glass-card p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                      {/* Mobile-optimized layout */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center justify-between w-full sm:w-auto">
                          <div className="text-sm font-bold drop-shadow-lg" style={{ color: wave.color }}>
                            {wave.name}
                          </div>
                          <div className="text-xs text-white/80 sm:hidden" style={{ color: wave.color }}>
                            {wave.freq}
                          </div>
                        </div>
                        
                        <div className="w-full sm:flex-1 h-8 bg-gradient-to-r from-deep-space/50 to-shadow-black/50 rounded overflow-hidden relative backdrop-blur-sm">
                          <svg width="100%" height="100%" viewBox="0 0 200 32" style={{ color: wave.color }}>
                            <path
                              d={`M0,16 ${Array.from({length: 20}, (_, i) => 
                                `Q${i*10 + 5},${16 + Math.sin(i * (0.5 + index * 0.3)) * (6 + index * 2)} ${(i+1)*10},16`
                              ).join(' ')}`}
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              opacity="0.9"
                            />
                            {/* Glow effect */}
                            <path
                              d={`M0,16 ${Array.from({length: 20}, (_, i) => 
                                `Q${i*10 + 5},${16 + Math.sin(i * (0.5 + index * 0.3)) * (6 + index * 2)} ${(i+1)*10},16`
                              ).join(' ')}`}
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              opacity="0.3"
                            />
                          </svg>
                          <div className="absolute right-2 top-1 text-xs hidden sm:block drop-shadow-lg" style={{ color: wave.color }}>
                            {wave.freq}
                          </div>
                        </div>
                        
                        <div className="text-xs text-white/70 sm:w-32 lg:w-24">
                          {wave.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neurotechnology Fundamentals */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center leading-tight tracking-tight font-orbitron">
            <span className="text-ghost-white">Neurotechnology</span>{' '}
            <span className="text-neural-blue neural-glow">Core Concepts</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="p-4 bg-neural-blue/20 rounded-xl mx-auto w-fit mb-4">
                <Microscope className="h-8 w-8 text-neural-blue group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                Signal Processing
              </h3>
              <p className="text-neural-gray leading-relaxed text-sm">
                Advanced algorithms filter and analyze raw EEG signals, extracting meaningful patterns 
                from neural noise and artifacts.
              </p>
            </div>

            <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="p-4 bg-mind-purple/20 rounded-xl mx-auto w-fit mb-4">
                <Cpu className="h-8 w-8 text-mind-purple group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                Machine Learning
              </h3>
              <p className="text-neural-gray leading-relaxed text-sm">
                AI models learn your unique neural patterns, enabling personalized mental state 
                recognition and cognitive enhancement strategies.
              </p>
            </div>

            <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="p-4 bg-neural-blue/20 rounded-xl mx-auto w-fit mb-4">
                <Waves className="h-8 w-8 text-neural-blue group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                Neurofeedback
              </h3>
              <p className="text-neural-gray leading-relaxed text-sm">
                Real-time feedback mechanisms help train your brain to achieve and maintain 
                optimal cognitive states through guided practice.
              </p>
            </div>

            <div className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className="p-4 bg-mind-purple/20 rounded-xl mx-auto w-fit mb-4">
                <Target className="h-8 w-8 text-mind-purple group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                Precision Mapping
              </h3>
              <p className="text-neural-gray leading-relaxed text-sm">
                High-resolution spatial and temporal mapping of brain activity enables precise 
                understanding of cognitive and emotional states.
              </p>
            </div>
          </div>
        </div>

        {/* Baseline Mapping Process */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center leading-tight tracking-tight font-orbitron">
            <span className="text-ghost-white">Neural Baseline</span>{' '}
            <span className="text-neural-blue neural-glow">Mapping Process</span>
          </h2>
          
          <div className="glass-card p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="p-6 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="h-12 w-12 text-neural-blue" />
                </div>
                <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                  1. Initial Calibration
                </h3>
                <p className="text-neural-gray leading-relaxed">
                  Multiple EEG sessions capture your brain's natural rhythms across different mental states: 
                  rest, focus, meditation, and cognitive tasks. This creates your personalized neural fingerprint.
                </p>
              </div>

              <div className="text-center group">
                <div className="p-6 bg-gradient-to-br from-mind-purple/20 to-neural-blue/20 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Activity className="h-12 w-12 text-mind-purple" />
                </div>
                <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                  2. Pattern Recognition
                </h3>
                <p className="text-neural-gray leading-relaxed">
                  AI algorithms identify your unique neural patterns and optimal cognitive patterns.
                </p>
              </div>

              <div className="text-center group">
                <div className="p-6 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-2xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-12 w-12 text-neural-blue" />
                </div>
                <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
                  3. Continuous Optimization
                </h3>
                <p className="text-neural-gray leading-relaxed">
                  The system continuously monitors your current state versus optimal baseline, 
                  providing real-time guidance to help you return to peak cognitive performance.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h4 className="text-lg font-bold text-ghost-white mb-4 font-orbitron">
                Why Baseline Mapping Matters
              </h4>
              <div className="space-y-3 text-neural-gray">
                <p>• <strong className="text-neural-blue">Individual Variability:</strong> Every brain is unique - what works for others may not work for you</p>
                <p>• <strong className="text-neural-blue">Optimal States:</strong> Your baseline represents when you feel most focused, creative, and mentally clear</p>
                <p>• <strong className="text-neural-blue">Measurable Progress:</strong> Track improvements in cognitive performance over time</p>
                <p>• <strong className="text-neural-blue">Personalized Feedback:</strong> Interventions tailored specifically to your neural patterns</p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-lg font-bold text-ghost-white mb-4 font-orbitron">
                Technical Specifications
              </h4>
              <div className="space-y-3 text-neural-gray">
                <p>• <strong className="text-neural-blue">Sampling Rate:</strong> 250-500 Hz for high temporal resolution</p>
                <p>• <strong className="text-neural-blue">ADC:</strong> 24 bit, voltage range ± 0.4 volts</p>
                <p>• <strong className="text-neural-blue">Electrode Configurations:</strong> 4-8-21 electrode setups</p>
                <p>• <strong className="text-neural-blue">Processing Latency:</strong> &lt;200ms for real-time feedback</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center glass-card rounded-2xl md:rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-ghost-white font-orbitron">
            Ready to Map Your Neural Baseline?
          </h3>
          <p className="text-lg md:text-xl text-neural-gray mb-6 md:mb-8 max-w-2xl mx-auto">
            Experience personalized neurotechnology that adapts to your unique brain patterns 
            and helps optimize your mental wellness journey.
          </p>
          <button className="cyber-button text-lg md:text-xl flex items-center mx-auto group hover:scale-105 transition-transform px-6 md:px-8 py-3 md:py-4">
            <Brain className="mr-3 md:mr-4 h-6 w-6 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />
            Learn More About Our Technology
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnologyExplanation;